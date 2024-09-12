package red.stevo.code.masenomedlabclub.Entities.events;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.Instant;
@Entity
@Data
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String event_id;
    private String eventName;
    private String eventDescription;
    private Instant eventDate;
    private String eventLocation;

}
