package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class InvalidEmailFormatException extends RuntimeException {
    public InvalidEmailFormatException(String message) {
        super(message);
    }

}
