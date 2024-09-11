package red.stevo.code.masenomedlabclub.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.tokens.RefreshTokens;
@Repository
public interface RefreshTokensRepository extends JpaRepository<RefreshTokens, Integer> {
}
