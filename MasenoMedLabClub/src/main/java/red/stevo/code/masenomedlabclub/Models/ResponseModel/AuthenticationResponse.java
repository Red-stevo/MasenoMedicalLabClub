package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AuthenticationResponse {
    private  String token;
    private  String refreshToken;
    private  String message;
    public AuthenticationResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
    public AuthenticationResponse(String message) {
        this.message = message;
    }
}
