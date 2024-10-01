package red.stevo.code.masenomedlabclub.Repositories.events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.events.Events;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventsRepository extends JpaRepository<Events, String> {
    Events findEventsByEventId(String eventId);

    Optional<Events> findByEventId(String eventId);

    @Query("SELECT e FROM Events e ORDER BY e.eventDate DESC")
    List<Events> findAllOrderByEventDateDesc();

}
