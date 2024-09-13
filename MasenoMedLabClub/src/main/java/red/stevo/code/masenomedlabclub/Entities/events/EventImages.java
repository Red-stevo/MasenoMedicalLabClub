package red.stevo.code.masenomedlabclub.Entities.events;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class EventImages {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String imageId;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Events event;
}
