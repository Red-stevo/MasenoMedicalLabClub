package red.stevo.code.masenomedlabclub.Repositories.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Entities.tokens.RefreshTokens;

import java.util.Optional;

@Repository
public interface RefreshTokensRepository extends JpaRepository<RefreshTokens, Integer> {
    Boolean existsRefreshTokensByRefreshToken(String refreshToken);

    Optional<RefreshTokens> findByRefreshToken(String refreshToken);

    RefreshTokens findByUser(Users user);

    boolean existsRefreshTokensByUser(Users user);
}
