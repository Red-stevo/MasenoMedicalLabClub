package red.stevo.code.masenomedlabclub.Entities.events;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class EventImages {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String imageId;
    private String eventId;
    private String imageUrl;


}

