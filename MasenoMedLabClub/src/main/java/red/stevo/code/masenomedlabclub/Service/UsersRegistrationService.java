package red.stevo.code.masenomedlabclub.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

import java.util.ArrayList;
import java.util.InvalidPropertiesFormatException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Autowired})

public class UsersRegistrationService {

    private final UsersRepository usersRepository;
    private final JWTGenService jwtGenService;
    /*private final RefreshTokensRepository refreshTokensRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailValidator emailValidator;*/
    private final AuthenticationManager authenticationManager;


    public List<AuthenticationResponse> createUser(List<UsersRegistrationRequests> regRequest) {

        return null;
    }

    private boolean isEmailValid(String email) {
        org.apache.commons.validator.routines.EmailValidator emailValidator = org.apache.commons.validator.routines.EmailValidator.getInstance();
        return emailValidator.isValid(email);
    }

    public AuthenticationResponse loginUser(LoginRequests loginRequests) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequests.getEmail(),
                            loginRequests.getPassword()
                    )
            );
            Users user = usersRepository.findByEmailAndPassword(loginRequests.getEmail(),
                    loginRequests.getPassword());
            if (user == null) {
                throw new RuntimeException("user does not exist");
            }

            String accessToken = jwtGenService.generateAccessToken(user);
            String refreshToken = jwtGenService.generateRefreshToken(user);
            return new AuthenticationResponse(accessToken, refreshToken);
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

}
