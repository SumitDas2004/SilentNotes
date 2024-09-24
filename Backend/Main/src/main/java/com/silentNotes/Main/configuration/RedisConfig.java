package com.silentNotes.Main.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory factory){
        RedisTemplate<?, ?> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        return template;
    }
}
