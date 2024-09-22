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

    @DeleteMapping("/delete/image")
    public ResponseEntity<UserGeneralResponse> deleteEventImage(@RequestBody List<String> imageUrl) {
        UserGeneralResponse response = imagesService.deleteEventImages(imageUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{eventId}/images")
    public ResponseEntity<List<EventImages>> getEventImages(@PathVariable String eventId) {
        return ResponseEntity.ok(imagesService.getEventImages(eventId));
    }

    @GetMapping("/{eventId}/get-event")
    public ResponseEntity<Events> getEvent(@PathVariable String eventId){
        log.info("Request to get event.");
        return new ResponseEntity<>(eventsService.getEventById(eventId), HttpStatus.OK);
    }

    /*This API will handle fetching index page saved image urls,
     * description, image titles and their ids.
     * Returns a list of all available images in the table.*/
   /* @GetMapping("/get-all/images")
    public ResponseEntity<List<IndexPageImageModel>> getAllSavedImages(){
        log.info("Getting Index page Images.");
        return adminIndexImagesStorageService.getAllIndexPageImages();
    }*/
}
