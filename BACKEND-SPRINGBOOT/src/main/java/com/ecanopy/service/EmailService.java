package com.ecanopy.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendVisitorAlert(String toEmail, String residentName, String visitorName, String purpose) {
        log.info("Sending visitor alert email to: {}", toEmail);
        log.debug("Visitor: {}, Purpose: {}, Resident: {}", visitorName, purpose, residentName);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("🔔 ECanopy: Visitor Arrival Alert - " + visitorName);

            String htmlContent = String.format(
                    "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                            "<div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>"
                            +
                            "<h2 style='color: #4f46e5;'>Hello %s,</h2>" +
                            "<p>This is an automated alert from <strong>ECanopy Security</strong>.</p>" +
                            "<div style='background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;'>" +
                            "<p style='margin: 5px 0;'><strong>Visitor:</strong> %s</p>" +
                            "<p style='margin: 5px 0;'><strong>Purpose:</strong> %s</p>" +
                            "<p style='margin: 5px 0;'><strong>Location:</strong> Society Main Gate</p>" +
                            "</div>" +
                            "<p>If you were not expecting this visitor, please contact the security gate immediately.</p>"
                            +
                            "<hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>" +
                            "<p style='font-size: 12px; color: #999;'>Sent with ❤️ from ECanopy Society Management System.</p>"
                            +
                            "</div></body></html>",
                    residentName, visitorName, purpose);

            helper.setText(htmlContent, true);

            log.debug("Sending visitor alert email via JavaMailSender");
            mailSender.send(message);
            log.info("Visitor alert email sent successfully to: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send visitor alert email to {}: {}", toEmail, e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error in email service for {}: {}", toEmail, e.getMessage());
        }
    }

    @Async
    public void sendJoinRequestStatusEmail(String toEmail, String residentName, String status, String societyName, String flatNumber) {
        log.info("Sending join request status email to: {} with status: {}", toEmail, status);
        log.debug("Society: {}, Flat: {}", societyName, flatNumber);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            
            String subject = status.equalsIgnoreCase("APPROVED") 
                ? "✅ Welcome to " + societyName + " - Application Approved!"
                : "❌ Application Update - " + societyName;
            helper.setSubject("ECanopy: " + subject);

            String statusColor = status.equalsIgnoreCase("APPROVED") ? "#10b981" : "#ef4444";
            String statusIcon = status.equalsIgnoreCase("APPROVED") ? "✅" : "❌";

            String htmlContent = String.format(
                "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                "<div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>" +
                "<h2 style='color: #4f46e5;'>Hello %s,</h2>" +
                "<p>Your residency application for <strong>%s</strong> has been reviewed.</p>" +
                "<div style='background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid %s;'>" +
                "<p style='margin: 5px 0;'><strong>Status:</strong> <span style='color: %s; font-weight: bold;'>%s %s</span></p>" +
                "<p style='margin: 5px 0;'><strong>Society:</strong> %s</p>" +
                "<p style='margin: 5px 0;'><strong>Flat:</strong> %s</p>" +
                "</div>" +
                "<p>%s</p>" +
                "<hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>" +
                "<p style='font-size: 12px; color: #999;'>Sent with ❤️ from ECanopy Society Management System.</p>" +
                "</div></body></html>",
                residentName, societyName, statusColor, statusColor, statusIcon, status, societyName, flatNumber,
                status.equalsIgnoreCase("APPROVED") 
                    ? "Welcome to the community! You can now access all society features including amenity bookings, maintenance bills, and community notices."
                    : "If you have any questions about this decision, please contact the society office for more information."
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Join request status email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send join request status email to {}: {}", toEmail, e.getMessage());
        }
    }

    @Async
    public void sendBookingStatusEmail(String toEmail, String residentName, String amenityName, String status,
            String date, String time) {
        log.info("Sending booking status email to: {} for amenity: {}", toEmail, amenityName);
        log.debug("Booking status: {}, Date: {}, Time: {}", status, date, time);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            String subject = status.equalsIgnoreCase("APPROVED") ? "✅ Booking Confirmed: " + amenityName
                    : "❌ Booking Update: " + amenityName;
            helper.setSubject("ECanopy: " + subject);

            String statusColor = status.equalsIgnoreCase("APPROVED") ? "#10b981" : "#ef4444";

            String htmlContent = String.format(
                    "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                            "<div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>"
                            +
                            "<h2 style='color: #4f46e5;'>Hello %s,</h2>" +
                            "<p>Your booking request for <strong>%s</strong> has been updated.</p>" +
                            "<div style='background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid %s;'>"
                            +
                            "<p style='margin: 5px 0;'><strong>Status:</strong> <span style='color: %s; font-weight: bold;'>%s</span></p>"
                            +
                            "<p style='margin: 5px 0;'><strong>Date:</strong> %s</p>" +
                            "<p style='margin: 5px 0;'><strong>Time:</strong> %s</p>" +
                            "</div>" +
                            "<p>%s</p>" +
                            "<hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>" +
                            "<p style='font-size: 12px; color: #999;'>Sent with ❤️ from ECanopy Society Management System.</p>"
                            +
                            "</div></body></html>",
                    residentName, amenityName, statusColor, statusColor, status, date, time,
                    status.equalsIgnoreCase("APPROVED")
                            ? "Please ensure you follow the amenity rules during your visit."
                            : "If you have any questions, please contact the society office.");

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Booking status email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send booking status email to {}: {}", toEmail, e.getMessage());
        }
    }
}
