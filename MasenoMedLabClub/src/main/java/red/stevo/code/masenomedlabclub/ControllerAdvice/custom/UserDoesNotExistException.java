package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class UserDoesNotExistException extends RuntimeException {
    public UserDoesNotExistException(String message) {
        super(message);
    }
}
