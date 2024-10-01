package red.stevo.code.masenomedlabclub.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import red.stevo.code.masenomedlabclub.Entities.Message;
import red.stevo.code.masenomedlabclub.Models.RequestModels.MessageModel;
import red.stevo.code.masenomedlabclub.Service.MessageService;

@Component
@RequiredArgsConstructor
public class SendMessageWs {

    private final MessageService messageService;

    // Endpoint for sending messages
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(MessageModel messageModel) {
        return messageService.saveMessage(messageModel.getUserId(), messageModel);
    }
}