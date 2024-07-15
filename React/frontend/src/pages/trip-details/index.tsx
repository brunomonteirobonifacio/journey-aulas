import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { AlterTripDetailsModal } from "./alter-trip-details-modal";

export function TripDetailsPage() {
  const [ isCreateActivityModalOpen, setIsCreateActivityModalOpen ] = useState(false)
  const [ isCreateLinkModalOpen, setIsCreateLinkModalOpen ] = useState(false)
  const [ isAlterTripDetailsModalOpen, setIsAlterTripDetailsModalOpen ] = useState(false)
  const [ destination, setDestination ] = useState('')
  const [ eventStartAndEndDates, setEventStartAndEndDates ] = useState<DateRange | undefined>()

  const { tripId } = useParams()

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  function openAlterTripDetailsModal() {
    setIsAlterTripDetailsModalOpen(true)
  }

  function closeAlterTripDetailsModal() {
    setIsAlterTripDetailsModalOpen(false)
  }

  async function alterTripDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(tripId)

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
      return
    }

    const response = await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to
    })

    if ((response).status == 200) {
      window.document.location.reload()
    }
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader
        openAlterTripDetailsModal={openAlterTripDetailsModal}
      />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            openCreateLinkModal={openCreateLinkModal}
          />
          <div className="h-px w-full bg-zinc-800" />
          <Guests />
        </div>
      </main>

      { isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}

      { isCreateActivityModalOpen && (
        <CreateActivityModal 
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      { isAlterTripDetailsModalOpen && (
        <AlterTripDetailsModal
          setDestination={setDestination}
          alterTripDetails={alterTripDetails}
          closeAlterTripDetailsModal={closeAlterTripDetailsModal}
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
        />
      )}
    </div>
  )
}