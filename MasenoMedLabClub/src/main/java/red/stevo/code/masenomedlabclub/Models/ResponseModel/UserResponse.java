package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Roles;
@Data
public class UserResponse {
    private String email;

    private Roles roles;

    private String position;

    private int userId;
}
