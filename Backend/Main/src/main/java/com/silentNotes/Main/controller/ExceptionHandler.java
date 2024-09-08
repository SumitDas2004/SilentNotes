package com.silentNotes.Main.controller;

import com.silentNotes.Main.Exceptions.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionHandler {
    public ExceptionHandler(Environment environment) {
        this.environment = environment;
    }

    Environment environment;

    @org.springframework.web.bind.annotation.ExceptionHandler({PostDoesNotExistException.class, InvalidPasswordFormatException.class, PasswordDoesNotMatchException.class, UserDoesNotExistException.class, UserAlreadyExistException.class, UsernameNotAvailable.class, EmptyPostBodyException.class})
    public ResponseEntity<?> clientError(Exception e){
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Failed");
        map.put("error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({Exception.class})
    public ResponseEntity<?> exceptionHandler(Exception e){
        if(Arrays.asList(environment.getActiveProfiles()).contains("dev"))e.printStackTrace();
        log.error(e.getMessage());
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Failed");
        map.put("error", "Something went wrong.");
        return new ResponseEntity<>(map, HttpStatus.valueOf(500));
    }


    @org.springframework.web.bind.annotation.ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<?> methodArgumentNotValid(Exception e){
        log.error(e.getMessage());
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Failed");
        map.put("error", "Invalid input.");
        return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
