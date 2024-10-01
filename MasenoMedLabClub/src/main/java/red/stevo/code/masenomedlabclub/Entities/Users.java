package red.stevo.code.masenomedlabclub.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import red.stevo.code.masenomedlabclub.Service.UserPositions;

import java.util.Collection;
import java.util.List;

@ToString
@Data
@Entity
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false,updatable = false)
    private Integer userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false,unique = true)
    private String email;

    private UserPositions position;

    private Roles role;

    @Column(nullable = false)
    private boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
