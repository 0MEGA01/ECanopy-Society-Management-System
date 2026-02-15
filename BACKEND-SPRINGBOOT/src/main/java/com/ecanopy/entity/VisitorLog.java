package com.ecanopy.entity;

import com.ecanopy.entity.enums.ApprovalStatus;
import com.ecanopy.entity.enums.VisitorCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "visitor_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private VisitorCategory category = VisitorCategory.GUEST;

    @Column(length = 200)
    private String purpose;

    @Column(length = 20)
    private String vehicleNumber;

    @Column(nullable = false)
    private LocalDateTime inTime;

    private LocalDateTime outTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ApprovalStatus status = ApprovalStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visitor_id", nullable = false)
    private Visitor visitor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flat_id", nullable = false)
    private Flat flat;

    // Gate and Guard tracking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checked_in_by_user_id")
    private User checkedInBy; // Security guard who checked in

    @Column(length = 50)
    private String gateEntry; // "Main Gate", "Side Gate", etc.

    // Expected checkout time for overstay tracking
    private LocalDateTime expectedOutTime;

    @OneToMany(mappedBy = "visitorLog", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<VisitorApproval> visitorApprovals = new HashSet<>();
}
