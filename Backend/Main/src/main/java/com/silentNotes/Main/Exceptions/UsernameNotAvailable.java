package com.silentNotes.Main.Exceptions;

public class UsernameNotAvailable extends RuntimeException{
    public UsernameNotAvailable(){
        super("Username not available.");
    }
}
