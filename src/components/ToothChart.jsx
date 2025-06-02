"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "../lib/utils"

const ToothChart = ({ patientId }) => {
  // Store multiple conditions per tooth
  const [toothStatus, setToothStatus] = useState({})

  // Tooth numbering: 1-8 in each quarter from center outward
  const upperRight = [1, 2, 3, 4, 5, 6, 7, 8] // Upper right quadrant
  const upperLeft = [1, 2, 3, 4, 5, 6, 7, 8] // Upper left quadrant
  const lowerLeft = [1, 2, 3, 4, 5, 6, 7, 8] // Lower left quadrant
  const lowerRight = [1, 2, 3, 4, 5, 6, 7, 8] // Lower right quadrant

  // Separate conditions into categories
  const basicConditions = [
    { value: "o", label: "Ząb niewyróżniony", color: "#e8f5e8" },
    { value: "-", label: "Brak zęba", color: "#ffebee" },
    { value: "k", label: "Korona protetyczna", color: "#fff3e0" },
    { value: "~", label: "Kamień lub osad nazębny", color: "#f3e5f5" },
    { value: "c", label: "Próchnica", color: "#ffcdd2" },
    { value: "v", label: "Ząb lub korzeń do usunięcia", color: "#ffcdd2" },
    { value: "w", label: "Wypełnienie", color: "#c8e6c9" },
  ]

  const degreeConditions = [
    { value: "I", label: "Stopień I", color: "#bbdefb" },
    { value: "II", label: "Stopień II", color: "#90caf9" },
    { value: "III", label: "Stopień III", color: "#64b5f6" },
    { value: "IV", label: "Stopień IV", color: "#42a5f5" },
    { value: "V", label: "Stopień V", color: "#2196f3" },
  ]

  const handleStatusChange = (quadrant, toothNumber, condition) => {
    const toothId = `${quadrant}-${toothNumber}`
    const currentStatus = toothStatus[toothId] || { basic: null, degree: null }

    // Check if it's a degree condition
    const isDegree = degreeConditions.some((dc) => dc.value === condition.value)

    // Update the appropriate category
    if (isDegree) {
      // Toggle degree if already selected
      if (currentStatus.degree === condition.value) {
        setToothStatus((prev) => ({
          ...prev,
          [toothId]: { ...currentStatus, degree: null },
        }))
      } else {
        setToothStatus((prev) => ({
          ...prev,
          [toothId]: { ...currentStatus, degree: condition.value },
        }))
      }
    } else {
      // For basic conditions, toggle if already selected
      if (currentStatus.basic === condition.value) {
        setToothStatus((prev) => ({
          ...prev,
          [toothId]: { ...currentStatus, basic: null },
        }))
      } else {
        setToothStatus((prev) => ({
          ...prev,
          [toothId]: { ...currentStatus, basic: condition.value },
        }))
      }
    }
  }

  const getToothStyle = (quadrant, toothNumber) => {
    const toothId = `${quadrant}-${toothNumber}`
    const status = toothStatus[toothId] || { basic: null, degree: null }

    // Determine background color based on conditions
    let backgroundColor = "#fff"

    if (status.basic) {
      const basicCondition = basicConditions.find((c) => c.value === status.basic)
      if (basicCondition) backgroundColor = basicCondition.color
    }

    // If there's a degree, it slightly modifies the color
    if (status.degree) {
      backgroundColor =
        status.degree === "I"
          ? "#e3f2fd"
          : status.degree === "II"
            ? "#bbdefb"
            : status.degree === "III"
              ? "#90caf9"
              : status.degree === "IV"
                ? "#64b5f6"
                : status.degree === "V"
                  ? "#2196f3"
                  : backgroundColor
    }

    return backgroundColor
  }

  const renderTooth = (quadrant, toothNumber) => {
    const toothId = `${quadrant}-${toothNumber}`
    const status = toothStatus[toothId] || { basic: null, degree: null }
    const backgroundColor = getToothStyle(quadrant, toothNumber)

    return (
      <Popover key={toothId}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative flex flex-col items-center justify-center w-12 h-12 border rounded-md cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white"
            style={{ backgroundColor }}
          >
            <span className="text-xs font-medium pointer-events-none select-none">{toothNumber}</span>
            <div className="flex flex-col items-center mt-1 gap-0.5 pointer-events-none select-none">
              {status.basic && <span className="text-xs font-bold">{status.basic}</span>}
              {status.degree && <span className="text-xs font-bold text-blue-800">{status.degree}</span>}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" side="top" align="center">
          <div className="p-4 border-b">
            <h4 className="font-medium">
              Ząb {quadrant} {toothNumber}
            </h4>
            <p className="text-sm text-muted-foreground">Wybierz stan zęba</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Stan podstawowy:</h5>
              <div className="flex flex-wrap gap-2">
                {basicConditions.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer hover:bg-muted/50",
                      status.basic === condition.value ? "border-primary bg-primary/10" : "border-input",
                    )}
                    style={{ backgroundColor: condition.color }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleStatusChange(quadrant, toothNumber, condition)
                    }}
                  >
                    {condition.value} - {condition.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Stopień zaawansowania:</h5>
              <div className="flex flex-wrap gap-2">
                {degreeConditions.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer hover:bg-muted/50",
                      status.degree === condition.value ? "border-primary bg-primary/10" : "border-input",
                    )}
                    style={{ backgroundColor: condition.color }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleStatusChange(quadrant, toothNumber, condition)
                    }}
                  >
                    {condition.value} - {condition.label}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setToothStatus((prev) => ({
                  ...prev,
                  [toothId]: { basic: null, degree: null },
                }))
              }}
            >
              Wyczyść
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Legenda:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Stan podstawowy:</h4>
                <div className="space-y-1">
                  {basicConditions.map((condition) => (
                    <div key={condition.value} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm border" style={{ backgroundColor: condition.color }}></div>
                      <span className="text-sm">
                        {condition.value} - {condition.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Stopień zaawansowania:</h4>
                <div className="space-y-1">
                  {degreeConditions.map((condition) => (
                    <div key={condition.value} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm border" style={{ backgroundColor: condition.color }}></div>
                      <span className="text-sm">
                        {condition.value} - {condition.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Stan jamy ustnej:</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Błona śluzowa:</label>
                <input
                  type="text"
                  placeholder="Stan błony śluzowej"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Przyzębie:</label>
                <input
                  type="text"
                  placeholder="Stan przyzębia"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Higiena:</label>
                <input type="text" placeholder="Stan higieny" className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-6">Schemat zębowy:</h3>

          {/* Upper Jaw - Arch Formation */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Szczęka górna</h4>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-16 border-t-2 border-l-2 border-r-2 rounded-t-full pointer-events-none"></div>
                <div className="flex pt-4">
                  {/* Upper Right */}
                  <div className="flex flex-row-reverse">
                    {upperRight.map((toothNumber) => (
                      <div key={`UR-${toothNumber}`} className="m-1">
                        {renderTooth("UR", toothNumber)}
                      </div>
                    ))}
                  </div>

                  {/* Upper Left */}
                  <div className="flex">
                    {upperLeft.map((toothNumber) => (
                      <div key={`UL-${toothNumber}`} className="m-1">
                        {renderTooth("UL", toothNumber)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Jaw - Arch Formation */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Szczęka dolna</h4>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute bottom-0 left-0 right-0 h-16 border-b-2 border-l-2 border-r-2 rounded-b-full pointer-events-none"></div>
                <div className="flex pb-4">
                  {/* Lower Right */}
                  <div className="flex flex-row-reverse">
                    {lowerRight.map((toothNumber) => (
                      <div key={`LR-${toothNumber}`} className="m-1">
                        {renderTooth("LR", toothNumber)}
                      </div>
                    ))}
                  </div>

                  {/* Lower Left */}
                  <div className="flex">
                    {lowerLeft.map((toothNumber) => (
                      <div key={`LL-${toothNumber}`} className="m-1">
                        {renderTooth("LL", toothNumber)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Instrukcja:</strong> Kliknij na ząb, aby otworzyć menu wyboru stanu. Możesz wybrać zarówno stan
              podstawowy jak i stopień zaawansowania.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ToothChart
