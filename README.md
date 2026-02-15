# 🏢 E-Canopy — Society Management System (Spring Boot + React)

A full-stack **Society Management System** built with **Spring Boot + React** featuring  
**Role-Based Access Control (RBAC)**, **Amenity Booking Workflow**, **Visitor Management**,  
**Complaints Helpdesk**, **Maintenance Billing + Razorpay Payments**, and **Email Notifications**.

---

## ⭐ Project Preview (Screenshots)

### 🌐 Landing Page
> Clean landing page for initial navigation.

![](Documents/screenshots/05-Landing-Page/Landing-Page.png)

---

### 🔐 Super Admin Panel
> Super Admin can manage societies, create secretaries, and control system-level configuration.

| Login | Dashboard |
|------|-----------|
| ![](docs/screenshots/01-super-admin/Super-Admin-Login.png) | ![](docs/screenshots/01-super-admin/Super-Admin-Dashboard.png) |

| Create Secretary | Create Societies |
|------|-----------|
| ![](docs/screenshots/01-super-admin/Super-Admin-Create-Secretary.png) | ![](docs/screenshots/01-super-admin/Super-Admin-Create-Societies.png) |

| Manage Existing Societies | Manage Societies |
|------|-----------|
| ![](docs/screenshots/01-super-admin/Super-Admin-Manage-Existing-Societies.png) | ![](docs/screenshots/01-super-admin/Super-Admin-Manage-Societies.png) |

---

### 🏢 Secretary Panel
> Secretary manages amenities, residents, complaints, notices, and society-level operations.

| Login | Dashboard |
|------|-----------|
| ![](docs/screenshots/02-secretary/Secretary-Login.png) | ![](docs/screenshots/02-secretary/Secretary-Dashboard.png) |

| Manage Users | Manage Amenities |
|------|-----------|
| ![](docs/screenshots/02-secretary/Secretary-Manage-Users.png) | ![](docs/screenshots/02-secretary/Secretary-Manage-Amenities.png) |

| Add Amenities | Amenities Approval |
|------|-----------|
| ![](docs/screenshots/02-secretary/Secretary-Add-Amenities.png) | ![](docs/screenshots/02-secretary/Secretary-Amenities-Approval.png) |

| Maintenance Billing | Society Grievance |
|------|-----------|
| ![](docs/screenshots/02-secretary/Secretary-Maintainence-Billing.png) | ![](docs/screenshots/02-secretary/Secretary-Society-Grievance-Page.png) |

| Resident Onboarding | Security Onboarding |
|------|-----------|
| ![](docs/screenshots/02-secretary/Secretary-Resident-Onboard-Approval.png) | ![](docs/screenshots/02-secretary/Secretary-Security-Onboarding.png) |

---

### 🧑‍💼 Resident Panel
> Residents can book amenities, raise complaints, pay maintenance, and use marketplace features.

| Login | Dashboard |
|------|-----------|
| ![](docs/screenshots/03-resident/Resident-Login.png) | ![](docs/screenshots/03-resident/Resident-Dashboard.png) |

| Amenities | Booking Page |
|------|-----------|
| ![](docs/screenshots/03-resident/Resident-Amenities.png) | ![](docs/screenshots/03-resident/Resident-Amenities-Booking-Page.png) |

| Booked / Pending | Maintenance Billing |
|------|-----------|
| ![](docs/screenshots/03-resident/Resident-Amenities-Booked-Pending.png) | ![](docs/screenshots/03-resident/Resident-Maintainence-Billing.png) |

| Complaint Logger | Complaint Page |
|------|-----------|
| ![](docs/screenshots/03-resident/Resident-Complaint-Logger.png) | ![](docs/screenshots/03-resident/Resident-Complaint.png) |

| Marketplace | Email Confirmation |
|------|-----------|
| ![](docs/screenshots/03-resident/Resident-Marketplace-Product-Listing.png) | ![](docs/screenshots/03-resident/Resident-Email-Confirmation.png) |

---

### 📄 API Docs (Swagger)
> Full REST API documented with Swagger UI.

![](docs/screenshots/04-api-docs/swagger.png)

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
- Forms + modals + workflow pages

---

## 🏗️ Architecture

This project follows a clean **Layered Architecture**:

Controller Layer (REST API)
↓
Service Layer (Business Logic)
↓
Repository Layer (JPA + Queries)
↓
Database Layer (MySQL)

---

## 🔐 Role-Based Access Control (RBAC)

| Role | Responsibilities |
|------|------------------|
| **SUPER_ADMIN** | Full system access, society onboarding |
| **ADMIN** | Manage buildings, flats, residents |
| **RWA_SECRETARY** | Approve amenities, handle complaints, manage notices |
| **SECURITY_GUARD** | Visitor logs and approvals workflow |
| **RESIDENT** | Book amenities, raise complaints, pay bills |

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

## 📸 Screenshots (Role-Based Panels)

> ⚠️ **Important:** Before uploading screenshots to GitHub, replace real emails with dummy emails.

---

### 🛡️ Super Admin Panel

![Super Admin Dashboard](docs/screenshots/01-super-admin/01-dashboard.png)

![Society Management](docs/screenshots/01-super-admin/02-society-management.png)

---

### 🧑‍💼 Secretary Panel

![Secretary Dashboard](docs/screenshots/02-secretary/01-dashboard.png)

![Requests & Approvals](docs/screenshots/02-secretary/02-requests-approvals.png)

---

### 🧑 Resident Panel

![Resident Dashboard](docs/screenshots/03-resident/01-dashboard.png)

![Amenity Booking](docs/screenshots/03-resident/02-amenity-booking.png)

![Maintenance Bills](docs/screenshots/03-resident/03-maintenance-bills.png)

---

### 📑 Swagger API Docs

![Swagger Overview](docs/screenshots/04-api-docs/01-swagger-overview.png)

<details>
  <summary>📌 View more screenshots</summary>

  #### Swagger Schemas / Models
  ![](docs/screenshots/04-api-docs/02-swagger-schemas.png)

  #### Resident - Complaints
  ![](docs/screenshots/03-resident/04-complaints.png)

  #### Resident - Notices
  ![](docs/screenshots/03-resident/05-notices.png)

  #### Resident - Marketplace
  ![](docs/screenshots/03-resident/06-marketplace.png)

  #### Resident - Visitor Logs
  ![](docs/screenshots/03-resident/07-visitors.png)

</details>

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
3️⃣ Configure Environment Variables
# Database
DB_PASSWORD=your_mysql_password

# JWT
JWT_SECRET=your_jwt_secret_key

# Gmail SMTP
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret_key
4️⃣ Run Backend
mvn clean install
mvn spring-boot:run
⚙️ Setup Instructions (Frontend)
cd frontend
npm install
npm run dev
npm run dev

----
