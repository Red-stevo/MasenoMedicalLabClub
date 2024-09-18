package red.stevo.code.masenomedlabclub.Service.profile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.Entities.profile.SocialMediaAccounts;
import red.stevo.code.masenomedlabclub.Entities.profile.StudentResearch;
import red.stevo.code.masenomedlabclub.Entities.profile.UserProfile;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.ProfileCreationRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.ResearchRequests;
import red.stevo.code.masenomedlabclub.Models.RequestModels.profiles.SocialMediaRequests;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Repositories.profile.ProfileRepository;
import red.stevo.code.masenomedlabclub.Repositories.profile.SocialMediaAccountsRepository;
import red.stevo.code.masenomedlabclub.Repositories.profile.StudentResearchRepository;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final SocialMediaAccountsRepository socialMediaAccountsRepository;
    private final StudentResearchRepository studentResearchRepository;
    private final ModelMapper modelMapper;

    public UserGeneralResponse createProfile(ProfileCreationRequests requests, String userId) {
        try {
            log.info("Creating profile");

            // Create and save the user profile
            UserProfile userProfile = new UserProfile();
            userProfile.setUserId(userId);
            userProfile.setFirstName(requests.getFirstName());
            userProfile.setLastName(requests.getLastName());
            userProfile.setProfileImage(requests.getProfileImage());
            userProfile.setRegistrationNo(requests.getRegistrationNo());

            // Save user profile
            UserProfile savedProfile = profileRepository.save(userProfile);

            // Add social media accounts if provided
            if (requests.getSocialMediaAccounts() != null && !requests.getSocialMediaAccounts().isEmpty()) {
                addSocialMedia(savedProfile.getProfileId(), requests.getSocialMediaAccounts());
            }

            if (requests.getStudentResearches() != null && !requests.getStudentResearches().isEmpty()){
                addStudentResearch(savedProfile.getProfileId(), requests.getStudentResearches());
            }

            UserGeneralResponse response = new UserGeneralResponse();
            response.setMessage("Profile created successfully");
            response.setDate(new Date());
            response.setHttpStatus(HttpStatus.OK);
            return response;

        } catch (Exception e) {
            log.error("Error creating profile", e);
            throw new RuntimeException("Failed to create profile", e);
        }
    }

    public void addSocialMedia(String profileId, List<SocialMediaAccounts> socialMediaAccounts) {
        log.info("Adding social media accounts for profile: " + profileId);

        List<SocialMediaAccounts> accountsToSave = socialMediaAccounts.stream()
                .map(accountRequest -> {
                    SocialMediaAccounts account = new SocialMediaAccounts();
                    account.setProfileId(accountRequest.getProfileId());
                    account.setSocialMediaAccountName(accountRequest.getSocialMediaAccountName());
                    account.setSocialMediaAccountUrl(accountRequest.getSocialMediaAccountUrl());
                    return account;
                }).toList();

        // Save the social media accounts
        socialMediaAccountsRepository.saveAll(accountsToSave);
    }
    public void  addStudentResearch(String profileId, List<StudentResearch> studentResearches){
        log.info("Adding student research for profile: " + profileId);
        List<StudentResearch> studentResearchesToSave = studentResearches.stream()
                .map(researchReq->{
                    StudentResearch studentResearch = new StudentResearch();
                    studentResearch.setProfileId(profileId);
                    studentResearch.setResearchTitle(researchReq.getResearchTitle());
                    studentResearch.setResearchDescription(researchReq.getResearchDescription());
                    studentResearch.setResearchDocuments(researchReq.getResearchDocuments());
                    return studentResearch;
                }).toList();
        studentResearchRepository.saveAll(studentResearchesToSave);
    }

    private UserGeneralResponse updateProfile(ProfileCreationRequests requests, String profileId){
        log.info("Updating profile");
        UserProfile userProfile = profileRepository.findByProfileId(profileId).orElseThrow();
        userProfile.setFirstName(requests.getFirstName());
        userProfile.setLastName(requests.getLastName());
        userProfile.setProfileImage(requests.getProfileImage());
        userProfile.setRegistrationNo(requests.getRegistrationNo());
        UserProfile updatedProfile = profileRepository.save(userProfile);
        if (requests.getSocialMediaAccounts() != null && !requests.getSocialMediaAccounts().isEmpty()) {
            addSocialMedia(updatedProfile.getProfileId(), requests.getSocialMediaAccounts());
        }
        if (requests.getStudentResearches() != null && !requests.getStudentResearches().isEmpty()) {
            addStudentResearch(updatedProfile.getProfileId(), requests.getStudentResearches());
        }
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("Profile updated successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;

    }
    private void updateStudentResearch(ResearchRequests studentResearches, String researchId){
        log.info("Updating student research ");
        StudentResearch research = studentResearchRepository.findByResearchId(researchId);
        research.setResearchTitle(studentResearches.getResearchTitle());
        research.setResearchDescription(studentResearches.getResearchDescription());
        research.setResearchDocuments(studentResearches.getResearchDocument());
        studentResearchRepository.save(research);


    }

    private void updateSocialMedia(SocialMediaRequests socialMediaAccounts, String socialMediaAccountId){
        log.info("Updating social media accounts");
        SocialMediaAccounts mediaAccounts = socialMediaAccountsRepository.findBySocialMediaAccountId(socialMediaAccountId);
        mediaAccounts.setSocialMediaAccountName(socialMediaAccounts.getSocialMediaName());
        mediaAccounts.setSocialMediaAccountUrl(socialMediaAccounts.getSocialMediaUrl());
        socialMediaAccountsRepository.save(mediaAccounts);
    }
    private void deleteSocialMedia(String socialMediaAccountId){
        log.info("Deleting social media account");
        SocialMediaAccounts mediaAccounts = socialMediaAccountsRepository.findBySocialMediaAccountId(socialMediaAccountId);
        socialMediaAccountsRepository.delete(mediaAccounts);
    }
    private void deleteStudentResearch(String researchId){
        log.info("Deleting student research");
        StudentResearch research = studentResearchRepository.findByResearchId(researchId);
        studentResearchRepository.delete(research);
    }

    private void deleteUserProfile(String profileId){
        log.info("Deleting user profile");
        UserProfile profile = profileRepository.findByProfileId(profileId).orElseThrow();
        profileRepository.delete(profile);
    }
    private ProfileCreationRequests getUserProfile(String userId){
        log.info("Retrieving user profile");
        UserProfile profile = profileRepository.findByUserId(userId);
        modelMapper.getConfiguration()
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true);
        return modelMapper.map(profile, ProfileCreationRequests.class);

    }
}
