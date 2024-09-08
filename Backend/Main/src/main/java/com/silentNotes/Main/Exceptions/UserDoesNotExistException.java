package com.silentNotes.Main.Exceptions;

public class UserDoesNotExistException extends RuntimeException{
    public UserDoesNotExistException(){
        super("User does not exist.");
    }
}
