package com.silentNotes.Main.constants;

public class Utils {
    public static String extractDomain(String email){
        return email.substring(email.lastIndexOf('@')+1);
    }
}
