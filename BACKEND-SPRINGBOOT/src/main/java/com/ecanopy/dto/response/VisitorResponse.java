package com.ecanopy.dto.response;

import com.ecanopy.entity.enums.VisitorCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VisitorResponse {
    private Long visitorId;
    private Long logId;
    private String name;
    private String phone;
    private VisitorCategory category;
    private String purpose;
    private String imageUrl;
    private String vehicleNumber;
    private LocalDateTime inTime;
    private LocalDateTime outTime;
    private LocalDateTime expectedOutTime;
    private Long flatId;
    private String flatNumber;
    private String gateEntry;
    private String checkedInBy;
    private String status;
}
