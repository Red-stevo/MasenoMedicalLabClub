package red.stevo.code.masenomedlabclub.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import red.stevo.code.masenomedlabclub.Entities.Users;

import java.util.Optional;
@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}
