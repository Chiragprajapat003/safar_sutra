import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import BottomNavBar from './BottomNavBar';
import CreateTripModal from './CreateTripModal';
import Toast from './Toast';
import { useTrips } from '../context/TripContext';

export default function AppLayout() {
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const { toast } = useTrips();
  const navigate = useNavigate();

  const handleTripCreated = (trip) => {
    setShowCreateTrip(false);
    navigate(`/trips/${trip.id}/builder`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <TopNavBar onPlanTrip={() => setShowCreateTrip(true)} />
      <BottomNavBar onPlanTrip={() => setShowCreateTrip(true)} />

      {/* Page content */}
      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Modals */}
      {showCreateTrip && (
        <CreateTripModal
          onClose={() => setShowCreateTrip(false)}
          onCreated={handleTripCreated}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

