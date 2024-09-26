package red.stevo.code.masenomedlabclub.Models.RequestModels;

import lombok.Data;

@Data
public class MessageModel {

    private String content;

    private Long replyToId;

    private String fileUrl;

    private Integer userId;
}
