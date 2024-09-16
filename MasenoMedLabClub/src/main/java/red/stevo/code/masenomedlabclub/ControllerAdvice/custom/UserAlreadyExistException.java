package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(String message) {
        super(message);
    }
}
