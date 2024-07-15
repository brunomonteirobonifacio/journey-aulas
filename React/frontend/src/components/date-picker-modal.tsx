import { X } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

interface DatePickerModalProps {
  closeDatePicker: () => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DatePickerModal({
  closeDatePicker,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DatePickerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">
  
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione a data</h2>
            <button type="button">
              <X onClick={closeDatePicker} className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>
  
        <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
  
      </div>
    </div>
  )
}