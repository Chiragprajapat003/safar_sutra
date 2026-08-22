import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

// Layouts
import AppLayout from './components/AppLayout';

// Public pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SharedItineraryPage from './pages/SharedItineraryPage';

// Protected pages
import DashboardPage from './pages/DashboardPage';
import MyTripsPage from './pages/MyTripsPage';
import ItineraryBuilderPage from './pages/ItineraryBuilderPage';
import ItineraryViewPage from './pages/ItineraryViewPage';
import ExplorePage from './pages/ExplorePage';
import BudgetPage from './pages/BudgetPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAF7F2]">
        <span className="material-symbols-outlined text-4xl text-[#4A2E18] animate-spin">progress_activity</span>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Root redirects directly to Dashboard / Login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Authentication & Shared Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/trips/:id/share" element={<SharedItineraryPage />} />
      <Route path="/share/:token" element={<SharedItineraryPage />} />
      <Route path="/itinerary/view" element={<SharedItineraryPage />} />


      {/* Protected App Routes under AppLayout */}
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/trips" element={<MyTripsPage />} />
        <Route path="/trips/:id" element={<ItineraryViewPage />} />
        <Route path="/trips/:id/builder" element={<ItineraryBuilderPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminAnalyticsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TripProvider>
          <AppRoutes />
        </TripProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
