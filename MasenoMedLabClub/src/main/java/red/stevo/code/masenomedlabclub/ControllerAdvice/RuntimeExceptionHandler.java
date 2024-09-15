package red.stevo.code.masenomedlabclub.ControllerAdvice;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import red.stevo.code.masenomedlabclub.ControllerAdvice.SecurityExceptions.AccessDeniedExceptionHandler;
import red.stevo.code.masenomedlabclub.ControllerAdvice.custom.*;
import red.stevo.code.masenomedlabclub.Models.ResponseModel.UserGeneralResponse;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class RuntimeExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handle(MethodArgumentNotValidException ex) {
        log.error("MethodArgumentNotValidException");
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error -> {
            String filedName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(filedName, errorMessage);
        }));

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleConstraintViolationException(ConstraintViolationException ex){
        Map<String, String> errors = new HashMap<>();

        ex.getConstraintViolations().forEach((violation) -> {
            String filedName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();

            errors.put(filedName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<UserGeneralResponse> handleAccessDeniedException(AccessDeniedException ex){
        log.warn("AccessDeniedException occurred.{}", ex.getMessage());

        UserGeneralResponse userGeneralResponse = new UserGeneralResponse();
        userGeneralResponse.setHttpStatus(HttpStatus.FORBIDDEN);
        userGeneralResponse.setMessage("Permission Denied.");
        userGeneralResponse.setDate(new Date());

        return new ResponseEntity<>(userGeneralResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<UserGeneralResponse> handleAuthenticationEntryPointException(AuthenticationException ex){
        log.warn("Authentication Exception.");

        UserGeneralResponse userGeneralResponse = new UserGeneralResponse();
        userGeneralResponse.setHttpStatus(HttpStatus.FORBIDDEN);
        userGeneralResponse.setMessage("Authentication failed. "+ex.getMessage());
        userGeneralResponse.setDate(new Date());

        return new ResponseEntity<>(userGeneralResponse, HttpStatus.UNAUTHORIZED);
    }

/*    @ExceptionHandler(UserDoesNotExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleUserDoesNotExistException(UserDoesNotExistException ex){
        Map<String, String> errors = new HashMap<>();

        String message = ex.getMessage();
        errors.put("message", message);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }*/

/*
    @ExceptionHandler(UsersCreationFailedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleUsersCreationFailedException(UsersCreationFailedException ex){
        Map<String, String> errors = new HashMap<>();
        String message = ex.getMessage();
        Throwable cause = ex.getCause();
        errors.put("message"+ message+"cause", cause.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
*/

/*
    @ExceptionHandler(InvalidTokensException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Map<String, String>> handleInvalidTokensException(InvalidTokensException ex){
        Map<String, String> errors = new HashMap<>();
        String message = ex.getMessage();
        errors.put("message"+ message+"cause", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.UNAUTHORIZED);
    }
*/

    @ExceptionHandler(EntityDeletionException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleEntityDeletionException(EntityDeletionException ex){
        Map<String, String> errors = new HashMap<>();
        String message = ex.getMessage();
        errors.put("message"+ message+"cause", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(EventsCreationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleEventsCreationException
            (EventsCreationException ex){
        Map<String, String> errors = new HashMap<>();
        String message = ex.getMessage();
        errors.put("message"+ message+"cause", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
