package red.stevo.code.masenomedlabclub.Service.DetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.UserDoesNotExistException;
import red.stevo.code.masenomedlabclub.Entities.Users;
import red.stevo.code.masenomedlabclub.Repositories.UsersRepository;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsersRepository repository;
    @Autowired
    public UserDetailsServiceImpl(UsersRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users userInfo = repository.findByEmail(email);
        if (userInfo == null) {
            throw new UserDoesNotExistException("This user does not exist");
        }
        return userInfo;
    }
}