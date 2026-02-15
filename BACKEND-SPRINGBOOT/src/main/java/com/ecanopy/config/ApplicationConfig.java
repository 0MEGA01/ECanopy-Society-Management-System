package com.ecanopy.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
    JwtProperties.class,
    FileUploadProperties.class,
    RazorpayProperties.class
})
public class ApplicationConfig {
}