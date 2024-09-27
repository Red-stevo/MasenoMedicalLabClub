package red.stevo.code.masenomedlabclub.Entities.constitution;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Data
public class ConstitutionSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob // For long text content
    private String content;

    private Instant createdAt;

    private Instant updatedAt;
}
