import React, { useState } from 'react';
import './App.css';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import AppointmentList from './components/AppointmentList';
import Calendar from './components/Calendar';
import ProcedureManagement from './components/ProcedureManagement';
import Navigation from './components/Navigation';
import { Users, CalendarIcon, ClipboardList, Settings } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'patients':
        return (
          <PatientList 
            onSelectPatient={(patient) => {
              setSelectedPatient(patient);
              setCurrentView('patient-details');
            }}
          />
        );
      case 'patient-details':
        return (
          <PatientDetails 
            patient={selectedPatient}
            onBack={() => setCurrentView('patients')}
          />
        );
      case 'appointments':
        return <AppointmentList />;
      case 'calendar':
        return <Calendar />;
      case 'procedures':
        return <ProcedureManagement />;
      default:
        return <PatientList />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">🦷</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                System Zarządzania Pacjentami
              </h1>
              <p className="text-sm text-muted-foreground">Poradnia Stomatologiczna</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;