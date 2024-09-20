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

@Configuration
@RequiredArgsConstructor
public class CookieUtils {
    private final RefreshTokensRepository refreshTokensRepository;

    private final JWTGenService jwtGenService;

    public HttpCookie responseCookie(Users user) {

        // Check if the user already has a refresh token
        if (!refreshTokensRepository.existsRefreshTokensByUser(user)) {
            // If not, create and save a new refresh token
            RefreshTokens newToken = new RefreshTokens();
            newToken.setUser(user);
            newToken.setRefreshToken(jwtGenService.generateRefreshToken(user)); // Generate a new refresh token

            refreshTokensRepository.save(newToken); // Save the new token in the repository

            // Return a new HttpOnly cookie containing the refresh token
            return ResponseCookie.from("x-refresh-token", newToken.getRefreshToken())
                    .maxAge(604800) // Set cookie expiry to 7 days
                    .httpOnly(true)  // Make cookie HttpOnly to prevent access via JavaScript
                    .path("/")       // Accessible on the entire domain
                    .build();
        }

        // If a refresh token exists, update it
        RefreshTokens existingToken = refreshTokensRepository.findByUser(user);
        existingToken.setRefreshToken(jwtGenService.generateRefreshToken(user)); // Generate a new refresh token
        refreshTokensRepository.save(existingToken); // Save the updated token

        // Return a new HttpOnly cookie with the updated refresh token
        return ResponseCookie.from("x-refresh-token", existingToken.getRefreshToken())
                .maxAge(604800) // Set cookie expiry to 7 days
                .httpOnly(true)  // Make cookie HttpOnly
                .path("/")       // Accessible on the entire domain
                .build();
    }


    public  String extractJwtFromCookie(HttpServletRequest request) {
        String token = request.getHeader("cookie").substring(16);
        token = token.split(";")[0];

        return token;
    }
}
