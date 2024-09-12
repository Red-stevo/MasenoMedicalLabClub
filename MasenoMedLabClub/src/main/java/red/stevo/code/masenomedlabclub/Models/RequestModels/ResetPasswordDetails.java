package red.stevo.code.masenomedlabclub.Models.RequestModels;

import lombok.Data;

@Data
public class ResetPasswordDetails {

    private String email;
    private String oldPassword;
    private String newPassword;
}
