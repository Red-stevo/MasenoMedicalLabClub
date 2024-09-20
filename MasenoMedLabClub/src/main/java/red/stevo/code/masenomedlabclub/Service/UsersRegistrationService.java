package red.stevo.code.masenomedlabclub.Service;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.EntityDeletionException;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.InvalidEmailFormatException;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.UserAlreadyExistException;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.UsersCreationFailedException;
import red.stevo.code.masenomedlabclub.Entities.Roles;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Entities.tokens.RefreshTokens;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.ResetPasswordDetails;
import red.stevo.code.masenomedlabclub.Models.RequestModels.UsersRegistrationRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Repositories.users.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.Repositories.users.UsersRepository;
import red.stevo.code.masenomedlabclub.Service.DetService.EmailService;
import red.stevo.code.masenomedlabclub.Service.DetService.JWTGenService;
import red.stevo.code.masenomedlabclub.Service.DetService.LogoutService;
import red.stevo.code.masenomedlabclub.configurations.PasswordGenerator;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.InvalidPropertiesFormatException;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UsersRegistrationService {

    private final UsersRepository usersRepository;
    private final JWTGenService jwtGenService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final PasswordGenerator passwordGenerator;
    private final CookieUtils cookieUtils;
    private final EmailService emailService;
    private final HttpServletResponse response;
    private final RefreshTokensRepository refreshTokensRepository;


    public UserGeneralResponse createUser(List<UsersRegistrationRequests> regRequest) {
        List<String> createdEmails = new ArrayList<>();

        List<Users> users = regRequest.stream()
                .map(usersRegistrationRequests -> {
                    if (usersRepository.existsByEmail(usersRegistrationRequests.getEmail())) {
                        throw new UserAlreadyExistException("The user with that email already exists");
                    }

                    Users user = new Users();
                    if (!isEmailValid(usersRegistrationRequests.getEmail())) {
                        throw new InvalidEmailFormatException("Invalid email format: " + usersRegistrationRequests.getEmail());
                    }

                    String password = passwordGenerator.generateRandomPassword(8);
                    log.info("Default password is " + password);

                    user.setEmail(usersRegistrationRequests.getEmail());
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(usersRegistrationRequests.getRoles());
                    user.setEnabled(true);

                    createdEmails.add(user.getEmail());
                    return user;
                }).toList();

        usersRepository.saveAll(users);

        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("Users created successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);

        return response;
    }


    private boolean isEmailValid(String email) {
        org.apache.commons.validator.routines.EmailValidator emailValidator = org.apache.commons.validator.routines.EmailValidator.getInstance();
        return emailValidator.isValid(email);
    }

    public ResponseEntity<AuthenticationResponse> loginUser(LoginRequests loginRequests) {
        // Authenticate the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequests.getEmail(), loginRequests.getPassword()));

        // Fetch user details
        Users user = usersRepository.findByEmail(loginRequests.getEmail());

        // Generate access and refresh tokens
        String accessToken = jwtGenService.generateAccessToken(user);




        // Set the access token in a secure cookie


        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setMessage("Authentication successful.");
        authResponse.setToken(accessToken);
        authResponse.setUserId(user.getUserId());
        authResponse.setUserRole(user.getRole().toString());

        response.setHeader("Set-Cookie", cookieUtils.responseCookie(user).toString());

        // Return an AuthenticationResponse object containing both tokens
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }


    public UserGeneralResponse resetPassword(ResetPasswordDetails resetPasswordDetails) {
        log.info("Service to reset the password");

        // Find user by email
        Users user = usersRepository.findByEmail(resetPasswordDetails.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User does not exist");
        }

        // Validate the old password by comparing it with the encoded password in the database
        if (!passwordEncoder.matches(resetPasswordDetails.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }

        // Set the new password
        String newPassword = resetPasswordDetails.getNewPassword();
        if (!isPasswordStrong(resetPasswordDetails.getNewPassword())){
            throw new IllegalArgumentException("Weak password");
        }
        user.setPassword(passwordEncoder.encode(newPassword));

        // Save the updated user with the new password
        usersRepository.save(user);

        UserGeneralResponse userGeneralResponse = new UserGeneralResponse();
        userGeneralResponse.setMessage("Password updated successfully.");
        userGeneralResponse.setDate(new Date());
        userGeneralResponse.setHttpStatus(HttpStatus.OK);

        return userGeneralResponse;
    }

    private static boolean isPasswordStrong(String password){
        String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$!)(}{%^&+=])(?=\\S+$).{8,}$";
        return password.matches(passwordRegex);
    }


    public UserGeneralResponse deleteUser(List<String> emails){
        log.info("Service to delete the user");
        try {

            List<Users> usersList = emails.stream().map(
                    email1 -> {
                        Users user = usersRepository.findByEmail(email1);
                        if (user == null) throw new UsernameNotFoundException("User does not exist");
                        return user;
                    }

            ).toList();

            usersRepository.deleteAll(usersList);
            UserGeneralResponse userGeneralResponse = new UserGeneralResponse();
            userGeneralResponse.setMessage("User deleted successfully");
            userGeneralResponse.setDate(new Date());
            userGeneralResponse.setHttpStatus(HttpStatus.OK);

            return userGeneralResponse;

        }catch (Exception ex){
            throw new EntityDeletionException("could not delete the user");
        }

    }
    @Value("${default-email}")
    @Email
    private String adminEmail;
    @Value("${default-password}")
    private String adminPassword;
    @PostConstruct
    public UserGeneralResponse createAdmin() {
        if (usersRepository.existsByEmail(adminEmail)) {
            UserGeneralResponse response = new UserGeneralResponse();
            response.setMessage("Admin account already exists");
            response.setDate(new Date());
            response.setHttpStatus(HttpStatus.OK);
            return response;
        }

        Users user = new Users();
        user.setEmail(adminEmail);

        if (!isPasswordStrong(adminPassword)) {
            throw new IllegalArgumentException("Weak password");
        }

        user.setPassword(passwordEncoder.encode(adminPassword));
        user.setRole(Roles.ADMIN);
        user.setEnabled(true);

        usersRepository.save(user);

        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("Default admin created successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }


}
