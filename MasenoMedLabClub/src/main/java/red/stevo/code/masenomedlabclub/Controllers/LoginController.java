package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Service.UsersRegistrationService;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/apis")
public class LoginController {
    private final UsersRegistrationService registrationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(LoginRequests requests){
        log.info("Login request");
        AuthenticationResponse response = registrationService.loginUser(requests);
        return ResponseEntity.ok(response);
    }
}
