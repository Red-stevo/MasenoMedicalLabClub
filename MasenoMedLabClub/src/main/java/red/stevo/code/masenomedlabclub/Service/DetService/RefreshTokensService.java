package red.stevo.code.masenomedlabclub.Service.DetService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.InvalidTokensException;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Repositories.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.Repositories.UsersRepository;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

import java.util.InvalidPropertiesFormatException;

@Service
@RequiredArgsConstructor
public class RefreshTokensService {

    private final RefreshTokensRepository refreshTokensRepository;
    private final JWTGenService jwtGenService;
    private final CookieUtils cookieUtils;
    private final UsersRepository usersRepository;


    public String refreshToken(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = cookieUtils.extractJwtFromCookie(request);

       if (refreshToken == null || refreshToken.isEmpty()) {
           throw new InvalidTokensException("No tokens found in request");
       }
       if (!refreshTokensRepository.existsRefreshTokensByRefreshToken(refreshToken)){
            throw new InvalidTokensException("refresh tokens does not exist");
       }




        Users users = refreshTokensRepository.findByRefreshToken(refreshToken).getUser();
        if (!jwtGenService.isTokenValid(refreshToken,users)){
            throw new InvalidTokensException("Invalid token");
        }

        String access = jwtGenService.generateAccessToken(users);
        cookieUtils.createCookie(response,access);
        return access;
    }

}
