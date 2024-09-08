package com.silentNotes.Main.Exceptions;

public class InvalidPasswordFormatException extends RuntimeException{
    public InvalidPasswordFormatException(){
        super("Invalid password format.");
    }
}
