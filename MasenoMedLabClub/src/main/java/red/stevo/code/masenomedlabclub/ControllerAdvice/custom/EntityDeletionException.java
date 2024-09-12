package red.stevo.code.masenomedlabclub.ControllerAdvice.custom;

public class EntityDeletionException  extends RuntimeException {
    public EntityDeletionException(String message) {
        super(message);
    }
}
