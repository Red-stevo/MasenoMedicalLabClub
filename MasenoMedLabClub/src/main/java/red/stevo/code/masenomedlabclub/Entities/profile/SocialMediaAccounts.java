package red.stevo.code.masenomedlabclub.Entities.profile;

import jakarta.persistence.*;
import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Users;
@Data
@Entity
public class SocialMediaAccounts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String socialMediaAccountId;
    private String profileId;
    private String socialMediaAccountName;
    private String socialMediaAccountUrl;


}
