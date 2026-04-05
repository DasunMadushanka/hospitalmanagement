# Hospital Management System (Edu-App)

A modern, robust Hospital Management System built with the latest web technologies for efficient channeling and administration.

## 🚀 Technologies Used

- **[Next.js 15+ (App Router)](https://nextjs.org/docs/app/getting-started/installation)**: The core framework used for building a high-performance, SEO-friendly React application with server-side rendering and efficient routing.
- **[Clerk](https://dashboard.clerk.com/apps/)**: Handles all authentication and user management. We use Clerk's pre-built components and hooks (like `Show`, `UserButton`, `SignInButton`) for a seamless login/signup experience.
  - **Admin Access**: Authorization is managed via Clerk's `publicMetadata`. Users can be granted admin privileges by setting the `isAdmin` property to `true` in their public metadata.
- **[shadcn/ui](https://ui.shadcn.com/docs/components/base/alert)**: A collection of re-usable components built using Radix UI and Tailwind CSS. It provides the foundation for our premium, polished UI components like Alerts, Buttons, and Cards.
- **[Lucide React](https://lucide.dev/icons/user-star)**: A beautiful and consistent icon library used throughout the application to enhance visual communication.
- **[Tailwind CSS](https://tailwindcss.com/docs/font-family)**: A utility-first CSS framework for rapid UI development, allowing for a highly customized and responsive design without writing custom CSS.
- **[Neon](https://console.neon.tech/)**: A serverless PostgreSQL database that provides scalability and high performance for our data storage needs.
- **[Drizzle ORM](https://orm.drizzle.team/docs/get-started/neon-new)**: A TypeScript ORM that provides type-safe database interactions and easy migrations, ensuring data integrity and developer productivity.
- **[Sonner](https://sonner.stephanw.com/)**: Used for elegant, toast notifications to provide immediate feedback to users.

## 📁 Project Structure & Logic

### 1. `app/` (The Routing Engine)
- Follows Next.js App Router conventions.
- `app/layout.tsx`: The root layout wrapping the entire app with `ClerkProvider` for authentication and `Toaster` for notifications.
- `app/admin/`: Contains the admin dashboard. It includes server-side checks to verify the `isAdmin` flag in the user's Clerk `publicMetadata` before granting access.
- `app/submit/`: Dedicated routes for channel submissions.

### 2. `components/` (The UI Layer)
- `components/ui/`: Contains primitive, reusable UI components installed via shadcn/ui.
- `components/common/`: Shared components like `Header`, `Footer`, and `SectionHeader`.
- `components/admin/`: Specialized components for the admin panel (e.g., `StatsCards`, `AllChannels`, `PendingChannels`).
- `components/landing-page/`: Components specifically designed for the homepage and hero sections.

### 3. `lib/` (The Logic Layer)
- `lib/channels/`: Contains core business logic and server actions for managing channels (insert, select, cancel, reschedule, approve, reject).
- `lib/utils.ts`: General helper functions (like `cn` for Tailwind class merging).

### 4. `db/` (The Data Layer)
- `db/schema.ts`: Defines the database tables and relationships using Drizzle ORM.
- `db/index.ts`: Initializes the database connection using the Neon serverless driver.

## 🔑 Authentication Flow

1.  **User Access**: All users can view the landing page and featured services.
2.  **Protected Features**: Features like "Add Channel" or "Admin Panel" are wrapped in Clerk's `Show` component (using `when="signed-in"`) or handled via middleware/server-side redirects.
3.  **Admin Authorization**: Access to `/admin` routes is restricted. The system checks the `publicMetadata.isAdmin` field from Clerk. If the field is missing or `false`, the user is redirected to the home page or login.

## 🛠️ Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`.
3.  Set up your `.env` file with Clerk and Neon credentials.
4.  Push the database schema: `npx drizzle-kit push`.
5.  Run the development server: `npm run dev`.

<img width="1892" height="853" alt="image" src="https://github.com/user-attachments/assets/d29116f1-c3b0-47e6-a0e2-ca9aa611416a" />

<img width="1887" height="846" alt="image" src="https://github.com/user-attachments/assets/d279ac6d-078b-432c-867e-07a7b5e38e53" />

<img width="1902" height="849" alt="image" src="https://github.com/user-attachments/assets/303ccafb-6cf3-4149-a89b-d35907a7e303" />

<img width="1913" height="855" alt="image" src="https://github.com/user-attachments/assets/6eef4a67-424c-40d4-8dfb-b5e1f0b2a254" />



