package red.stevo.code.masenomedlabclub.Models.RequestModels.events;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EventImagesCreationRequest {
    String imageId;

    String url;

}
