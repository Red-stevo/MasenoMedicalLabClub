package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    // Endpoint for retrieving messages by date range
    @GetMapping("/messages/by-date")
    public ResponseEntity<List<Message>> getMessagesByDate(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        // Fetch messages within the provided date range
        List<Message> messages = messageService.getMessagesByDateRange(start, end);

        // Return the messages
        return ResponseEntity.ok(messages);
    }
}