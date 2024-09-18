package red.stevo.code.masenomedlabclub.Entities.events;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventId;

    private String eventName;

    private String eventDescription;

    private Instant eventDate;

    private String eventLocation;

    @OneToMany(mappedBy = "eventId", cascade = CascadeType.ALL, fetch = FetchType.EAGER) // Establishing relationship
    private List<EventImages> eventImages;


}

