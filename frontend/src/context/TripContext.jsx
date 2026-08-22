import { createContext, useContext, useState, useEffect } from 'react';

import { tripsApi } from '../services/api';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load trips from backend when component mounts
  useEffect(() => {
    async function fetchTrips() {
      try {
        const data = await tripsApi.getAll();
        if (Array.isArray(data.trips)) {
          setTrips(data.trips);
        } else {
          setTrips([]);
        }
      } catch (err) {
        console.warn('Failed to fetch trips, falling back to empty list', err);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      progress: 0,
      status: 'planning',
      daysUntil: 30,
      days: [],
      stops: [],
      ...tripData,
    };
    setTrips(prev => [...prev, newTrip]);
    showToast('Trip created successfully!');
    return newTrip;
  };

  const updateTrip = (id, updates) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    showToast('Trip updated!');
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    showToast('Trip deleted.', 'info');
  };

  const addActivity = (tripId, dayIndex, activity) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      const days = [...(t.days || [])];
      if (!days[dayIndex]) {
        days[dayIndex] = { day: dayIndex + 1, date: '', city: '', activities: [] };
      }
      days[dayIndex] = {
        ...days[dayIndex],
        activities: [...(days[dayIndex].activities || []), { id: Date.now(), ...activity }],
      };
      return { ...t, days };
    }));
  };

  const removeActivity = (tripId, dayIndex, activityId) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      const days = [...(t.days || [])];
      if (days[dayIndex]) {
        days[dayIndex] = {
          ...days[dayIndex],
          activities: days[dayIndex].activities.filter(a => a.id !== activityId),
        };
      }
      return { ...t, days };
    }));
  };

  const getTripById = (id) => trips.find(t => t.id === Number(id));

  return (
    <TripContext.Provider value={{
      trips, loading, addTrip, updateTrip, deleteTrip,
      addActivity, removeActivity, getTripById, toast,
    }}>

      {children}
    </TripContext.Provider>
  );
}

export const useTrips = () => useContext(TripContext);

