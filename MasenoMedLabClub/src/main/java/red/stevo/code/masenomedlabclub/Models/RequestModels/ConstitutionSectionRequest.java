package red.stevo.code.masenomedlabclub.Models.RequestModels;

import jakarta.persistence.Lob;
import lombok.Data;
import org.w3c.dom.Text;

import java.time.LocalDateTime;

@Data
public class ConstitutionSectionRequest {
    private String title;

    @Lob // For long text content
    private String content;

}
