package com.silentNotes.Main.Exceptions;

public class PostDoesNotExistException extends RuntimeException{
    public PostDoesNotExistException(){
        super("Post does not exist.");
    }
}
