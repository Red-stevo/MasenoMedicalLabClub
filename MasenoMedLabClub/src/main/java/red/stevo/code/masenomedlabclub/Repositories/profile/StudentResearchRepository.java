package red.stevo.code.masenomedlabclub.Repositories.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import red.stevo.code.masenomedlabclub.Entities.profile.StudentResearch;

public interface StudentResearchRepository extends JpaRepository<StudentResearch, String> {
    StudentResearch findByResearchId(String researchId);
}
