package red.stevo.code.masenomedlabclub.filter;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Entities.tokens.RefreshTokens;
import red.stevo.code.masenomedlabclub.Repositories.users.RefreshTokensRepository;
import red.stevo.code.masenomedlabclub.Service.DetService.JWTGenService;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class CookieUtils {
    private final RefreshTokensRepository refreshTokensRepository;

    private final JWTGenService jwtGenService;

    public HttpCookie responseCookie (Users user) {

        // Save the refresh token in the repository
        RefreshTokens tokenEntity = new RefreshTokens();
        tokenEntity.setUser(user);
        tokenEntity.setRefreshToken(jwtGenService.generateRefreshToken(user));


        refreshTokensRepository.save(tokenEntity);
        return ResponseCookie.from("x-refresh-token", tokenEntity.getRefreshToken())
                .maxAge(120)
                .httpOnly(true)
                .path("/")
                .build();
    }

    public  String extractJwtFromCookie(HttpServletRequest request) {


        String token = request.getHeader("cookie").substring(16);
        System.out.println(token);

        return token;

    }
}
