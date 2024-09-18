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
    private final EventsImagesRepository eventsImagesRepository;

    public void addEventImage(List<String> request,String eventId) {
        log.info("Adding event images");

        try {
            List<EventImages> images = request.stream().map(imageRequest -> {

                // Check if the event exists

                // Create EventImages and set properties
                EventImages eventImage = new EventImages();
                eventImage.setImageUrl(imageRequest);
                eventImage.setEventId(eventId);

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

    public void deleteEventImages(List<String> url) {
        try {
            List<EventImages> imagesList = url.stream().map(
                    todelete->{
                        EventImages eventImage = eventsImagesRepository.findByImageUrl(todelete);
                        if (eventImage == null) {
                            throw new RuntimeException("such image not found");
                        }
                        return eventImage;
                    }
            ).toList();
            imagesRepository.deleteAll(imagesList);
        }catch (Exception e) {
            throw new RuntimeException("Error occurred while deleting image for events: ");
        }
    }

   /* public List<EventImages> getEventImages(Events events) {
        return imagesRepository.findAllByEvent(events);
    }*/

}
