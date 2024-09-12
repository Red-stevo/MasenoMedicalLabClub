package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class InvalidTokensException extends RuntimeException{
    public InvalidTokensException(String message) {
        super(message);
    }
}
