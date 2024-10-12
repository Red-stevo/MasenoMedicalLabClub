package red.stevo.code.masenomedlabclub.Entities.events;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class EventImages {

    @Id
    private String imageId;

    private String eventId;

    private String imageUrl;

   /* @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "")
    private Events event;*/

}

