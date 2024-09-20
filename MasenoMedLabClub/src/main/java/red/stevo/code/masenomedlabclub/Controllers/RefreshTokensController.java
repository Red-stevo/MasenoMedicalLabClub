package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Service.DetService.RefreshTokensService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/apis")
@CrossOrigin(value="http://localhost:5173", allowCredentials = "true")
public class RefreshTokensController {

    private final RefreshTokensService refreshTokensService;

    @GetMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshTokens(HttpServletRequest request) {
        // Refresh the token
        AuthenticationResponse authenticationResponse = refreshTokensService.refreshToken(request);

        // Return the new access token with a 200 OK status
        return ResponseEntity.ok(authenticationResponse);

    }
}
