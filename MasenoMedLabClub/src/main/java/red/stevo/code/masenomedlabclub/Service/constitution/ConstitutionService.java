package red.stevo.code.masenomedlabclub.Service.constitution;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.ResourceCreationFailedException;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.ResourceNotFoundException;
import red.stevo.code.masenomedlabclub.Entities.constitution.ConstitutionSection;
import red.stevo.code.masenomedlabclub.Models.RequestModels.ConstitutionSectionRequest;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Repositories.constitution.ConstitutionRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConstitutionService {


    private final ConstitutionRepository constitutionRepository;

    public List<ConstitutionSection> getAllSections() {
        try {
            return constitutionRepository.findAll();
        }catch (Exception e) {
            throw new ResourceNotFoundException("could not get the constitution sections");
        }
    }

    public ConstitutionSection getSectionById(Long id) {
        return constitutionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Section not found"));
    }

    public UserGeneralResponse createSection(List<ConstitutionSectionRequest> sectionRequest) {

        log.info("service to create constitution sections");
        try {
            List<ConstitutionSection> sections = sectionRequest.stream()
                    .map(request ->{
                        ConstitutionSection section = new ConstitutionSection();
                        section.setTitle(request.getTitle());
                        section.setContent(request.getContent());
                        section.setCreatedAt(Instant.now());
                        section.setUpdatedAt(Instant.now());
                        return section;
                    }).toList();
            constitutionRepository.saveAll(sections);

            UserGeneralResponse response = new UserGeneralResponse();
            response.setHttpStatus(HttpStatus.OK);
            response.setMessage("constitution section created successfully");
            response.setDate(new Date());
            return response;
        }catch (Exception e) {
            throw new ResourceCreationFailedException("could not create constitution section");
        }
    }

    public UserGeneralResponse updateSection(Long id, ConstitutionSectionRequest updatedSection) {
        log.info("service to update a constitution section");
        try {
            ConstitutionSection existingSection = getSectionById(id);
            existingSection.setTitle(updatedSection.getTitle());
            existingSection.setContent(updatedSection.getContent());
            existingSection.setUpdatedAt(Instant.now());
            constitutionRepository.save(existingSection);

            UserGeneralResponse response = new UserGeneralResponse();
            response.setHttpStatus(HttpStatus.OK);
            response.setMessage("constitution section created successfully");
            response.setDate(new Date());
            return response;
        }catch (Exception e) {
            throw new ResourceCreationFailedException("could not update the constitution section");
        }
    }

    public UserGeneralResponse deleteSection(Long id) {
        constitutionRepository.deleteById(id);

        UserGeneralResponse response = new UserGeneralResponse();
        response.setHttpStatus(HttpStatus.OK);
        response.setMessage("user deleted successfully");
        response.setDate(new Date());
        return response;
    }
}

