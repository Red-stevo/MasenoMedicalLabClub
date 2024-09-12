package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import red.stevo.code.masenomedlabclub.Entities.events.Events;
import red.stevo.code.masenomedlabclub.Service.events.EventsService;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/apis/events")
public class EventsController {
    private final EventsService eventsService;

    @GetMapping("/our-events")
    public ResponseEntity<List<Events>> getEvents() {
        log.info("Get our-events");
        List<Events> eventsList = eventsService.getAllEvents();
        return ResponseEntity.ok(eventsList);
    }
}
