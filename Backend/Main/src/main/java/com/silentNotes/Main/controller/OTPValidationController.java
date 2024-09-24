package com.silentNotes.Main.controller;

import com.silentNotes.Main.entity.Users;
import com.silentNotes.Main.service.OTPService;
import com.silentNotes.Main.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins={"${client.domain}"}, allowCredentials = "true")
public class OTPValidationController {
    OTPService otpService;
    UserService userService;

    public OTPValidationController(OTPService otpService, UserService userService) {
        this.otpService = otpService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<?> generateOTP(){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Users user = userService.getUserById(userId);
        otpService.sendOtp(userId, user.getEmail());
        Map<String, String> map = new HashMap<>();
        map.put("message", "OTP sent successfully.");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/validate/{otp}")
    public ResponseEntity<?> validateOTP(@PathVariable int otp){
        String userId = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean res = otpService.validateOTP(userId, otp);
        Map<String, Object> map = new HashMap<>();
        map.put("isValid", res);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
