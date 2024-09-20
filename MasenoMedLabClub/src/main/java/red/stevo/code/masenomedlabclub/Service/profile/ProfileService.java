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

    public UserGeneralResponse createProfile(ProfileCreationRequests requests, int userId) {
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
            if (requests.getMediaRequests() != null && !requests.getMediaRequests().isEmpty()) {
                addSocialMedia(savedProfile.getProfileId(), requests.getMediaRequests());
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

    public void addSocialMedia(String profileId, List<SocialMediaRequests> mediaRequests) {
        log.info("Adding social media accounts for profile: " + profileId);

        List<SocialMediaAccounts> accountsToSave = mediaRequests.stream()
                .map(accountRequest -> {
                    SocialMediaAccounts account = new SocialMediaAccounts();
                    account.setProfileId(profileId);
                    account.setSocialMediaAccountName(accountRequest.getSocialMediaName());
                    account.setSocialMediaAccountUrl(accountRequest.getSocialMediaUrl());
                    return account;
                }).toList();

        // Save the social media accounts
        socialMediaAccountsRepository.saveAll(accountsToSave);
    }
    public UserGeneralResponse  addStudentResearch(String profileId, List<StudentResearch> studentResearches){
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
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("research added successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }

    public UserGeneralResponse updateProfile(ProfileCreationRequests requests, int userId){
        log.info("Updating profile");
        UserProfile userProfile = profileRepository.findByUserId(userId);
        userProfile.setFirstName(requests.getFirstName());
        userProfile.setLastName(requests.getLastName());
        userProfile.setProfileImage(requests.getProfileImage());
        userProfile.setRegistrationNo(requests.getRegistrationNo());
        UserProfile userProfile1 = profileRepository.save(userProfile);
        if (requests.getMediaRequests() != null && !requests.getMediaRequests().isEmpty()) {
            addSocialMedia(userProfile1.getProfileId(), requests.getMediaRequests());
        }
        if (requests.getStudentResearches() != null && !requests.getStudentResearches().isEmpty()) {
            addStudentResearch(userProfile.getProfileId(), requests.getStudentResearches());
        }
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("Profile updated successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;

    }
    public UserGeneralResponse updateStudentResearch(ResearchRequests studentResearches, String researchId){
        log.info("Updating student research ");
        StudentResearch research = studentResearchRepository.findByResearchId(researchId);
        research.setResearchTitle(studentResearches.getResearchTitle());
        research.setResearchDescription(studentResearches.getResearchDescription());
        research.setResearchDocuments(studentResearches.getResearchDocument());
        studentResearchRepository.save(research);

        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("research updated successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;

    }

    public UserGeneralResponse updateSocialMedia(SocialMediaRequests socialMediaAccounts, String socialMediaAccountId){
        log.info("Updating social media accounts");
        SocialMediaAccounts mediaAccounts = socialMediaAccountsRepository.findBySocialMediaAccountId(socialMediaAccountId);
        mediaAccounts.setSocialMediaAccountName(socialMediaAccounts.getSocialMediaName());
        mediaAccounts.setSocialMediaAccountUrl(socialMediaAccounts.getSocialMediaUrl());
        socialMediaAccountsRepository.save(mediaAccounts);
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("social media updated successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }
    public UserGeneralResponse deleteSocialMedia(String socialMediaAccountId){
        log.info("Deleting social media account");
        SocialMediaAccounts mediaAccounts = socialMediaAccountsRepository.findBySocialMediaAccountId(socialMediaAccountId);
        socialMediaAccountsRepository.delete(mediaAccounts);
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("social media deleted successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }
    public UserGeneralResponse deleteStudentResearch(String researchId){
        log.info("Deleting student research");
        StudentResearch research = studentResearchRepository.findByResearchId(researchId);
        studentResearchRepository.delete(research);
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("research deleted successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }

    public UserGeneralResponse deleteUserProfile(int userId){
        log.info("Deleting user profile");
        UserProfile profile = profileRepository.findByUserId(userId);
        profileRepository.delete(profile);
        UserGeneralResponse response = new UserGeneralResponse();
        response.setMessage("profile deleted successfully");
        response.setDate(new Date());
        response.setHttpStatus(HttpStatus.OK);
        return response;
    }
    public UserProfile getUserProfile(int userId){
        log.info("Retrieving user profile");
        UserProfile profile = profileRepository.findByUserId(userId);
        return profile;

    }
}
