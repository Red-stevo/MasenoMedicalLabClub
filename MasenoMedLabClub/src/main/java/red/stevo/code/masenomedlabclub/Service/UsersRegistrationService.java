package red.stevo.code.masenomedlabclub.Service;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.*;
import red.stevo.code.masenomedlabclub.Entities.Roles;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.ResetPasswordDetails;
import red.stevo.code.masenomedlabclub.Models.RequestModels.UsersRegistrationRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserResponse;
import red.stevo.code.masenomedlabclub.Repositories.users.UsersRepository;
import red.stevo.code.masenomedlabclub.Service.DetService.EmailService;
import red.stevo.code.masenomedlabclub.Service.DetService.JWTGenService;
import red.stevo.code.masenomedlabclub.configurations.ModelMapperConfig;
import red.stevo.code.masenomedlabclub.configurations.PasswordGenerator;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

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
    private final ModelMapperConfig modelMapper;


    public UserGeneralResponse createUser(List<UsersRegistrationRequests> regRequest) {
        List<String> createdEmails = new ArrayList<>();

        List<Users> users = regRequest.stream()
                .map(usersRegistrationRequests -> {
                    if (usersRepository.existsByEmail(usersRegistrationRequests.getEmail())) {
                        throw new UserAlreadyExistException("The user with that email already exists");
                    }

                    Users user = new Users();
                    if (!isEmailValid(usersRegistrationRequests.getEmail())) {
                        throw new InvalidEmailFormatException("Invalid email format: " + usersRegistrationRequests.
                                getEmail());
                    }

                    String password = passwordGenerator.generateRandomPassword(8);

                    user.setEmail(usersRegistrationRequests.getEmail());
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(usersRegistrationRequests.getRoles());
                    user.setPosition(usersRegistrationRequests.getPosition());
                    user.setEnabled(true);

                    createdEmails.add(user.getEmail());
//                    emailService.sendRegistrationEmail(user.getEmail(),password);
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
        EmailValidator emailValidator = EmailValidator.getInstance();
        return emailValidator.isValid(email);
    }

    @Transactional
    public ResponseEntity<AuthenticationResponse> loginUser(LoginRequests loginRequests) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequests.getEmail(), loginRequests.getPassword()));

<<<<<<< HEAD
            // Fetch user details
            Users user = usersRepository.findByEmail(loginRequests.getEmail());
=======
        // Fetch user details
        Users user = usersRepository.findByEmail(loginRequests.getEmail()).orElseThrow(()-> {
            return new UserDoesNotExistException("User Does Not Exist.");
        });
>>>>>>> 6086ed1eac2f4837d786e717fc2763698e857e51

            if (user == null) {
                log.error("User not found with email: {}", loginRequests.getEmail());
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Generate access token
            String accessToken = jwtGenService.generateAccessToken(user);
            log.info("Access token generated successfully");

<<<<<<< HEAD
            log.info("Setting secure cookie");
            response.setHeader("Set-Cookie", cookieUtils.responseCookie(user).toString());

            // Set the response
            AuthenticationResponse authResponse = new AuthenticationResponse();
            authResponse.setMessage("Authentication successful.");
            authResponse.setToken(accessToken);
            authResponse.setUserId(user.getUserId());
            authResponse.setUserRole(user.getRole().toString());
            log.info("Response is being sent back");

            // Return AuthenticationResponse object
            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        } catch (Exception e) {
            log.error("Authentication failed: {}", e.getMessage());
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }

=======
        // Set the access token in a secure cookie
        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setMessage("Authentication successful.");
        authResponse.setToken(accessToken);
        authResponse.setUserId(user.getUserId());
        authResponse.setUserRole(user.getRole().toString());

        response.setHeader("Set-Cookie", cookieUtils.responseCookie(user).toString());

        // Return an AuthenticationResponse object containing both tokens
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
>>>>>>> 6086ed1eac2f4837d786e717fc2763698e857e51
    }


    public UserGeneralResponse resetPassword(ResetPasswordDetails resetPasswordDetails) {
        log.info("Service to reset the password");

        // Find user by email
        Users user = usersRepository.findByEmail(resetPasswordDetails.getEmail()).orElseThrow(() -> {
            return new UserDoesNotExistException("User Does Not Exist.");
        });

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

    public List<UserResponse> getAllUsers(){
        try {
            List<Users> users = usersRepository.findAll();

            users.sort(Comparator.comparing(users1 -> getPositionPriority(users1.getPosition())));
            return users.stream().map(user-> {
                        UserResponse userResponse = new UserResponse();
                        userResponse.setEmail(user.getEmail());
                        userResponse.setUserId(user.getUserId());
                        userResponse.setPosition(user.getPosition().ordinal());
                        userResponse.setRoles(Roles.valueOf(user.getRole().toString()));

                        return userResponse;
                    })
                    .toList();

        }catch (Exception e){
            throw new ResourceNotFoundException("the users could not be retrieved");
        }
    }

    private int getPositionPriority(UserPositions positions){
        return switch (positions) {
            case CHAIRPERSON -> 1;
            case VICE_CHAIRPERSON -> 2;
            case TREASURER -> 3;
            case VICE_TREASURER -> 4;
            case SECRETARY -> 5;
            case VICE_SECRETARY -> 6;
            case MEMBER -> 7;

        };
    }
    private String enumToPosition(UserPositions pos){
        return switch (pos){
            case CHAIRPERSON -> "CHAIR PERSON";
            case VICE_CHAIRPERSON -> "VICE CHAIR PERSON";
            case TREASURER -> "TREASURER";
            case VICE_TREASURER -> "VICE TREASURER";
            case SECRETARY -> "SECRETARY";
            case VICE_SECRETARY -> "VICE SECRETARY";
            case MEMBER -> "MEMBER";
            default -> throw new IllegalStateException("Unexpected value: " + pos);
        };
    }

    public UserGeneralResponse deleteUser(String email){
        log.info("Service to delete the user");
        try {

            Users user = usersRepository.findByEmail(email)
                    .orElseThrow(() -> {return new UserDoesNotExistException("User Does Not Exist");});

            usersRepository.delete(user);
            UserGeneralResponse userGeneralResponse = new UserGeneralResponse();
            userGeneralResponse.setMessage("User deleted successfully");
            userGeneralResponse.setDate(new Date());
            userGeneralResponse.setHttpStatus(HttpStatus.OK);
            log.info(userGeneralResponse.toString());

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
        user.setPosition(UserPositions.CHAIRPERSON);
        user.setEnabled(true);
//        emailService.sendRegistrationEmail(adminEmail,adminPassword);
        usersRepository.save(user);
        System.out.println(user.getPosition());

        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("Default admin created successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }

    public UserGeneralResponse updateUser(UserResponse regRequest,int userId) {


        Users user = usersRepository.findById(userId).orElseThrow(()->new UserDoesNotExistException("user not found"));


        if (usersRepository.existsByEmailAndUserIdNot(regRequest.getEmail(), userId)) {
            throw new UserAlreadyExistException("The email is already used by another user");
        }

        user.setEmail(regRequest.getEmail());
        user.setPosition(UserPositions.values()[regRequest.getPosition()]);
        user.setRole(regRequest.getRoles());


        usersRepository.save(user);

        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("User updated successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);

        return response;
    }


}
