package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Service.DetService.LogoutService;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(value="http://localhost:5173", allowCredentials = "true")
public class LogoutController {

    private final LogoutService logoutService;

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        log.info("request to logout received");
        UserGeneralResponse response = logoutService.logOut(request);
        return ResponseEntity.ok(response);
    }
}
