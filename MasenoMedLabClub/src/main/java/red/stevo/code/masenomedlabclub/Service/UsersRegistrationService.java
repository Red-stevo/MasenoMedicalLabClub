package red.stevo.code.masenomedlabclub.Service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.View;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.UsersCreationFailedException;
import red.stevo.code.masenomedlabclub.Entities.Roles;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Entities.tokens.RefreshTokens;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.UsersRegistrationRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Repositories.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.Repositories.UsersRepository;
import red.stevo.code.masenomedlabclub.Service.DetService.JWTGenService;
import red.stevo.code.masenomedlabclub.configurations.PasswordGenerator;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.InvalidPropertiesFormatException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Autowired})

public class UsersRegistrationService {

    private final UsersRepository usersRepository;
    private final JWTGenService jwtGenService;
    private final RefreshTokensRepository refreshTokensRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final PasswordGenerator passwordGenerator;
    private final CookieUtils cookieUtils;


    public List<String> createUser(List<UsersRegistrationRequests> regRequest) {
        List<Users> users = regRequest.stream()
                .map(usersRegistrationRequests -> {
                    Users users1 = new Users();
                    if (!isEmailValid(usersRegistrationRequests.getEmail())) {
                        try {
                            throw new InvalidPropertiesFormatException("invalid email format");
                        } catch (InvalidPropertiesFormatException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    users1.setEmail(usersRegistrationRequests.getEmail());
                    String password = passwordGenerator.generateRandomPassword(8);
                    System.out.println(password);
                    log.info("your default password is " + password);
                    users1.setPassword(passwordEncoder.encode(password));
                    users1.setRole(Roles.USER);
                    users1.setEnabled(true);
                    return users1;

                }).toList();
        usersRepository.saveAll(users);
        return Collections.singletonList("created successfully");
    }

    private boolean isEmailValid(String email) {
        org.apache.commons.validator.routines.EmailValidator emailValidator = org.apache.commons.validator.routines.EmailValidator.getInstance();
        return emailValidator.isValid(email);
    }

    public AuthenticationResponse loginUser(LoginRequests loginRequests, HttpServletResponse response) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequests.getEmail(),
                            loginRequests.getPassword()
                    )
            );

            // Fetch user details
            Users user = usersRepository.findByEmail(loginRequests.getEmail());
            if (user == null) {
                throw new UsernameNotFoundException("User does not exist");
            }

            // Generate access and refresh tokens
            String accessToken = jwtGenService.generateAccessToken(user);
            String refreshToken = jwtGenService.generateRefreshToken(user);

            // Save the refresh token in the repository
            RefreshTokens tokenEntity = new RefreshTokens();
            tokenEntity.setUser(user);
            tokenEntity.setRefreshToken(refreshToken);
            refreshTokensRepository.save(tokenEntity);

            // Set the access token in a secure cookie
            cookieUtils.createCookie(response, refreshToken);

            // Return an AuthenticationResponse object containing both tokens
            return new AuthenticationResponse(accessToken, refreshToken);

        } catch (BadCredentialsException e) {
            log.error("Authentication failed: Invalid credentials");
            throw new BadCredentialsException("Invalid credentials");
        } catch (Exception ex) {
            log.error("An error occurred during login: " + ex.getMessage());
            throw new RuntimeException("An error occurred during login");
        }
    }
}