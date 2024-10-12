package red.stevo.code.masenomedlabclub.Entities.events;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "eventId", cascade = CascadeType.ALL,
            fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "imageId")
    private List<EventImages> eventImages;


}

