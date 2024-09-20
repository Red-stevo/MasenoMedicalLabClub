package red.stevo.code.masenomedlabclub.Repositories.constitution;

import org.springframework.data.jpa.repository.JpaRepository;
import red.stevo.code.masenomedlabclub.Entities.constitution.ConstitutionSection;

public interface ConstitutionRepository extends JpaRepository<ConstitutionSection, Long> {
}

