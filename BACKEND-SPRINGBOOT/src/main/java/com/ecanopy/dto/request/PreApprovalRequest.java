package com.ecanopy.dto.request;

import com.ecanopy.entity.enums.VisitorCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PreApprovalRequest {
    @NotBlank(message = "Visitor name is required")
    private String visitorName;

    @NotBlank(message = "Visitor phone is required")
    private String visitorPhone;

    @NotNull(message = "Category is required")
    private VisitorCategory category;

    private LocalDateTime validFrom;
    private LocalDateTime validUntil;

    @NotNull(message = "Resident ID is required")
    private Long residentId;

    @NotNull(message = "Flat ID is required")
    private Long flatId;
}
