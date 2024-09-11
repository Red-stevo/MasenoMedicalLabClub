package red.stevo.code.masenomedlabclub.filter;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class CookieUtils {

    @Value("${cookie_age}")
    private static int cookie_max_age;

    public  void createCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(token, token);
        cookie.setPath("/");
        cookie.setMaxAge(cookie_max_age);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public  String extractJwtFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
