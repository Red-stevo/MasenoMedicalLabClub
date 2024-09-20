package red.stevo.code.masenomedlabclub.Entities.profile;

import jakarta.persistence.*;
import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Users;

import java.util.List;

@Data
@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String profileId;
    private String userId;
    private String firstName;
    private String lastName;
    private String registrationNo;
    private String profileImage;
    @OneToMany(mappedBy = "profileId",cascade = CascadeType.ALL,
            orphanRemoval = true, fetch = FetchType.EAGER, targetEntity = SocialMediaAccounts.class)
    private List<SocialMediaAccounts> socialMediaAccounts;
    @OneToMany(mappedBy = "profileId",cascade = CascadeType.ALL,orphanRemoval = true,
            fetch = FetchType.EAGER, targetEntity = StudentResearch.class)
    private List<StudentResearch> studentResearch;
    @OneToOne
    @JoinColumn(referencedColumnName = "userId")
    private Users users;
}
