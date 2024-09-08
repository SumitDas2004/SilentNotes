package com.silentNotes.Main.Exceptions;

public class PasswordDoesNotMatchException extends RuntimeException{
    public PasswordDoesNotMatchException(){
        super("Password does not match.");
    }
}
