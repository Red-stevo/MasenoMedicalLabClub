package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AuthenticationResponse {
    private final String token;
    private final String refreshToken;
    public AuthenticationResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

}
