import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DatePickerModal } from "../../../components/date-picker-modal";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [ isDatePickerOpen, setIsDatePickerOpen ] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates?.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input onChange={event => setDestination(event.target.value)} type="text" placeholder="Para onde você vai?" disabled={isGuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
      </div>

      <button onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]" disabled={isGuestsInputOpen}>
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          { displayedDate || 'Quando?' }
        </span>
      </button>

      { isDatePickerOpen && (
        <DatePickerModal
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
          closeDatePicker={closeDatePicker}
        />
      ) }
      
      <div className="w-px h-6 bg-zinc-800" />
    
      { isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      ) }
    </div>
  )
}