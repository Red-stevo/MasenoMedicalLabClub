package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(String message) {
        super(message);
    }
}
