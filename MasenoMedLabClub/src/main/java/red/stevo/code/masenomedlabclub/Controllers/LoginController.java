package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.ResetPasswordDetails;
import red.stevo.code.masenomedlabclub.Models.RequestModels.UsersRegistrationRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Service.UsersRegistrationService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/apis")
@CrossOrigin(value = {"http://localhost/5173", "http://192.168.100.7/5173"}, allowCredentials = "true")
public class LoginController {

    private final UsersRegistrationService registrationService;

    private final UsersRegistrationService usersRegistrationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequests requests) {
        log.info("Login request received.");
        return registrationService.loginUser(requests);
    }


    @PutMapping("/update/password")
    public ResponseEntity<UserGeneralResponse> updatePassword(@RequestBody ResetPasswordDetails details){
        log.info("Request to update password.");
        return ResponseEntity.ok(usersRegistrationService.resetPassword(details));
    }


}
