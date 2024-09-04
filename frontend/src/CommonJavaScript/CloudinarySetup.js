export const CloudinarySetup = cloudinary.createUploadWidget({
        cloudName: 'de91mnunt',
        uploadPreset: 'MasenoMedLabClub'}, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
        }else
            console.log(error)
    }
)