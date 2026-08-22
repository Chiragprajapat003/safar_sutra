import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import BottomNavBar from './BottomNavBar';
import CreateTripModal from './CreateTripModal';
import Toast from './Toast';
import { useTrips } from '../context/TripContext';

export default function AppLayout() {
  const { toast } = useTrips();
  const navigate = useNavigate();
  const location = useLocation();

  const showCreateTripFromUrl = location.pathname === '/trips/new';
  const [showCreateTripState, setShowCreateTripState] = useState(false);
  const showCreateTrip = showCreateTripState || showCreateTripFromUrl;

  const handleClose = () => {
    setShowCreateTripState(false);
    if (showCreateTripFromUrl) {
      navigate('/trips');
    }
  };

  const handleTripCreated = (trip) => {
    setShowCreateTripState(false);
    navigate(`/trips/${trip.id}/builder`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <TopNavBar onPlanTrip={() => setShowCreateTripState(true)} />
      <BottomNavBar onPlanTrip={() => setShowCreateTripState(true)} />

      {/* Page content */}
      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Modals */}
      {showCreateTrip && (
        <CreateTripModal
          onClose={handleClose}
          onCreated={handleTripCreated}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

