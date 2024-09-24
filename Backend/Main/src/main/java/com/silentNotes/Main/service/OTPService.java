package com.silentNotes.Main.service;

import com.silentNotes.Main.configuration.MailerSenderConfig;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class OTPService {

    public OTPService(MailerSenderConfig mailSender, RedisTemplate<String, Integer> redisTemplate, UserService userService) {
        this.mailSender = mailSender;
        this.redisTemplate = redisTemplate;
        this.userService = userService;
    }

    MailerSenderConfig mailSender;
    RedisTemplate<String, Integer> redisTemplate;
    UserService userService;

    public void sendOtp(String userId, String email){
        int otp = generateOTP();
        redisTemplate.opsForValue().set(userId, otp);
        redisTemplate.expire(userId, 10, TimeUnit.MINUTES);
        mailSender.sendMail(email, "SilentNotes - Verification", "Hey there!! Welcome to SilentNotes. Your OTP is: "+otp+". This will expire in 10 minutes");
    }

    public boolean validateOTP(String id, int otp){
        Integer storedOTP = redisTemplate.opsForValue().get(id);
        if(storedOTP!=null && otp==storedOTP){
            redisTemplate.opsForValue().getAndDelete(id);
            userService.validateUser(id);
            return true;
        }else {
            return false;
        }
    }

    public int generateOTP(){
        return (int)(Math.random()*1000000);
    }
}
