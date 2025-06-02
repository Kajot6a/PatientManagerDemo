import React, { useState } from 'react';

const ProcedureSelector = ({ availableProcedures, selectedProcedures, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProcedures = availableProcedures.filter(procedure =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcedureToggle = (procedure) => {
    const isSelected = selectedProcedures.some(p => p.id === procedure.id);
    
    if (isSelected) {
      onChange(selectedProcedures.filter(p => p.id !== procedure.id));
    } else {
      onChange([...selectedProcedures, procedure]);
    }
  };

  const removeProcedure = (procedureId) => {
    onChange(selectedProcedures.filter(p => p.id !== procedureId));
  };

  return (
    <div className="procedure-selector">
      <div className="selected-procedures">
        {selectedProcedures.map(procedure => (
          <div key={procedure.id} className="selected-procedure-tag">
            <span>{procedure.name} ({procedure.code})</span>
            <button
              type="button"
              className="remove-procedure"
              onClick={() => removeProcedure(procedure.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="procedure-dropdown">
        <button
          type="button"
          className="dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          Wybierz zabiegi
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-search">
              <input
                type="text"
                placeholder="Szukaj zabiegów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="procedure-list">
              {filteredProcedures.map(procedure => {
                const isSelected = selectedProcedures.some(p => p.id === procedure.id);
                return (
                  <div
                    key={procedure.id}
                    className={`procedure-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleProcedureToggle(procedure)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by onClick
                    />
                    <span className="procedure-name">{procedure.name}</span>
                    <span className="procedure-code">({procedure.code})</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureSelector;