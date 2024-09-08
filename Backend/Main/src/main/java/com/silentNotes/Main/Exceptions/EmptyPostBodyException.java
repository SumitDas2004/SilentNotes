package com.silentNotes.Main.Exceptions;

public class EmptyPostBodyException extends RuntimeException{
    public EmptyPostBodyException(){
        super("Body of a can't be empty.");
    }
}
