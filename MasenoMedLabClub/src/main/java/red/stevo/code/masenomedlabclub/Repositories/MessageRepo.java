package red.stevo.code.masenomedlabclub.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.Message;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message,Long> {

    List<Message> findAllByTimestampBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

}
