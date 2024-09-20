package red.stevo.code.masenomedlabclub.Service.DetService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.InvalidTokensException;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Repositories.users.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.filter.CookieUtils;

@Service
@RequiredArgsConstructor
@Slf4j
public class LogoutService {
    private final RefreshTokensRepository refreshTokensRepository;
    private final CookieUtils cookieUtils;
    private final HttpServletResponse response;
    private final JWTGenService jwtGenService;



    public UserGeneralResponse logOut(HttpServletRequest request) {

        String refreshTokens = cookieUtils.extractJwtFromCookie(request);
        if (refreshTokens != null) {
            throw new InvalidTokensException("no tokens found in request, cannot log you out");
        }

        Users users = refreshTokensRepository.findByRefreshToken(refreshTokens).
                orElseThrow(() -> new InvalidTokensException("refresh token not found")).getUser();

        if (!jwtGenService.isTokenValid(refreshTokens,users)){
            throw new InvalidTokensException("Invalid token");
        }

        Cookie logOutCookie = new Cookie("x-log-out", null);
        logOutCookie.setMaxAge(0);
        logOutCookie.setPath("/");
        logOutCookie.setHttpOnly(true);
        response.addCookie(logOutCookie);




        return null;

    }


}
