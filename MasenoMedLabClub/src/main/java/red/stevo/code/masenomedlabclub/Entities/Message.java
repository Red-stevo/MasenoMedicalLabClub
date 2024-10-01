package red.stevo.code.masenomedlabclub.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id",nullable = false)
    private Users sender;

    private String content;

    private LocalDateTime timestamp;

    @OneToOne
    private Message replyTo;

    private String fileUrl;

}
