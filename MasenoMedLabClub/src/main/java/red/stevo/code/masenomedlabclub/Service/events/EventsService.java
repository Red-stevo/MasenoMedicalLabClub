package red.stevo.code.masenomedlabclub.Service.events;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.EventsCreationException;
import red.stevo.code.masenomedlabclub.Entities.events.EventImages;
import red.stevo.code.masenomedlabclub.Entities.events.Events;
import red.stevo.code.masenomedlabclub.Models.RequestModels.events.EventImagesCreationRequest;
import red.stevo.code.masenomedlabclub.Models.RequestModels.events.EventsCreationRequest;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.EventsResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.ImageResponse;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;
import red.stevo.code.masenomedlabclub.Repositories.events.EventsRepository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventsService {

    private final EventsRepository eventsRepository;
    private final ModelMapper modelMapper;
    private final EventImagesService eventImagesService;

    public UserGeneralResponse createEvent(EventsCreationRequest request){

        log.info("Creating event");
        try {
            Events event = new Events();
            event.setEventName(request.getEventName());
            event.setEventDescription(request.getEventDescription());
            event.setEventDate(request.getEventDate());
            event.setEventLocation(request.getEventLocation());
            Events savedEvent = eventsRepository.save(event);
            System.out.println(savedEvent.getEventId());
            eventImagesService.addEventImage(request.getImageUrls(),savedEvent.getEventId());


            return new UserGeneralResponse();


        }catch (Exception e){
            log.error("Error creating event", e);
            throw new EventsCreationException("could not create the event");
        }

    }


    public void updateEvent(EventsCreationRequest request, String eventId){
        log.info("Updating event");
        try {
            Events events = eventsRepository.findEventsByEventId(eventId);
            if (events == null) {
                log.error("the event with id {} does not exist", eventId);
                throw new IllegalArgumentException("the event with id " + eventId + " does not exist");
            }
            events.setEventName(request.getEventName());
            events.setEventDescription(request.getEventDescription());
            events.setEventDate(request.getEventDate());
            events.setEventLocation(request.getEventLocation());
            eventImagesService.addEventImage(request.getImageUrls(),eventId);
            eventsRepository.save(events);
        }catch (Exception e){
            throw new RuntimeException("could not update the event", e);
        }
    }

    public void deleteEvent(String eventId){
        log.info("Deleting event");
        try {
            Events events = eventsRepository.findEventsByEventId(eventId);
            if (events == null) {
                throw new IllegalArgumentException("the event with id " + eventId + " does not exist");
            }
            eventsRepository.delete(events);
        }catch (Exception e){
            throw new RuntimeException("could not delete the event", e);
        }
    }

    public List<Events> getAllEvents() {
        log.info("Getting all the events");

        // Fetch all events
        return eventsRepository.findAll(Sort.by(Sort.Direction.DESC,"eventDate"));


    }



}
