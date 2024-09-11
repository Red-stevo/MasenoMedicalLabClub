package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class UsersCreationFailedException extends RuntimeException {
    public UsersCreationFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
