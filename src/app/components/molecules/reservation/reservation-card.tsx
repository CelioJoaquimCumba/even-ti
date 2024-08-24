import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter } from '../../atoms/card'
import { Badge } from '../../atoms/badge'
import { ClockIcon, SewingPinIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '../../atoms/button'
import { ModalType, Reservation } from '@/data/types'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ErrorModal from '../error-modal'
import SuccessfulCancelationEventModal from './successful-cancelation-event-modal'
import EventCancelationModal from '../event/event-cancelation-modal'
import { cancelReservation } from '@/app/actions/reservations'

export function ReservationCard(props: {
  isDisabled?: boolean
  reservation: Reservation
}) {
  const { code, event } = props.reservation
  const {
    id: eventId,
    community,
    title,
    logo: image,
    date,
    time,
    location,
  } = event
  const { isDisabled } = props
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ModalType>('cancelation')
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useUser()

  const handleCancelReservation = async () => {
    try {
      setLoading(true)
      await cancelReservation({
        eventId,
        userId:
          (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
      })
      setErrorMessage('')
      setTypeModal('success')
    } catch (error) {
      console.log(error)
      const e = error as unknown as { message: string }
      setErrorMessage(e.message)
      setTypeModal('error')
    } finally {
      setLoading(false)
    }
  }
  const goToCancelation = () => {
    setShowModal(true)
    setTypeModal('cancelation')
  }

  const toggleModal = () => {
    typeModal === 'success' && window.location.reload()
    setTypeModal('cancelation')
    setErrorMessage('')
    setShowModal(!showModal)
  }
  return (
    <>
      <Card
        className={`flex flex-col space-y-2 md:flex-row w-full justify-between p-4 rounded-2xl gap-2 cursor-pointer ${isDisabled && 'cursor-not-allowed bg-gray-100'}`}
      >
        <CardContent className="flex flex-wrap md:flex-nowrap gap-6 p-0">
          <div
            className={`hidden md:flex md:flex-col w-40 h-40 min-w-40 aspect-square justify-center items-center border rounded-3xl`}
          >
            <h2>{date.split('de')[1]}</h2>
            <h3>{date.split('de')[0]}</h3>
          </div>
          <Image
            unoptimized
            src={image}
            alt="datawave-event"
            width={200}
            height={200}
            className={`flex flex-col w-40 h-40 aspect-square bg-cover justify-center items-center border rounded-3xl`}
          />
          <section className="flex flex-col space-y-2">
            <div className="flex justify-between w-full">
              <h2 className="text-base font-normal">{community}</h2>
            </div>
            <h2 className="text-lg font-medium">{title}</h2>
            <ul className={`flex flex-col md:flex-col gap-2`}>
              <Badge
                variant={'secondary'}
                className={`gap-2 px-2 py-1 w-fit md:hidden`}
              >
                <CalendarIcon />
                <span className="md:whitespace-nowrap">{date}</span>
              </Badge>
              <Badge variant={'secondary'} className="gap-2 px-2 py-1 w-fit">
                <ClockIcon />
                <span className="md:whitespace-nowrap">{time}</span>
              </Badge>
              <Badge variant={'secondary'} className="gap-2 px-2 py-1 w-fit">
                <SewingPinIcon />
                <span className="md:whitespace-nowrap">{location}</span>
              </Badge>
            </ul>
          </section>
        </CardContent>
        <CardDescription
          className={`flex flex-col justify-center items-center p-0 ${isDisabled && 'w-full'}`}
        >
          <h4 className="text-base font-normal">Code</h4>
          <h3 className="text-xl font-bold">{code}</h3>
        </CardDescription>
        {!isDisabled && (
          <CardFooter className={`flex flex-col justify-end items-end p-0`}>
            <div className="flex gap-2 w-full">
              <Button
                variant={'destructive'}
                className="w-full md:w-fit whitespace-pre-line px-8 py-4"
                onClick={(e) => {
                  goToCancelation()
                  e.stopPropagation()
                }}
              >
                Cancelar reserva
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      {typeModal === 'cancelation' ? (
        <EventCancelationModal
          open={showModal}
          close={toggleModal}
          event={event}
          onClick={handleCancelReservation}
          loading={loading}
        />
      ) : typeModal === 'error' ? (
        <ErrorModal
          open={showModal}
          close={toggleModal}
          onClick={goToCancelation}
          message={errorMessage}
        />
      ) : (
        <SuccessfulCancelationEventModal open={showModal} close={toggleModal} />
      )}
    </>
  )
}
