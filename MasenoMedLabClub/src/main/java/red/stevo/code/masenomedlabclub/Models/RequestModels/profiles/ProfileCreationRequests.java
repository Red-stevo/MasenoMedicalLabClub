package red.stevo.code.masenomedlabclub.Models.RequestModels.profiles;

import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.profile.SocialMediaAccounts;
import red.stevo.code.masenomedlabclub.Entities.profile.StudentResearch;

import java.util.List;
@Data
public class ProfileCreationRequests {
    private String profileId;
    private String userId;
    private String firstName;
    private String lastName;
    private String registrationNo;
    private String profileImage;
    private String profileImageId;
    private List<SocialMediaRequests> mediaRequests;
    private List<ResearchRequests> studentResearches;
}
