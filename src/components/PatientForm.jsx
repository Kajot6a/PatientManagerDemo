"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { DialogHeader, DialogTitle } from "./ui/dialog"

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: patient?.first_name || "",
    last_name: patient?.last_name || "",
    pesel: patient?.pesel || "",
    date_of_birth: patient?.date_of_birth || "",
    gender: patient?.gender || "",
    address: patient?.address || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    occupation: patient?.occupation || "",
    notes: patient?.notes || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{patient ? "Edytuj pacjenta" : "Dodaj nowego pacjenta"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Imię *</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Nazwisko *</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pesel">PESEL *</Label>
            <Input
              id="pesel"
              value={formData.pesel}
              onChange={(e) => handleChange("pesel", e.target.value)}
              required
              maxLength={11}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Data urodzenia</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Płeć</Label>
            <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz płeć" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Mężczyzna</SelectItem>
                <SelectItem value="F">Kobieta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adres</Label>
          <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Zawód</Label>
            <Input
              id="occupation"
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Uwagi</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit">{patient ? "Zapisz zmiany" : "Dodaj pacjenta"}</Button>
        </div>
      </form>
    </>
  )
}

export default PatientForm
