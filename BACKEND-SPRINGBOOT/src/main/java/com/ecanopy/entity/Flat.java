package com.ecanopy.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * Flat Entity
 * Represents individual residential units
 */
@Entity
@Table(name = "flats", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "building_id", "flat_number" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flatId;

    @NotBlank(message = "Flat number is required")
    @Column(nullable = false, length = 20)
    private String flatNumber;

    @Min(value = 0, message = "Floor must be non-negative")
    @Column(nullable = false)
    private Integer floor;

    @Column(precision = 8, scale = 2)
    private BigDecimal area;

    @Min(value = 0, message = "Bedrooms must be non-negative")
    private Integer bedrooms;

    @Min(value = 1, message = "Max resident must be at least 1")
    @Column(nullable = false)
    @Builder.Default
    private Integer maxResident = 4;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isOccupied = false;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Resident> residents = new HashSet<>();

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<MaintenanceBill> maintenanceBills = new HashSet<>();

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<VisitorLog> visitorLogs = new HashSet<>();

    @ManyToMany(mappedBy = "flats")
    @Builder.Default
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Set<DomesticHelp> domesticHelps = new HashSet<>();
}
