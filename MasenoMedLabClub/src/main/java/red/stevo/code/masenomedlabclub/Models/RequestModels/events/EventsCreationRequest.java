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
<<<<<<< HEAD
    private List<EventImagesCreationRequest> requestList;
=======

    private List<String> imageUrls;
>>>>>>> e8ffdb5f31634f2055ec67b8095def49489b6814
}
