package com.silentNotes.Main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/colleges")
@CrossOrigin(origins={"${client.domain}"}, allowCredentials = "true")
public class CollegeListAPI {
    @GetMapping("/{prefix}")
    public ResponseEntity<?> collegeListAPI(@PathVariable(name = "prefix") String prefix){
        RestTemplate rt = new RestTemplate();
        return new ResponseEntity<>(rt.getForObject("http://universities.hipolabs.com/search?name="+prefix, Object[].class), HttpStatus.OK);
    }
}
