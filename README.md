# 🏢 E-Canopy — Society Management System (Spring Boot + React)

A full-stack **Society Management System** built with **Spring Boot + React** featuring **Role-Based Access Control (RBAC)**, **Amenity Booking Workflow**, **Visitor Management**, **Complaints Helpdesk**, **Maintenance Billing + Razorpay Payments**, and **Email Notifications**.

---

## ⭐ Project Preview (Screenshots)

### 🌐 Landing Page
> Clean landing page for initial navigation.

![](Documents/screenshots/05-Landing-Page/Landing-Page.png)

---

### 🔐 Super Admin Panel
> Super Admin can manage societies, create secretaries, and control system-level configuration.

| Login | Dashboard |
|-----------|-----------|
| ![](Documents/screenshots/01-super-admin/Super-Admin-Login.png) | ![](Documents/screenshots/01-super-admin/Super-Admin-Dashboard.png) |

| Create Secretary | Create Societies |
|-----------|-----------|
| ![](Documents/screenshots/01-super-admin/Super-Admin-Create-Secretary.png) | ![](Documents/screenshots/01-super-admin/Super-Admin-Create-Societies.png) |

| Manage Existing Societies | Manage Societies |
|-----------|-----------|
| ![](Documents/screenshots/01-super-admin/Super-Admin-Manage-Existing-Societies.png) | ![](Documents/screenshots/01-super-admin/Super-Admin-Manage-Societies.png) |

---

### 🏢 Secretary Panel
> Secretary manages amenities, residents, complaints, notices, and society-level operations.

| Login | Dashboard |
|-----------|-----------|
| ![](Documents/screenshots/02-secretary/Secretary-Login.png) | ![](Documents/screenshots/02-secretary/Secretary-Dashboard.png) |

| Manage Users | Manage Amenities |
|-----------|-----------|
| ![](Documents/screenshots/02-secretary/Secretary-Manage-Users.png) | ![](Documents/screenshots/02-secretary/Secretary-Manage-Amenities.png) |

| Add Amenities | Amenities Approval |
|-----------|-----------|
| ![](Documents/screenshots/02-secretary/Secretary-Add-Amenities.png) | ![](Documents/screenshots/02-secretary/Secretary-Amenities-Approval.png) |

| Maintenance Billing | Society Grievance |
|-----------|-----------|
| ![](Documents/screenshots/02-secretary/Secretary-Maintainence-Billing.png) | ![](Documents/screenshots/02-secretary/Secretary-Society-Grievance-Page.png) |

| Resident Onboarding | Security Onboarding |
|------|-----------|
| ![](Documents/screenshots/02-secretary/Secretary-Resident-Onboard-Approval.png) | ![](Documents/screenshots/02-secretary/Secretary-Security-Onboarding.png) |

---

### 🧑‍💼 Resident Panel
> Residents can book amenities, raise complaints, pay maintenance, and use marketplace features.

| Login | Dashboard |
|-----------|-----------|
| ![](Documents/screenshots/03-resident/Resident-Login.png) | ![](Documents/screenshots/03-resident/Resident-Dashboard.png) |

| Amenities | Booking Page |
|-----------|-----------|
| ![](Documents/screenshots/03-resident/Resident-Amenities.png) | ![](Documents/screenshots/03-resident/Resident-Amenities-Booking-Page-2.png) |

| Booked / Pending | Maintenance Billing |
|------|-----------|
| ![](Documents/screenshots/03-resident/Resident-Amenities-Booked-Pending-Approval-Page.png) | ![](Documents/screenshots/03-resident/Resident-Maintainence-Billing.png) |

| Complaint Logger | Complaint Page |
|------|-----------|
| ![](Documents/screenshots/03-resident/Resident-Complaint-Logger.png) | ![](Documents/screenshots/03-resident/Resident-Complaint.png) |

| Marketplace | Email Confirmation |
|------|-----------|
| ![](Documents/screenshots/03-resident/Resident-Marketplace-Product-Listing.png) | ![](Documents/screenshots/03-resident/Resident-Email-Confirmation-Amenities-Booking-Approval.png) |

---

### 📄 API Docs (Swagger)
> Full REST API documented with Swagger UI.

|  |  |
|---|---|
| ![](Documents/screenshots/04-api-docs/Swagger-Doc-1.png) | ![](Documents/screenshots/04-api-docs/Swagger-Doc-2.png) |
| ![](Documents/screenshots/04-api-docs/Swagger-Doc-3.png) | ![](Documents/screenshots/04-api-docs/Swagger-Doc-4.png) |
| ![](Documents/screenshots/04-api-docs/Swagger-Doc-5.png) | ![](Documents/screenshots/04-api-docs/Swagger-Doc-6.png) |
| ![](Documents/screenshots/04-api-docs/Swagger-Doc-7.png) | ![](Documents/screenshots/04-api-docs/Swagger-Doc-8.png) |
| ![](Documents/screenshots/04-api-docs/Swagger-Doc-9.png) | ![](Documents/screenshots/04-api-docs/Swagger-Doc-10.png) |

---

## 🚀 Key Highlights

✅ **Role-Based Panels (RBAC)**
- 🛡️ Super Admin Panel
- 🧑‍💼 Secretary / RWA Panel
- 🧑 Resident Panel
- 🛡️ Security Guard Panel (Visitor Flow)

✅ **JWT Authentication + Spring Security**  
✅ **Swagger OpenAPI Documentation**  
✅ **Amenity Booking Approval Workflow**  
✅ **Razorpay Payment Gateway Integration**  
✅ **Gmail SMTP Email Notifications**  
✅ **MySQL + JPA (21 Entities, 12 Enums)**  
✅ **Complaint Ticketing + Attachments + Comments**

---

## 🧑‍💻 Tech Stack

### Backend
- **Java 17 (LTS)**
- **Spring Boot 3.2.2**
- **Spring Security 6.2.1**
- **JWT (jjwt 0.12.3)**
- **Spring Data JPA / Hibernate**
- **MySQL 8.0+**
- **SpringDoc OpenAPI (Swagger)**
- **Spring Mail (Gmail SMTP)**
- **Razorpay Java SDK**
- **Lombok**

### Frontend
- **React**
- Role-based UI dashboards
- Forms + models + workflow pages

---

## 🏗️ Architecture

This project follows a clean **Layered Architecture**:

Controller Layer (REST API) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ <br>
DTO Layer (Request/Response Mapping) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ <br>
Service Layer (Business Logic) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ <br>
Repository Layer (JPA + Queries) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ <br>
Database Layer (MySQL)

---

## 🔐 Role-Based Access Control (RBAC)

| Role | Responsibilities |
|------|------------------|
| **SUPER_ADMIN** | Full system access, Society Onboarding, Manage buildings, Flats |
| **RWA_SECRETARY** | Manage Residents Onboarding, Approve and Manage amenities, Handle complaints, Manage Notices |
| **SECURITY_GUARD** | Visitor logs and Approvals workflow |
| **RESIDENT** | Book amenities, Raise Complaints, Pay Bills, Buy and Sell Marketplace |

---

## 📦 Modules Implemented

### 🏢 Society & Resident Management
- Create societies
- Add buildings, flats
- Resident onboarding workflow (join requests)

### 🏊 Amenities Booking (Approval Workflow)
- Resident books amenity
- Secretary approves/rejects
- Resident receives email notification
- Overlap detection to prevent double booking

### 👥 Visitor Management
- Guard logs visitor
- Resident approval workflow
- Visitor check-in / check-out

### 🎫 Complaints & Helpdesk
- Raise complaint
- Chat/comments on complaint → `PENDING`
- Attachments upload → `PENDING`
- Status updates

### 💰 Maintenance Billing + Razorpay Payments
- Bill generation
- Online payment integration → `PENDING`
- Payment verification → `PENDING`

### 📢 Notice Board
- Society announcements
- Categorized notices → `PENDING`

### 🛒 Marketplace
- Resident buy/sell listing feature → `PENDING`

---

## 📑 Swagger API Documentation

Once backend is running, Swagger is available at:

http://localhost:8080/swagger-ui.html

---

## ⚙️ Setup Instructions (Backend)

### ✅ Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

---

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd ecanopy
```

### 2️⃣ Create MySQL Database
```
CREATE DATABASE ecanopy_master_db;
```

### 3️⃣ Configure Environment Variables
### Database
```
DB_PASSWORD=your_mysql_password
```
### JWT
```
JWT_SECRET=your_jwt_secret_key
```
### Gmail SMTP
```
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

### Razorpay
```
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret_key
```

### 4️⃣ Run Backend
```
mvn clean install
mvn spring-boot:run
```

### ⚙️ Setup Instructions (Frontend)
```
cd frontend
npm install
npm run dev
npm run dev
```
----
