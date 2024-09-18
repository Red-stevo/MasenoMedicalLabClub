package red.stevo.code.masenomedlabclub.Models.ResponseModel;

import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.events.EventImages;
import red.stevo.code.masenomedlabclub.Entities.events.Events;

import java.util.List;

@Data
public class EventsResponse {
    private Events events;
    private List<EventImages> images;
}
