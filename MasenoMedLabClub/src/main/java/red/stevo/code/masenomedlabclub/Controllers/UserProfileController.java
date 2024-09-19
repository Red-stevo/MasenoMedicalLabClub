package red.stevo.code.masenomedlabclub.Controllers;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.ProfileCreationRequests;
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
                                                             @RequestParam String userId) {
        UserGeneralResponse response = profileService.createProfile(requests,userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<UserGeneralResponse> updateProfile(@RequestBody ProfileCreationRequests requests,
                                                             @RequestParam String profileId){
        UserGeneralResponse response = profileService.updateProfile(requests,profileId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileCreationRequests> getProfile(@PathVariable String userId) {
        ProfileCreationRequests requests = profileService.getUserProfile(userId);
        return ResponseEntity.ok(requests);
    }

}
