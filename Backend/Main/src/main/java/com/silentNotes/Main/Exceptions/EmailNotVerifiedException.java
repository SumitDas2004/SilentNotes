package com.silentNotes.Main.Exceptions;

public class EmailNotVerifiedException extends RuntimeException{
    public EmailNotVerifiedException(){
        super("Email not verified.");
    }
}
