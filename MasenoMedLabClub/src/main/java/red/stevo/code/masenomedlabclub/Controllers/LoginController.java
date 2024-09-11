package red.stevo.code.masenomedlabclub.Controllers;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Models.RequestModels.LoginRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.UsersRegistrationRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.AuthenticationResponse;
import red.stevo.code.masenomedlabclub.Service.UsersRegistrationService;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/apis")
public class LoginController {
    private final UsersRegistrationService registrationService;
    private final UsersRegistrationService usersRegistrationService;


    @PostMapping("/register")
    public ResponseEntity<List<String>> register(@RequestBody List<UsersRegistrationRequests> request){
        List<String> createUsers = usersRegistrationService.createUser(request);
        return ResponseEntity.ok(createUsers);
    }



    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequests requests, HttpServletResponse response) {
        log.info("Login request received for user: " + requests.getEmail());

        try {
            AuthenticationResponse authResponse = registrationService.loginUser(requests, response);
            return ResponseEntity.ok(authResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse("Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthenticationResponse("An error occurred during login"));
        }
    }
}
