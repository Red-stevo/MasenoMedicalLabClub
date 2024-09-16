package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AuthenticationResponse {
    private  String token;

    private  String refreshToken;

    private  String message;

    private Integer userId;

    private String userRole;
}
