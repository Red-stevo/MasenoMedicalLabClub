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

    public  Cookie createCookie(String token) {
        Cookie cookie = new Cookie("x-refresh-cookie", token);

        cookie.setPath("/");
        cookie.setMaxAge(cookie_max_age);
        cookie.setHttpOnly(true);
        cookie.setValue(token);
        return cookie;
    }

    public  String extractJwtFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("cookies : "+cookie.getValue());
            }
        }
        return null;
    }
}
