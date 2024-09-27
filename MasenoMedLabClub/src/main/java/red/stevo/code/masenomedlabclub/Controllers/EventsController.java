package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Entities.events.EventImages;
import red.stevo.code.masenomedlabclub.Entities.events.Events;
import red.stevo.code.masenomedlabclub.Models.RequestModels.IndexPageImageModel;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Service.events.EventImagesService;
import red.stevo.code.masenomedlabclub.Service.events.EventsService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/apis/events")
@CrossOrigin(value={"http://localhost:5173"}, allowCredentials = "true")
public class EventsController {

    private final EventsService eventsService;

    private final EventImagesService imagesService;

    @GetMapping("/get-events")
    public ResponseEntity<List<Events>> getEvents() {
        log.info("Get our-events");
        List<Events> eventsList = eventsService.getAllEvents();
        return ResponseEntity.ok(eventsList);
    }

/*    @PostMapping("/post/images")
    public ResponseEntity<String> postEventImages(@RequestBody List<EventImagesCreationRequest> request) {
        imagesService.addEventImage(request);
        return ResponseEntity.ok("Images added successfully");
    }*/

    @GetMapping("/{eventId}/images")
    public ResponseEntity<List<EventImages>> getEventImages(@PathVariable String eventId) {
        return ResponseEntity.ok(imagesService.getEventImages(eventId));
    }

    @GetMapping("/{eventId}/get-event")
    public ResponseEntity<Events> getEvent(@PathVariable String eventId){
        log.info("Request to get event.");
        return new ResponseEntity<>(eventsService.getEventById(eventId), HttpStatus.OK);
    }

}
