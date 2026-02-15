package com.ecanopy.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadProperties {
    private String basePath;
    private long maxFileSize;
    private String allowedExtensions;
    private Directories directories = new Directories();
    
    @Data
    public static class Directories {
        private String visitors;
        private String items;
        private String complaints;
        private String notices;
    }
}