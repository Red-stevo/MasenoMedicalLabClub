package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Service.DetService.RefreshTokensService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/apis")
@CrossOrigin(value ="http://localhost/5173", allowCredentials = "true")
public class RefreshTokensController {

    private final RefreshTokensService refreshTokensService;

    @PutMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshTokens(HttpServletRequest request, HttpServletResponse response) {
        // Refresh the token
        AuthenticationResponse authenticationResponse = refreshTokensService.refreshToken(request);

        // Return the new access token with a 200 OK status
        return ResponseEntity.ok(authenticationResponse);

    }
}
