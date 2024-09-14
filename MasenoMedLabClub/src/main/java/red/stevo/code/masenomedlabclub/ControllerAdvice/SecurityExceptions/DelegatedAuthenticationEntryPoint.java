package red.stevo.code.masenomedlabclub.ControllerAdvice.SecurityExceptions;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@RequiredArgsConstructor
@Component("DelegatedAuthenticationEntryPoint")
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Qualifier("handlerExceptionResolver")
    private final HandlerExceptionResolver resolver;
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        resolver.resolveException(request, response, null, authException);
    }
}
