package com.silentNotes.Main.Exceptions;

public class UserAlreadyExistException extends RuntimeException{
    public UserAlreadyExistException(){
        super("User already exists.");
    }
}
