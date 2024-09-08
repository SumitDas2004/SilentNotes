package com.silentNotes.Main.controller;


import com.silentNotes.Main.dto.user.LoginDTO;
import com.silentNotes.Main.dto.user.RegistrationDTO;
import com.silentNotes.Main.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowCredentials = "true", origins={"${client.domain}"})
public class UserController {

    @Autowired
    UserService userService;

    @Value("${domain}")
    String domain;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationDTO request, HttpServletResponse response){
        Map<String, String> map = new HashMap<>();
        String token = userService.register(request);
        map.put("message", "User registration successful.");

        ResponseCookie cookie = ResponseCookie.from("authToken", token)
                .domain(domain)
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO request, HttpServletResponse response){
        String token = userService.login(request);
        Map<String, String> map = new HashMap<>();
        map.put("message", "User login successful.");

        ResponseCookie cookie = ResponseCookie.from("authToken", token)
                .domain(domain)
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Success.");
        map.put("data", userService.getUserDetails(userId));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/isAvailable/{username}")
    public ResponseEntity<?> isUsernameAvailable(@PathVariable("username") String username){
        Map<String, Object> map = new HashMap<>();
        map.put("isAvailable", userService.isUsernameAvailable(username));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("authToken", "")
                .domain(domain)
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }
}
