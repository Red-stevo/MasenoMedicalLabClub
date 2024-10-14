package red.stevo.code.masenomedlabclub.Entities.tokens;

import jakarta.persistence.*;
import lombok.Data;
import red.stevo.code.masenomedlabclub.Entities.Users;

import java.time.Instant;
@Entity
@Data
public class RefreshTokens {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int tokenId;

    private String refreshToken;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    private Users user;
}
