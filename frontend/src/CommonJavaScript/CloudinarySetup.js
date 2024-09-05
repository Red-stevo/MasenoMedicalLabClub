export const CloudinarySetup = cloudinary.createUploadWidget({
        cloudName: 'de91mnunt',
        uploadPreset: 'MasenoMedLabClub'}, (error, result) => {
        if (!error && result && result.event === "success") {
            return result;
        }else
            return error;
    }
)