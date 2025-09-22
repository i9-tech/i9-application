import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { FaCalendarAlt } from 'react-icons/fa'
import { addMonths, subMonths, isBefore, isAfter } from 'date-fns'
import 'react-day-picker/dist/style.css'
import './dateRangePicker.css'
import './calendario.css'

export function DateRangePicker({
  maxMonths = 3,
  numberOfMonths = 1,
  defaultMonth,
  onChange
}) {
  const [range, setRange] = useState(undefined)
  const [isOpen, setIsOpen] = useState(false)

  // Agora só guarda seleção
  const handleSelect = (selected) => {
    if (!selected) {
      setRange(undefined)
      return
    }

    // Se escolher um novo "from", limpa o "to"
    if (selected.from && selected.from !== range?.from) {
      setRange({ from: selected.from, to: undefined })
      return
    }

    // Caso normal: aplica o range do DayPicker
    setRange(selected)
  }

  const applySelection = () => {
    if (range?.from) {
      // Se to não foi selecionado, define igual ao from
      const finalRange = { from: range.from, to: range.to ?? range.from }
      setRange(finalRange)
      onChange?.(finalRange)
      setIsOpen(false)
    } else {
      alert('Selecione uma data inicial')
    }
  }

  const from = range?.from
  const minDate = from ? subMonths(from, maxMonths) : undefined
  const maxDate = from ? addMonths(from, maxMonths) : undefined

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
            defaultMonth={defaultMonth ?? new Date()}
            selected={range}
            onSelect={handleSelect}
            locale={ptBR}
            startMonth={minDate}
            endMonth={maxDate}
            disabled={
              from
                ? (date) =>
                  (minDate && isBefore(date, minDate)) ||
                  (maxDate && isAfter(date, maxDate))
                : undefined
            }
            footer={
              <div style={{ marginTop: '0.5rem' }}>
                {range?.from && range?.to
                  ? `Período: ${range.from.toLocaleDateString('pt-BR')} - ${range.to.toLocaleDateString('pt-BR')}`
                  : `Selecione até ${maxMonths} meses a partir da data inicial`}
              </div>
            }
          />

          <div className="drp-actions">
            <button className="drp-clear"
              onClick={() => {
                const hoje = new Date();
                const hojeRange = { from: hoje, to: hoje };
                setRange(hojeRange);
                onChange?.(hojeRange);
                setIsOpen(false)
              }}>
              Limpar
            </button>

            <button className="drp-apply" onClick={applySelection}>
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
