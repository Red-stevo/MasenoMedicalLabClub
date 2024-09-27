package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class ResourceCreationFailedException extends RuntimeException {
    public ResourceCreationFailedException(String message) {
        super(message);
    }
}
