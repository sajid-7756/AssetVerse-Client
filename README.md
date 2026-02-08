# AssetVerse - Asset Management System

AssetVerse is a comprehensive Web Application designed to streamline asset management for businesses. It provides a platform for HR Managers to track company assets and for Employees to request and manage the assets they need.

## 🚀 Key Features

### For Employees:
- **Asset Requests:** Easily browse available assets and submit requests.
- **My Assets:** View list of assigned assets and their status.
- **Request Tracking:** Track the status of your requests (Pending, Approved, Rejected).
- **Profile Management:** Update personal details.

### For HR Managers:
- **Dashboard:** Overview of pending requests, limited stock items, and returnable/non-returnable asset charts.
- **Asset Management:** Add, update, and delete assets. Track inventory levels.
- **Employee Management:** View all employees and manage their company affiliation.
- **Request Handling:** Approve or reject asset requests with a single click.
- **Payments & Limits:** When an employee’s assigned asset limit is reached, HR must complete a Stripe payment to extend the limit before assigning more assets.
- **Reports:** Visual analytics of asset distribution and usage.

## 🛠️ Tech Stack

**Frontend:**
- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library for Tailwind
- [Framer Motion](https://www.framer.com/motion/) - Animation library

**Data & State Management:**
- [React Query](https://tanstack.com/query/v4) - Server state management
- [Axios](https://axios-http.com/) - HTTP client
- [Firebase Auth](https://firebase.google.com/) - Authentication

**Charts:**
- [Recharts](https://recharts.org/) - Composable charting library

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sajid-7756/AssetVerse-Client
   cd AssetVerse-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_sender_id
   VITE_appId=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Previews the production build locally.

---
Built with ❤️ by Sajid !!
