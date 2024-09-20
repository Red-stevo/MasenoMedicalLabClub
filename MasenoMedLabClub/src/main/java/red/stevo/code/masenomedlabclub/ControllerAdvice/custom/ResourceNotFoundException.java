package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
