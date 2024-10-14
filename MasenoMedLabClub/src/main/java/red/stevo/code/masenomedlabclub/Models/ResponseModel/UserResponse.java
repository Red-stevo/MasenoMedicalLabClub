package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Roles;
import red.stevo.code.masenomedlabclub.Service.UserPositions;

import javax.swing.text.Position;

@Data
public class UserResponse {
    private String email;

    private Roles roles;

    private int position;

    private int userId;
}
