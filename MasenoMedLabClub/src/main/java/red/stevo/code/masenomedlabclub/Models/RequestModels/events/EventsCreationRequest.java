package red.stevo.code.masenomedlabclub.Models.RequestModels.events;

import jakarta.annotation.Nullable;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;
import java.util.List;

@Data
@ToString
public class EventsCreationRequest {

    private String eventName;

    private String eventDescription;

    private Instant eventDate;

    private String eventLocation;

    @Nullable
    private List<EventImagesCreationRequest> requestList;

}
