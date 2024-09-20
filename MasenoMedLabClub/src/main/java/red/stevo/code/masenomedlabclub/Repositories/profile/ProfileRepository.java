package red.stevo.code.masenomedlabclub.Repositories.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.profile.UserProfile;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<UserProfile, String> {
    Optional<UserProfile> findByProfileId(String profileId);

    UserProfile findByUserId(int userId);
}
