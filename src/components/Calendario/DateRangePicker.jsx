import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { FaCalendarAlt } from 'react-icons/fa'
import 'react-day-picker/dist/style.css'
import './dateRangePicker.css'
import './calendario.css'

export function DateRangePicker({
  maxMonths = 3,
  numberOfMonths = 1,
  defaultMonth,
  onChange
}) {
  const [range, setRange] = useState()
  const [isOpen, setIsOpen] = useState(false)

  // Agora só guarda seleção
  const handleSelect = (selected) => {
    setRange(selected)
  }

  // Confirma intervalo e fecha
  const applySelection = () => {
    if (range?.from && range?.to) {
      onChange?.(range)
      setIsOpen(false)
    } else {
      alert('Selecione início e fim do período')
    }
  }

  const label =
    range?.from && range?.to
      ? `${range.from.toLocaleDateString('pt-BR')} - ${range.to.toLocaleDateString('pt-BR')}`
      : 'Selecione o período que deseja ver'

  return (
    <div className="drp-container">
      {/* Botão principal */}
      <button
        className="drp-button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaCalendarAlt className="drp-icon" />
        <span>{label}</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="drp-popover">
          <DayPicker
            mode="range"
            numberOfMonths={numberOfMonths}
            defaultMonth={defaultMonth}
            selected={range}
            onSelect={handleSelect}
            locale={ptBR}
            footer={
              <div style={{ marginTop: '0.5rem' }}>
                {range?.from && range?.to
                  ? `Período: ${range.from.toLocaleDateString('pt-BR')} - ${range.to.toLocaleDateString('pt-BR')}`
                  : `Selecione até ${maxMonths} meses`}
              </div>
            }
          />

          {/* Botão aplicar */}
          <div className="drp-actions">
            <button className="drp-apply" onClick={applySelection}>
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
