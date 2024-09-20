package red.stevo.code.masenomedlabclub.Controllers;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Entities.profile.UserProfile;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.ProfileCreationRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.ResearchRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.SocialMediaRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Service.profile.ProfileService;

@RestController
@Data
@RequiredArgsConstructor
@RequestMapping("/apis/user/profile")
public class UserProfileController {

    private final ProfileService profileService;

    @PostMapping("/create")
    public ResponseEntity<UserGeneralResponse> createProfile(@RequestBody ProfileCreationRequests requests,
                                                             @RequestParam int userId) {
        UserGeneralResponse response = profileService.createProfile(requests,userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<UserGeneralResponse> updateProfile(@RequestBody ProfileCreationRequests requests,
                                                             @RequestParam int userId){
        UserGeneralResponse response = profileService.updateProfile(requests,userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable int userId) {
        UserProfile requests = profileService.getUserProfile(userId);
        return ResponseEntity.ok(requests);
    }


    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<UserGeneralResponse> deleteProfile(@PathVariable int userId) {
        UserGeneralResponse response = profileService.deleteUserProfile(userId);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/research/{researchId}")
    public ResponseEntity<UserGeneralResponse> updateProfile(@PathVariable String researchId, @RequestBody ResearchRequests requests) {
        UserGeneralResponse response = profileService.updateStudentResearch(requests,researchId);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/social/{socialMediaAccountId}")
    public ResponseEntity<UserGeneralResponse> updateSocialMedia(@RequestBody SocialMediaRequests socialMediaAccounts,
                                                          @PathVariable String socialMediaAccountId){
        UserGeneralResponse response = profileService.updateSocialMedia(socialMediaAccounts,socialMediaAccountId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/social/{socialMediaAccountId}")
    public ResponseEntity<UserGeneralResponse> deleteSocialMedia(@PathVariable String socialMediaAccountId){
        UserGeneralResponse response = profileService.deleteSocialMedia(socialMediaAccountId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/research/{researchId}")
    public ResponseEntity<UserGeneralResponse> deleteStudentResearch(@PathVariable String researchId){
        UserGeneralResponse response = profileService.deleteStudentResearch(researchId);
        return ResponseEntity.ok(response);

    }

}
