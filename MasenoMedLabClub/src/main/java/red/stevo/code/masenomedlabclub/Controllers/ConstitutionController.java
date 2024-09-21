package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Entities.constitution.ConstitutionSection;
import red.stevo.code.masenomedlabclub.Models.RequestModels.ConstitutionSectionRequest;
import red.stevo.code.masenomedlabclub.Service.constitution.ConstitutionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/apis/constitution")
public class ConstitutionController {

    private final ConstitutionService constitutionService;

    // Create a section
    @PostMapping
    public ResponseEntity<?> createSection(@RequestBody List<ConstitutionSectionRequest> sections) {
        return new ResponseEntity<>(constitutionService.createSection(sections), HttpStatus.CREATED);
    }

    // Get all sections
    @GetMapping
    public ResponseEntity<List<ConstitutionSection>> getAllSections() {
        return ResponseEntity.ok(constitutionService.getAllSections());
    }

    // Get a specific section by ID
    @GetMapping("/{id}")
    public ResponseEntity<ConstitutionSection> getSectionById(@PathVariable Long id) {
        return ResponseEntity.ok(constitutionService.getSectionById(id));
    }

    // Update a section by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSection(@PathVariable Long id,
                                           @RequestBody ConstitutionSectionRequest section) {
        return ResponseEntity.ok(constitutionService.updateSection(id, section));
    }

    // Delete a section by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSection(@PathVariable Long id) {
        constitutionService.deleteSection(id);
        return ResponseEntity.ok("deleted successfully");
    }
}

