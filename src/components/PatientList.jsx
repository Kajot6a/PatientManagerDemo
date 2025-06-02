import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Search, Plus, Grid3X3, List, ArrowUpDown, ArrowUp, ArrowDown, Users } from 'lucide-react';
import PatientForm from './PatientForm';
import { cn } from '../lib/utils';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('last_name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const mockPatients = [
      {
        patient_id: 1,
        first_name: 'Jan',
        last_name: 'Kowalski',
        pesel: '80010112345',
        date_of_birth: '1980-01-01',
        address: 'ul. Główna 1, 00-001 Warszawa',
        occupation: 'Inżynier',
        gender: 'M',
        last_visit: '2024-01-10'
      },
      {
        patient_id: 2,
        first_name: 'Anna',
        last_name: 'Nowak',
        pesel: '85050567890',
        date_of_birth: '1985-05-05',
        address: 'ul. Kwiatowa 15, 00-002 Warszawa',
        occupation: 'Nauczyciel',
        gender: 'K',
        last_visit: '2024-01-15'
      },
      {
        patient_id: 3,
        first_name: 'Piotr',
        last_name: 'Wiśniewski',
        pesel: '75030398765',
        date_of_birth: '1975-03-03',
        address: 'ul. Słoneczna 22, 00-003 Warszawa',
        occupation: 'Lekarz',
        gender: 'M',
        last_visit: '2024-01-08'
      }
    ];
    setPatients(mockPatients);
  }, []);

  const filteredAndSortedPatients = patients
    .filter(patient =>
      `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.pesel.includes(searchTerm)
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'full_name') {
        aValue = `${a.first_name} ${a.last_name}`;
        bValue = `${b.first_name} ${b.last_name}`;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleAddPatient = (newPatient) => {
    const patientWithId = {
      ...newPatient,
      patient_id: patients.length + 1,
      last_visit: null
    };
    setPatients([...patients, patientWithId]);
    setShowForm(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacjenci</h1>
          <p className="text-muted-foreground">Zarządzaj listą pacjentów poradni</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Dodaj Pacjenta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <PatientForm
              onSubmit={handleAddPatient}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Szukaj pacjenta (imię, nazwisko, PESEL)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Widok:</span>
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Znaleziono {filteredAndSortedPatients.length} pacjentów
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedPatients.map(patient => (
            <Card 
              key={patient.patient_id} 
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => onSelectPatient(patient)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {patient.first_name[0]}{patient.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {patient.first_name} {patient.last_name}
                      </CardTitle>
                      <CardDescription>PESEL: {patient.pesel}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Aktywny
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>📅</span>
                  <span>{patient.date_of_birth}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>💼</span>
                  <span>{patient.occupation}</span>
                </div>
                {patient.last_visit && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>🕒</span>
                    <span>Ostatnia wizyta: {patient.last_visit}</span>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <span className="text-primary text-sm font-medium hover:text-primary/80">
                    Zobacz szczegóły →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('full_name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Imię i nazwisko</span>
                    <SortIcon field="full_name" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('pesel')}
                >
                  <div className="flex items-center space-x-1">
                    <span>PESEL</span>
                    <SortIcon field="pesel" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('date_of_birth')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Data urodzenia</span>
                    <SortIcon field="date_of_birth" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('occupation')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Zawód</span>
                    <SortIcon field="occupation" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('last_visit')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Ostatnia wizyta</span>
                    <SortIcon field="last_visit" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPatients.map(patient => (
                <TableRow 
                  key={patient.patient_id}
                  className="cursor-pointer"
                  onClick={() => onSelectPatient(patient)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {patient.first_name[0]}{patient.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {patient.first_name} {patient.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {patient.gender === 'M' ? 'Mężczyzna' : 'Kobieta'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {patient.pesel}
                  </TableCell>
                  <TableCell>{patient.date_of_birth}</TableCell>
                  <TableCell>{patient.occupation}</TableCell>
                  <TableCell>
                    {patient.last_visit || (
                      <span className="text-muted-foreground italic">Brak wizyt</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPatient(patient);
                      }}
                    >
                      Zobacz szczegóły
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Empty State */}
      {filteredAndSortedPatients.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground" />
            <CardTitle className="mt-4">Brak pacjentów</CardTitle>
            <CardDescription className="mt-2 text-center">
              {searchTerm ? 'Nie znaleziono pacjentów spełniających kryteria wyszukiwania.' : 'Rozpocznij dodając pierwszego pacjenta.'}
            </CardDescription>
            {!searchTerm && (
              <Button className="mt-6" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Dodaj pierwszego pacjenta
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientList;