import {setUploadError} from "../../../ReduxStorage/EventsStore/saveEventReducer.js";
import {store} from "../../../ReduxStorage/Store.js";

export  const uploadWidget = (setImageUrls) => window.cloudinary.openUploadWidget(
    {
        cloudName:"de91mnunt",
        uploadPreset:"MasenoMedLabClub",
        sources:["local", "camera", "url"],
        multiple:true,
        maxFiles: 20,
        folder: "events_images_folder",
        resourceType: "image",
        cropping: false,
        showUploadMoreButton: true,
    },
    (error, result) => {
        if (error){
            store.dispatch(setUploadError(error.message));
        }else if (result.event === "success"){
            setImageUrls((urls) =>[...urls,
                {url: result.info.secure_url, imageId:result.info.public_id}]);
        }
    }
);