package red.stevo.code.masenomedlabclub.Service.events;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.EventsCreationException;
import red.stevo.code.masenomedlabclub.Entities.events.EventImages;
import red.stevo.code.masenomedlabclub.Entities.events.Events;
import red.stevo.code.masenomedlabclub.Models.RequestModels.events.EventImagesCreationRequest;
import red.stevo.code.masenomedlabclub.Repositories.events.EventsImagesRepository;
import red.stevo.code.masenomedlabclub.Repositories.events.EventsRepository;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventImagesService {

    private final EventsImagesRepository imagesRepository;
    private final EventsRepository eventsRepository;

    public void addEventImage(List<EventImagesCreationRequest> request) {
        log.info("Adding event images");

        try {
            List<EventImages> images = request.stream().map(imageRequest -> {
                // Fetch the event by its ID
                Events event = eventsRepository.findEventsByEventId(imageRequest.getEventId());

                // Check if the event exists
                if (event == null) {
                    throw new EventsCreationException("Event with ID " + imageRequest.getEventId() + " not found.");
                }

                // Create EventImages and set properties
                EventImages eventImage = new EventImages();
                eventImage.setImageUrl(imageRequest.getUrl());
                eventImage.setEvent(event);

                log.info("Adding image to event with ID: {}", imageRequest.getEventId());
                return eventImage;
            }).toList();

            // Save all event images in the database
            imagesRepository.saveAll(images);
            log.info("Successfully added {} images to events", images.size());
        } catch (Exception e) {
            log.error("Error occurred while uploading images for events: {}", e.getMessage());
            throw new EventsCreationException("Could not upload image for event: " + e.getMessage());
        }
    }


}
