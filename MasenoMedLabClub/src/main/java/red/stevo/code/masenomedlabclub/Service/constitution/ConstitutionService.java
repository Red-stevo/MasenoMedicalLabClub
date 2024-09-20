package red.stevo.code.masenomedlabclub.Service.constitution;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.ResourceNotFoundException;
import red.stevo.code.masenomedlabclub.Entities.constitution.ConstitutionSection;
import red.stevo.code.masenomedlabclub.Repositories.constitution.ConstitutionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConstitutionService {


    private final ConstitutionRepository constitutionRepository;

    public List<ConstitutionSection> getAllSections() {
        return constitutionRepository.findAll();
    }

    public ConstitutionSection getSectionById(Long id) {
        return constitutionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Section not found"));
    }

    public ConstitutionSection createSection(ConstitutionSection section) {
        section.setCreatedAt(LocalDateTime.now());
        return constitutionRepository.save(section);
    }

    public ConstitutionSection updateSection(Long id, ConstitutionSection updatedSection) {
        ConstitutionSection existingSection = getSectionById(id);
        existingSection.setTitle(updatedSection.getTitle());
        existingSection.setContent(updatedSection.getContent());
        existingSection.setUpdatedAt(LocalDateTime.now());
        return constitutionRepository.save(existingSection);
    }

    public void deleteSection(Long id) {
        constitutionRepository.deleteById(id);
    }
}

