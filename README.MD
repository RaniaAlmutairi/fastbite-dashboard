# FastBite — Food Ordering Admin & Customer System

FastBite is a modern React + Supabase-based web application for managing meals, orders, and users. It supports both admin and customer interfaces, allowing efficient order creation, meal management, and customer interaction.

---

## Features

### Admin Dashboard
- View, create, edit, and delete meals
- Categorize meals
- View and manage orders
- Role-based navigation (admin vs customer)

### Customer Features
- Customer registration and login
- Browse meals menu
- Place orders
- View cart

---

## Technologies Used

- React (with TypeScript)
- Supabase (authentication + database)
- Refine.dev (admin panel)
- React Bootstrap (UI components)
- React Router DOM (navigation and routing)

---

## Pages Structure

### Admin Pages
- `/meals` — List and manage meals
- `/meals/create`, `/meals/edit/:id` — Create and edit meals
- `/orders` — Manage customer orders
- `/orders/create`, `/orders/edit/:id` — Create and update orders

### Customer Pages
- `/register-customer` — Customer registration
- `/login` — Login
- `/menu` — Browse available meals
- `/cart` — Cart page and logout

### Shared
- `/` — Role-based redirect
- `/auth-redirect` — Determines user role and redirects accordingly

---

## Authentication

- Supabase Auth is used for user registration and login.
- Each new user is added to the `profiles` table with their role (`admin` or `customer`).
- After login, users are redirected to pages based on their assigned role.

> Note: Authentication, access control, and session management will be improved in future updates. it is not working now.

---

## Database Tables (Supabase)

### profiles

| Column   | Type   | Description              |
|----------|--------|--------------------------|
| id       | UUID   | Supabase Auth user ID    |
| name     | text   | Full name                |
| email    | text   | User email               |
| phone    | text   | Phone number             |
| role     | text   | `admin` or `customer`    |

### meals

| Column      | Type   |
|-------------|--------|
| id          | UUID   |
| name        | text   |
| price       | number |
| category    | text   |
| description | text   |
| image       | text (URL) |

### orders

| Column   | Type |
|----------|------|
| id       | UUID |
| name     | text |
| address  | text |
| phone    | text |
| items    | JSON |

---

## Running Locally

```bash
git clone https://github.com/RaniaAlmutairi/fastbite-dashboard.git
cd fastbite
npm install
npm start
