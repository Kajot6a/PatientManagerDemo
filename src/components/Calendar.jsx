import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Mock appointments data
    const mockAppointments = [
      {
        id: 1,
        date: '2024-01-15',
        time: '10:00',
        patient: 'Jan Kowalski',
        dentist: 'Dr. Anna Nowak'
      },
      {
        id: 2,
        date: '2024-01-15',
        time: '14:30',
        patient: 'Maria Wiśniewska',
        dentist: 'Dr. Piotr Zieliński'
      },
      {
        id: 3,
        date: '2024-01-20',
        time: '09:00',
        patient: 'Piotr Kowalczyk',
        dentist: 'Dr. Anna Nowak'
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getAppointmentsForDate = (dateString) => {
    return appointments.filter(apt => apt.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];
  const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];

  const handleAddAppointment = (e) => {
    e.preventDefault();
    setShowForm(false);
    // Add appointment logic would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kalendarz</h1>
          <p className="text-muted-foreground">Kalendarz wizyt i terminów</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj wizytę
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Kalendarz wizyt</CardTitle>
            <CardDescription>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {dayNames.map(day => (
              <div key={day} className="py-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-16 rounded-md"></div>;
              }

              const dateString = formatDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const dayAppointments = getAppointmentsForDate(dateString);
              const isToday = dateString === new Date().toISOString().split('T')[0];
              const isSelected = selectedDate === dateString;

              return (
                <div
                  key={`day-${day}`}
                  className={cn(
                    "h-16 border rounded-md p-1 cursor-pointer hover:bg-muted/50 transition-colors",
                    isToday && "border-primary",
                    isSelected && "bg-primary/10 border-primary",
                    dayAppointments.length > 0 && "bg-blue-50"
                  )}
                  onClick={() => setSelectedDate(dateString)}
                >
                  <div className="flex flex-col h-full">
                    <div className={cn(
                      "text-right text-sm font-medium",
                      isToday && "text-primary"
                    )}>
                      {day}
                    </div>
                    {dayAppointments.length > 0 && (
                      <div className="mt-auto">
                        <Badge className="w-full justify-center bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {dayAppointments.length} {dayAppointments.length === 1 ? 'wizyta' : 'wizyty'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Wizyty na dzień {selectedDate}</CardTitle>
            <CardDescription>
              {getAppointmentsForDate(selectedDate).length > 0 
                ? `${getAppointmentsForDate(selectedDate).length} zaplanowanych wizyt` 
                : 'Brak zaplanowanych wizyt'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {getAppointmentsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getAppointmentsForDate(selectedDate).map(appointment => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 text-primary font-medium rounded-full w-10 h-10 flex items-center justify-center">
                        {appointment.time.split(':')[0]}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.dentist}</p>
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline">{appointment.time}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Brak wizyt w tym dniu</p>
                <Button className="mt-4" variant="outline" onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj wizytę
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj nową wizytę</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAppointment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Pacjent</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz pacjenta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Jan Kowalski</SelectItem>
                  <SelectItem value="2">Anna Nowak</SelectItem>
                  <SelectItem value="3">Piotr Wiśniewski</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dentist">Lekarz</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz lekarza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dr. Anna Nowak</SelectItem>
                  <SelectItem value="2">Dr. Piotr Zieliński</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input 
                  id="date" 
                  type="date" 
                  required 
                  defaultValue={selectedDate || ''} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Godzina</Label>
                <Input id="time" type="time" required />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Anuluj
              </Button>
              <Button type="submit">Dodaj wizytę</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;