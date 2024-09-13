package red.stevo.code.masenomedlabclub.Models.RequestModels.events;

import lombok.Data;

import java.time.Instant;
@Data
public class EventsCreationRequest {
    private String eventName;
    private String eventDescription;
    private Instant eventDate;
    private String eventLocation;
}
