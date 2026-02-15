package com.ecanopy.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "razorpay")
public class RazorpayProperties {
    private Key key = new Key();
    private String currency;
    private Company company = new Company();
    
    @Data
    public static class Key {
        private String id;
        private String secret;
    }
    
    @Data
    public static class Company {
        private String name;
    }
}