package red.stevo.code.masenomedlabclub.Service.DetService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.InvalidTokensException;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Repositories.users.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.Repositories.users.UsersRepository;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

@Service
@RequiredArgsConstructor
public class RefreshTokensService {

    private final RefreshTokensRepository refreshTokensRepository;
    private final JWTGenService jwtGenService;
    private final CookieUtils cookieUtils;
    private final HttpServletResponse response;


    public AuthenticationResponse refreshToken(HttpServletRequest request) {

        String refreshToken = cookieUtils.extractJwtFromCookie(request);



       if (refreshToken == null || refreshToken.isEmpty())
           throw new InvalidTokensException("No tokens found in request");


        Users users = refreshTokensRepository.findByRefreshToken(refreshToken).
                orElseThrow(() -> new InvalidTokensException("refresh token not found")).getUser();

        if (!jwtGenService.isTokenValid(refreshToken,users)){
            throw new InvalidTokensException("Invalid token");
        }

        HttpCookie refresh = cookieUtils.responseCookie(users);
        response.setHeader("Set-Cookie", refresh.toString());
        String accessToken = jwtGenService.generateAccessToken(users);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(accessToken);
        authenticationResponse.setMessage("access token refreshed successfully");
        authenticationResponse.setRefreshToken(String.valueOf(refresh));
        authenticationResponse.setUserRole(String.valueOf(users.getRole()));
        authenticationResponse.setUserId(users.getUserId());


        return authenticationResponse;

    }

}
