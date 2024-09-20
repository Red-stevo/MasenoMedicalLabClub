package red.stevo.code.masenomedlabclub.Entities.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class StudentResearch {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String researchId;
    private String profileId;
    private String researchTitle;
    private String researchDescription;
    private String researchDocuments;
}
