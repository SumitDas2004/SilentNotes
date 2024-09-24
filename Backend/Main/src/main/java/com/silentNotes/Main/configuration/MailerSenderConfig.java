package com.silentNotes.Main.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class MailerSenderConfig {
    JavaMailSender sender;

    public MailerSenderConfig(JavaMailSender sender) {
        this.sender = sender;
    }

    @Async
    public void sendMail(String to, String subject, String body){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        sender.send(mailMessage);
    }
}
