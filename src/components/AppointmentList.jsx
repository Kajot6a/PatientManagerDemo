import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { CalendarIcon, Search, Plus, Filter } from 'lucide-react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Jan Kowalski',
      dentist: 'Dr. Anna Nowak',
      date: '2024-01-15',
      time: '10:00',
      status: 'scheduled'
    },
    {
      id: 2,
      patient: 'Maria Wiśniewska',
      dentist: 'Dr. Piotr Zieliński',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 3,
      patient: 'Piotr Kowalczyk',
      dentist: 'Dr. Anna Nowak',
      date: '2024-01-20',
      time: '09:00',
      status: 'scheduled'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesSearch = !searchTerm || 
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.dentist.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Zaplanowana</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Zakończona</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Anulowana</Badge>;
      default:
        return <Badge variant="outline">Nieznany</Badge>;
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    setShowForm(false);
    // Add appointment logic would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wizyty</h1>
          <p className="text-muted-foreground">Zarządzaj wizytami pacjentów</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj wizytę
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtry</CardTitle>
          <CardDescription>Filtruj listę wizyt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Szukaj pacjenta lub lekarza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="space-y-1">
                <Label htmlFor="filterDate">Data</Label>
                <Input
                  id="filterDate"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              {filterDate && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setFilterDate('')}
                >
                  Wyczyść
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista wizyt</CardTitle>
          <CardDescription>
            {filteredAppointments.length === 0 
              ? 'Brak wizyt spełniających kryteria' 
              : `Znaleziono ${filteredAppointments.length} wizyt`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Godzina</TableHead>
                <TableHead>Pacjent</TableHead>
                <TableHead>Lekarz</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appointment => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="font-medium">{appointment.patient}</TableCell>
                    <TableCell>{appointment.dentist}</TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Szczegóły
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground italic">
                    Brak wizyt spełniających kryteria wyszukiwania
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                <Input id="date" type="date" required />
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

export default AppointmentList;