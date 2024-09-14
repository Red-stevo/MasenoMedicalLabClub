package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import red.stevo.code.masenomedlabclub.Service.DetService.RefreshTokensService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/apis")
@CrossOrigin(value = "*", allowCredentials = "true")
public class RefreshTokensController {

    private final RefreshTokensService refreshTokensService;

    @GetMapping("/refresh")
    public String refreshTokens(HttpServletRequest request, HttpServletResponse response) {
        return refreshTokensService.refreshToken(request,response);
    }
}
