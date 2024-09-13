package red.stevo.code.masenomedlabclub.Repositories.events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.events.EventImages;

@Repository
public interface EventsImagesRepository extends JpaRepository<EventImages,String> {
    EventImages findByImageUrl(String todelete);
}