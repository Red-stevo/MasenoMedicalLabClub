package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import red.stevo.code.masenomedlabclub.Entities.events.Events;
import red.stevo.code.masenomedlabclub.Models.RequestModels.events.EventImagesCreationRequest;
import red.stevo.code.masenomedlabclub.Service.events.EventImagesService;
import red.stevo.code.masenomedlabclub.Service.events.EventsService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/apis/events")
@CrossOrigin(value="http://localhost:5173", allowCredentials = "true")
public class EventsController {
    private final EventsService eventsService;
    private final EventImagesService imagesService;

    @GetMapping("/our-events")
    public ResponseEntity<List<Events>> getEvents() {
        log.info("Get our-events");
        List<Events> eventsList = eventsService.getAllEvents();
        return ResponseEntity.ok(eventsList);
    }

    @PostMapping("/post/images")
    public ResponseEntity<String> postEventImages(@RequestBody List<EventImagesCreationRequest> request) {
        imagesService.addEventImage(request);
        return ResponseEntity.ok("Images added successfully");
    }

    @DeleteMapping("/delete/image")
    public ResponseEntity<String> deleteEventImage(@RequestBody List<String> imageUrl) {
        imagesService.deleteEventImages(imageUrl);
        return ResponseEntity.ok("Images deleted successfully");
    }
}
