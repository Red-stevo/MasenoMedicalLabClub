package red.stevo.code.masenomedlabclub.Repositories.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.Users;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);


    boolean existsByEmail(String email);

    Users findByUserId(Integer userId);

    boolean existsByEmailAndUserIdNot(String email, int userId);

}
