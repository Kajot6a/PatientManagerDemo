import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Clipboard, FileText, User, Edit, Phone, MapPin, Briefcase } from 'lucide-react';
import PatientForm from './PatientForm';
import ToothChart from './ToothChart';

const PatientDetails = ({ patient, onBack }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [patientData, setPatientData] = useState(patient);

  const handleEditPatient = (updatedPatient) => {
    setPatientData({
      ...patientData,
      ...updatedPatient
    });
    setShowEditForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {patientData.first_name} {patientData.last_name}
            </h1>
            <p className="text-muted-foreground">PESEL: {patientData.pesel}</p>
          </div>
        </div>
        
        <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
          <DialogTrigger asChild>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edytuj
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <PatientForm
              patient={patientData}
              onSubmit={handleEditPatient}
              onCancel={() => setShowEditForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Informacje</span>
          </TabsTrigger>
          <TabsTrigger value="dental">
            <FileText className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Stan jamy ustnej</span>
          </TabsTrigger>
          <TabsTrigger value="treatments">
            <Clipboard className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Historia zabiegów</span>
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Wizyty</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informacje podstawowe</CardTitle>
                  <CardDescription>Dane osobowe pacjenta</CardDescription>
                </div>
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {patientData.first_name[0]}{patientData.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Imię i nazwisko</p>
                  <p className="font-medium">{patientData.first_name} {patientData.last_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">PESEL</p>
                  <p className="font-mono">{patientData.pesel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Data urodzenia</p>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p>{patientData.date_of_birth}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Płeć</p>
                  <p>{patientData.gender === 'M' ? 'Mężczyzna' : 'Kobieta'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Zawód</p>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p>{patientData.occupation}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Aktywny
                  </Badge>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Adres</p>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <p>{patientData.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informacje dodatkowe</CardTitle>
              <CardDescription>Ubezpieczenie i inne dane</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status ubezpieczenia</p>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Ubezpieczony
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Nr dokumentu uprawniającego do świadczeń</p>
                  <p className="font-mono">-</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Informacje uzupełniające</p>
                  <p className="text-muted-foreground italic">Brak dodatkowych informacji</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dental" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Stan jamy ustnej</CardTitle>
              <CardDescription>Schemat zębowy i stan jamy ustnej pacjenta</CardDescription>
            </CardHeader>
            <CardContent>
              <ToothChart patientId={patientData.patient_id} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatments" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Historia zabiegów</CardTitle>
                <CardDescription>Zabiegi i procedury wykonane u pacjenta</CardDescription>
              </div>
              <Button>
                Dodaj zabieg
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ząb</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rozpoznanie</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Zabiegi</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Lekarz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td colSpan="5" className="p-4 align-middle text-center text-muted-foreground italic">
                        Brak zapisanych zabiegów
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Wizyty pacjenta</CardTitle>
                <CardDescription>Historia i zaplanowane wizyty</CardDescription>
              </div>
              <Button>
                Zaplanuj wizytę
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Godzina</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Lekarz</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td colSpan="5" className="p-4 align-middle text-center text-muted-foreground italic">
                        Brak zapisanych wizyt
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetails;