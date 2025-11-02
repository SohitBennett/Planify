# Planify - Advanced Calendar Management System

A comprehensive full-stack calendar application that replicates Google Calendar's functionality with enhanced features including task management, automated email reminders, and intelligent holiday integration. Built with modern web technologies to provide a seamless event scheduling and productivity tracking experience.

 **Live Link of the project:** [https://planify-sigma-azure.vercel.app](https://planify-sigma-azure.vercel.app) 



![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.18-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Business Logic](#business-logic)
- [Email Reminder System](#email-reminder-system)


## Overview

Planify is designed to address the challenges of modern time management and productivity tracking. The system provides a comprehensive calendar solution that goes beyond basic event scheduling to include task management, automated reminders, and intelligent holiday integration.

### Problem Statement
- Fragmented productivity tools requiring multiple applications
- Manual reminder management prone to missed deadlines
- Lack of visual clarity in event and task organization
- Inconsistent dark mode support across calendar applications
- Limited customization options for personal workflow preferences

### Solution
A unified calendar platform that combines event scheduling, task management, automated email reminders, and intelligent holiday integration with full dark mode support and extensive customization options.

**Light Mode with Month View and Event Creation Dialog box. -** 
<img width="2879" height="1470" alt="image" src="https://github.com/user-attachments/assets/398d8195-5576-4cd8-a558-51e5850a95bd" />

**Dark Mode with Day View. -**
<img width="2879" height="1466" alt="image" src="https://github.com/user-attachments/assets/88a4d5c0-e799-4cb3-ae18-3caf7eccb23f" />


## Key Features

### Core Calendar Functionality
- **Multi-View Calendar System**: Day, Week, Month, and Year views with seamless navigation
- **Event Management**: Full CRUD operations with color coding, locations, and descriptions
- **Task Management**: Dedicated task system with priority levels and completion tracking
- **All-Day Events**: Support for full-day events with special visual indicators


### Advanced Features
- **Automated Email Reminders**: Configurable email notifications (5 min to 1 day before events)
- **Indian Holiday Integration**: National and religious holidays for 2024-2026 with toggle visibility
- **Real-time Search**: Instant event and task search across all calendar data
- **Dark/Light Mode**: Complete theme support with system preference detection
- **Responsive Sidebar**: Collapsible navigation with mini calendar and quick actions
- **Year View**: Annual overview with event indicators for long-term planning

### User Experience
- **Intuitive Interface**: Google Calendar-inspired design with modern aesthetics
- **Smart Validation**: Real-time input validation with user-friendly error messages
- **Progress Indicators**: Visual feedback for loading states and operations
- **Keyboard Navigation**: Accessible interface with keyboard shortcut support
- **Responsive Design**: Mobile-optimized layouts for all screen sizes

### Security & Data Management
- **JWT Authentication**: Secure token-based user authentication
- **Password Hashing**: BCrypt encryption for secure password storage
- **Data Validation**: Multi-layer validation (frontend and backend)
- **Protected Routes**: Middleware-based route protection
- **Error Handling**: Comprehensive error management with graceful fallbacks

## System Architecture

### Technology Stack

**Frontend**
- Next.js 16.0.1 with App Router architecture
- React 18.2.0 with functional components and hooks
- TypeScript 5.0 for type safety
- Tailwind CSS 3.4.0 for responsive styling
- shadcn/ui component library for consistent UI
- Context API and custom hooks for state management
- date-fns 2.30.0 for date manipulation

**Backend**
- Node.js 18.18.1 runtime environment
- Express.js 4.18.2 web application framework
- RESTful API design with proper HTTP methods
- Middleware for authentication and error handling
- JWT for secure authentication

**Database & ODM**
- MongoDB 6.0+ NoSQL database
- Mongoose ODM 8.0.0 for schema validation
- Database indexing for query optimization
- Aggregation pipelines for complex queries

**Additional Services**
- Nodemailer for email delivery
- node-cron for scheduled task execution


### System Flow
```
Client (Next.js/React) → API Layer (Express) → Business Logic (Services) → Database (MongoDB)
        ↑                      ↑                        ↑                         ↑
   UI Components          Controllers              Services                 Mongoose Models
   State Management      Route Handlers         Business Rules            Data Validation
```

## Database Design

### Entity Relationship Model
```
Users (1:N) ← Events
Users (1:N) ← Tasks
```

### Key Collections

**Users**
- Authentication credentials with hashed passwords
- Profile information (name, email, avatar)
- Created and updated timestamps

**Events**
- Event details (title, description, location)
- Temporal data (start, end, allDay flag)
- Visual customization (color coding)
- Reminder configurations with multiple options
- Recurring event support (daily, weekly, monthly, yearly)
- User relationship via foreign key

**Tasks**
- Task information (title, description)
- Due date tracking
- Completion status and timestamp
- Priority levels (low, medium, high)
- User relationship via foreign key

**Holidays (Static)**
- Date and name of holiday
- Type classification (national, religious)
- Year-based organization

### Database Constraints
- Unique email constraint on users
- User reference validation on events and tasks
- Required fields enforcement
- Enum validation for specific fields (priority, frequency)
- Index optimization on frequently queried fields

## Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.0+ (local or Atlas)
- Git version control
- Gmail account (for email reminders)

### Setup Process

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/planify.git
cd planify
```

#### 2. Backend Configuration
```bash
cd backend
npm install
```

#### 3. Environment Variables
Create `.env` file in backend directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/planify
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/planify

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_char_app_password
FRONTEND_URL=http://localhost:3000
```

#### 4. Frontend Configuration
```bash
cd ../frontend
npm install
```

Create `.env.local` file in frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 5. Database Setup
```bash
# Start MongoDB (if local)
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows (as Administrator)
net start MongoDB
```

#### 6. Gmail App Password Setup
1. Visit: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification if not enabled
3. Create app password named "Planify Calendar"
4. Copy 16-character password to `EMAIL_PASS` in backend `.env`

#### 7. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 8. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Usage

### For End Users

#### Getting Started
1. **Register Account**: Create account with name, email, and password (minimum 6 characters)
2. **Login**: Access your personal calendar with secure authentication
3. **Dashboard**: View calendar in preferred view (Day/Week/Month/Year)

#### Event Management
1. **Create Event**:
   - Click "Create" button or click any date/time slot
   - Fill in event details (title, time, location, description)
   - Choose event color for visual organization
   - Set email reminder preference
   - Submit to save

2. **Edit Event**:
   - Click on any existing event
   - Modify details as needed
   - Update to save changes

3. **Delete Event**:
   - Click on event to open details
   - Click "Delete" button
   - Confirm deletion


#### Calendar Navigation
- **View Switching**: Use view dropdown to switch between Day/Week/Month/Year
- **Date Navigation**: Use arrow buttons to move forward/backward
- **Today Button**: Jump to current date instantly
- **Mini Calendar**: Use sidebar mini calendar for quick date navigation
- **Search**: Click search icon to find events by title, location, or description

#### Customization
1. **Theme Selection**:
   - Click Settings icon
   - Choose Light, Dark, or System theme
   - Theme preference saved automatically

2. **Week Start Day**:
   - Access Settings
   - Select Sunday or Monday as week start
   - Preference applied immediately

3. **Holiday Visibility**:
   - Toggle holidays in sidebar (My Calendars section)
   - Or toggle in Settings menu

#### Email Reminders
- Reminders are sent automatically at configured time before event
- Check email inbox for professionally formatted reminder emails
- Emails include event details and "View in Calendar" button

### System Workflow
1. User registers and creates account (JWT token issued)
2. User logs in and accesses personalized calendar
3. Events and tasks are created with desired parameters
4. Cron job runs every 5 minutes checking for upcoming events
5. Email reminders sent automatically at configured intervals
6. Users can toggle between views, search, and customize experience
7. All data persists securely in MongoDB with user association

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 201 Created
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Event Endpoints

#### Get All Events
```http
GET /api/events?start=2025-01-01&end=2025-01-31
Authorization: Bearer {jwt_token}

Response: 200 OK
[
  {
    "_id": "event_id",
    "title": "Team Meeting",
    "start": "2025-01-15T10:00:00Z",
    "end": "2025-01-15T11:00:00Z",
    "allDay": false,
    "color": "#3b82f6",
    "location": "Conference Room A",
    "description": "Quarterly planning meeting",
    "reminders": [
      { "minutes": 15, "method": "email" }
    ]
  }
]
```

#### Create Event
```http
POST /api/events
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "title": "Team Meeting",
  "start": "2025-01-15T10:00:00Z",
  "end": "2025-01-15T11:00:00Z",
  "allDay": false,
  "color": "#3b82f6",
  "location": "Conference Room A",
  "description": "Quarterly planning meeting",
  "reminders": [
    { "minutes": 15, "method": "email" }
  ]
}

Response: 201 Created
```

#### Update Event
```http
PUT /api/events/:id
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "title": "Updated Team Meeting",
  "start": "2025-01-15T14:00:00Z"
}

Response: 200 OK
```

#### Delete Event
```http
DELETE /api/events/:id
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "message": "Event removed",
  "id": "event_id"
}
```



### Health Check
```http
GET /api/health

```

## Project Structure

```
Planify/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # MongoDB connection configuration
│   │   ├── controllers/
│   │   │   ├── authController.js        # Authentication logic
│   │   │   ├── eventController.js       # Event CRUD operations
│   │   │   ├── taskController.js        # Task management
│   │   │   └── holidayController.js     # Holiday data retrieval
│   │   ├── middleware/
│   │   │   ├── auth.js                  # JWT authentication middleware
│   │   │   └── errorHandler.js          # Global error handling
│   │   ├── models/
│   │   │   ├── User.js                  # User schema and methods
│   │   │   ├── Event.js                 # Event schema with validation
│   │   │   └── Task.js                  # Task schema with completion tracking
│   │   ├── routes/
│   │   │   ├── auth.js                  # Authentication routes
│   │   │   ├── events.js                # Event API routes
│   │   │   ├── tasks.js                 # Task API routes
│   │   │   └── holidays.js              # Holiday API routes
│   │   ├── services/
│   │   │   ├── emailService.js          # Email sending functionality
│   │   │   └── reminderService.js       # Cron-based reminder checking
│   │   ├── test/
│   │   │   └── testEmail.js             # Email configuration testing
│   │   └── server.js                    # Application entry point
│   ├── .env                             # Environment variables
│   ├── package.json                     # Backend dependencies
│   └── .gitignore                       # Git ignore rules
│
└── frontend/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx             # Login page component
    │   │   └── register/
    │   │       └── page.tsx             # Registration page component
    │   ├── (dashboard)/
    │   │   └── calendar/
    │   │       └── page.tsx             # Main calendar application
    │   ├── layout.tsx                   # Root layout with theme provider
    │   ├── page.tsx                     # Landing/redirect page
    │   └── globals.css                  # Global styles and Tailwind
    ├── components/
    │   ├── ui/                          # shadcn/ui components
    │   │   ├── button.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── select.tsx
    │   │   ├── calendar.tsx
    │   │   ├── checkbox.tsx
    │   │   └── ...
    │   ├── calendar/
    │   │   ├── CalendarHeader.tsx       # Navigation and view controls
    │   │   ├── Sidebar.tsx              # Navigation sidebar with mini calendar
    │   │   ├── MonthView.tsx            # Month grid view component
    │   │   ├── WeekView.tsx             # Week timeline view component
    │   │   ├── DayView.tsx              # Day detailed view component
    │   │   ├── YearView.tsx             # Year overview component
    │   │   ├── EventModal.tsx           # Event creation/editing dialog
    │   │   ├── TaskModal.tsx            # Task management dialog
    │   │   └── SearchDialog.tsx         # Event search interface
    │   ├── ThemeProvider.tsx            # Theme context provider
    │   └── SettingsDialog.tsx           # Application settings modal
    ├── lib/
    │   ├── api.ts                       # Axios API client configuration
    │   └── utils.ts                     # Utility functions (cn, etc.)
    ├── types/
    │   └── index.ts                     # TypeScript type definitions
    ├── .env.local                       # Frontend environment variables
    ├── next.config.js                   # Next.js configuration
    ├── tailwind.config.ts               # Tailwind CSS configuration
    ├── tsconfig.json                    # TypeScript configuration
    ├── package.json                     # Frontend dependencies
    └── .gitignore                       # Git ignore rules
```

## Business Logic

### Event Management Rules
- Events must have title, start time, and end time
- End time must be after start time (validation on both frontend and backend)
- All-day events span from 00:00:00 to 23:59:59 of selected date
- Events can span multiple days with proper visual representation
- Color coding limited to predefined palette for consistency
- Maximum 5MB description field to prevent database bloat

### Reminder System Rules
- Reminders checked every 5 minutes via cron job
- Events starting within next 60 minutes are candidates
- Reminder sent when current time matches configured interval
- Duplicate prevention: Same reminder won't be sent twice
- Reminders cleaned up 1 hour after event start
- Available intervals: 0, 5, 15, 30, 60, 120, 1440 minutes

### Holiday Integration Rules
- Static data for years 2024-2026 (no API rate limits)
- National holidays (Republic Day, Independence Day, Gandhi Jayanti)
- Major religious festivals (Diwali, Holi, Eid, Christmas, etc.)
- User-toggleable visibility (default: shown)
- Holidays don't interfere with user events

### Authentication Rules
- Password minimum 6 characters (BCrypt hashing)
- JWT token expires after 30 days
- Email must be unique across system
- Token required for all protected routes
- Invalid token redirects to login

### Data Integrity Rules
- User deletion cascades to all events and tasks
- Event updates preserve user ownership
- Task updates preserve user ownership
- Validation at multiple layers (frontend, API, database)
- All dates stored in UTC, converted for display

### Search Functionality Rules
- Case-insensitive search across title, description, location
- Results sorted by event start date (ascending)
- Search scope limited to authenticated user's data
- Real-time filtering with debounce (reduces API calls)

## Email Reminder System

### Architecture
```
Cron Scheduler (Every 5 min)
    ↓
Reminder Service
    ↓
Check Upcoming Events (next 60 min)
    ↓
Filter Events with Reminders
    ↓
Match Reminder Timing
    ↓
Email Service
    ↓
Send HTML Email via Gmail SMTP
    ↓
User Receives Reminder
```

### Email Template Features
- Professional gradient header with calendar icon
- Event title prominently displayed
- Formatted date and time (locale-aware)
- Color-coded event indicator
- Location and description (if provided)
- "View in Calendar" call-to-action button
- Mobile-responsive HTML design
- Fallback text for email clients without HTML support

### Configuration Options
- SMTP host and port (default: Gmail)
- Sender email address
- App-specific password for security
- Frontend URL for deep linking
- Email retry logic (future enhancement)

### Gmail App Password Setup
1. Enable 2-Step Verification on Google Account
2. Navigate to App Passwords settings
3. Create password for "Mail" application
4. Use 16-character password in EMAIL_PASS environment variable

## Development Features

### Development Tools
- Hot reload for both frontend and backend
- TypeScript type checking with strict mode
- ESLint for code quality enforcement
- Prettier for consistent code formatting
- Git hooks for pre-commit validation

### Testing Capabilities
- Email service testing script
- API endpoint testing with sample data
- Component testing setup (Jest + React Testing Library)
- E2E testing preparation (Playwright/Cypress)

### Debugging Features
- Comprehensive console logging in development mode
- Error stack traces with source mapping
- Network request logging via Axios interceptors
- MongoDB query logging in development

### Database Utilities
- MongoDB Compass for visual database inspection
- Mongoose debug mode for query analysis
- Database seeding scripts (future enhancement)
- Migration system for schema updates

### Performance Optimization
- Component memoization with React.memo
- useMemo and useCallback for expensive computations
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- Database indexing on frequently queried fields

### Error Handling
- Global error boundary in React
- API error interceptor with retry logic
- User-friendly error messages
- Error logging service integration ready
- Graceful degradation for offline scenarios

### Security Features
- Environment variable validation on startup
- CORS configuration for production
- Rate limiting middleware (future enhancement)
- SQL injection prevention via Mongoose
- XSS protection via React's built-in escaping
- CSRF token support preparation


## Author

**Sohit Joshi**
- GitHub: [@SohitBennett](https://github.com/SohitBennett)
- Project Repository: [Planify](https://github.com/SohitBennett/planify)

## Acknowledgments

- Inspired by Google Calendar's intuitive interface
- Built with [shadcn/ui](https://ui.shadcn.com/) component library
- Icons by [Lucide](https://lucide.dev/)
- Email templates inspired by modern SaaS applications

**Built with ❤️ using Next.js, React, Node.js, Express, and MongoDB**
