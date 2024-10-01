package red.stevo.code.masenomedlabclub.Models.RequestModels;

import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Roles;
import red.stevo.code.masenomedlabclub.Service.UserPositions;

@Data
public class UsersRegistrationRequests {

    private String email;

    private Roles roles;

    private UserPositions position;

}
