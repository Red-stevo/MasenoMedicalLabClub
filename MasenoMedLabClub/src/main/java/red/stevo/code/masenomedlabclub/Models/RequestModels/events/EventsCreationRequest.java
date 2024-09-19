package red.stevo.code.masenomedlabclub.Models.RequestModels.events;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class EventsCreationRequest {
    private String eventName;
    private String eventDescription;
    private Instant eventDate;
    private String eventLocation;
    private List<EventImagesCreationRequest> requestList;
}
