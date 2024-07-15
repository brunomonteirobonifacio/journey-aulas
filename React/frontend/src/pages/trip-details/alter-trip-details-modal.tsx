import { Calendar, MapPin, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { DatePickerModal } from "../../components/date-picker-modal";

interface AlterTripDetailsModalProps {
  closeAlterTripDetailsModal: () => void
  alterTripDetails: (event: FormEvent<HTMLFormElement>) => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function AlterTripDetailsModal({
  closeAlterTripDetailsModal,
  alterTripDetails,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: AlterTripDetailsModalProps) {
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button type="button" onClick={closeAlterTripDetailsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            As alterações poderão ser vistas por todos os convidados.
          </p>
        </div>

        <form onSubmit={(event) => alterTripDetails(event)} className="space-y-3">
          <div className="flex items-center flex-1 gap-2 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <MapPin className="text-zinc-400 size-5" />
            <input name="title" onChange={event => setDestination(event.target.value)} placeholder="Qual lugar?" className="bg-transparent text-lg text-zinc-400 outline-none flex-1" />
          </div>

          <button onClick={openDatePicker} className="p-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full text-left">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-40 flex-1">
              { displayedDate || 'Quando?' }
            </span>
          </button>

          { isDatePickerOpen && (
            <DatePickerModal
              closeDatePicker={closeDatePicker}
              eventStartAndEndDates={eventStartAndEndDates}
              setEventStartAndEndDates={setEventStartAndEndDates}
            />
          )}

          <Button variant="primary" size="full">
            Salvar alterações
          </Button>
        </form>
      </div>
    </div>
  )
}