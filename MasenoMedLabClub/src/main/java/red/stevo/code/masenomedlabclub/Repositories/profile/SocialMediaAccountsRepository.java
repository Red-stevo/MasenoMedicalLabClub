package red.stevo.code.masenomedlabclub.Repositories.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.profile.SocialMediaAccounts;

@Repository
public interface SocialMediaAccountsRepository extends JpaRepository<SocialMediaAccounts,String> {
    SocialMediaAccounts findBySocialMediaAccountId(String socialMediaAccountId);
}
