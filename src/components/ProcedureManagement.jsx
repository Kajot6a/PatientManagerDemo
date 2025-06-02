"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

const ProcedureManagement = () => {
  const [procedures, setProcedures] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProcedure, setEditingProcedure] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  })

  useEffect(() => {
    // Mock procedures data
    const mockProcedures = [
      {
        id: 1,
        name: "Przegląd stomatologiczny",
        code: "P001",
        description: "Rutynowy przegląd jamy ustnej",
        price: "80.00",
      },
      {
        id: 2,
        name: "Wypełnienie ubytku",
        code: "P002",
        description: "Leczenie próchnicy z wypełnieniem",
        price: "150.00",
      },
      { id: 3, name: "Ekstrakcja zęba", code: "P003", description: "Usunięcie zęba", price: "120.00" },
      {
        id: 4,
        name: "Leczenie kanałowe",
        code: "P004",
        description: "Endodontyczne leczenie kanałowe",
        price: "400.00",
      },
      {
        id: 5,
        name: "Czyszczenie kamienia",
        code: "P005",
        description: "Usuwanie kamienia nazębnego",
        price: "100.00",
      },
    ]
    setProcedures(mockProcedures)
  }, [])

  const filteredProcedures = procedures.filter(
    (procedure) =>
      procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingProcedure) {
      // Update existing procedure
      setProcedures((prev) =>
        prev.map((proc) => (proc.id === editingProcedure.id ? { ...formData, id: editingProcedure.id } : proc)),
      )
    } else {
      // Add new procedure
      const newProcedure = {
        ...formData,
        id: procedures.length + 1,
      }
      setProcedures((prev) => [...prev, newProcedure])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", code: "", description: "", price: "" })
    setEditingProcedure(null)
    setShowForm(false)
  }

  const handleEdit = (procedure) => {
    setFormData(procedure)
    setEditingProcedure(procedure)
    setShowForm(true)
  }

  const handleDelete = (procedureId) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten zabieg?")) {
      setProcedures((prev) => prev.filter((proc) => proc.id !== procedureId))
    }
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zabiegi</h1>
          <p className="text-muted-foreground">Zarządzaj listą dostępnych zabiegów</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj zabieg
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtry</CardTitle>
          <CardDescription>Wyszukaj zabiegi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Szukaj po nazwie lub kodzie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista zabiegów</CardTitle>
          <CardDescription>
            {filteredProcedures.length === 0
              ? "Brak zabiegów spełniających kryteria"
              : `Znaleziono ${filteredProcedures.length} zabiegów`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Nazwa</TableHead>
                <TableHead>Opis</TableHead>
                <TableHead>Cena (PLN)</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcedures.length > 0 ? (
                filteredProcedures.map((procedure) => (
                  <TableRow key={procedure.id}>
                    <TableCell className="font-mono">{procedure.code}</TableCell>
                    <TableCell className="font-medium">{procedure.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{procedure.description}</TableCell>
                    <TableCell>{procedure.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(procedure)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(procedure.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground italic">
                    Brak zabiegów spełniających kryteria wyszukiwania
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingProcedure ? "Edytuj zabieg" : "Dodaj nowy zabieg"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kod zabiegu *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  required
                  placeholder="np. P001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Cena (PLN)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nazwa zabiegu *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                placeholder="np. Przegląd stomatologiczny"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Opis zabiegu..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Anuluj
              </Button>
              <Button type="submit">{editingProcedure ? "Zapisz zmiany" : "Dodaj zabieg"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProcedureManagement
