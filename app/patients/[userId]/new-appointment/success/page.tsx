import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
//getting the appointment id from the url
//http://localhost:3000/patients/66b898c0000ee08f372b/new-appointment/success?appointmentId=66b8ba37002e441e563e
const Sucess = async({params: {userId}, searchParams}: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appoiment = await getAppointment(appointmentId); 
    const doctor = Doctors.find((doc) => doc.name === appoiment?.primaryPhysician); 
  return (
    <div className=  "flex h-screen max-h-screen px-[5%]">
        <div className = "success-img">
            <Link href = '/'>   
                <Image src = '/assets/icons/logo-full.svg' width = {1000} height  = {1000} alt = "logo"  className = "h-10 w-fit"/>
            </Link>
            <section className = "flex flex-col items-center">
                <Image src = "/assets/gifs/success.gif" height = {300} width = {280} alt = "success"/>
            <h2 className = "header mb-6 max-w-[600px] text-center">
                Your <span className ="text-green-500">appointment request </span> has been submitted
            </h2>
            <p>
                We will be in touch shortly to confirm.
            </p>
            </section>
            <section className = "request-details">
                <p>Requested appointment details:</p>
                <div className = "flex items-center gap-3">
                    <Image 
                    src= {doctor?.image!}
                    alt = "doctor"
                    width = {100}
                    height = {100}
                    className = "size-6"
                    />
                    <p className = "whitespace-nowrap">Dr. {doctor?.name}</p>
                </div>
                <div className = "flex gap-2">
                    <Image src = "/assets/icons/calendar.svg" width = {24} height = {24} alt = "calendar"/>
                    <p className = "">{formatDateTime(appoiment?.schedule).dateTime}</p>
                </div>
            </section>
            <Button variant = "outline" className = "shad-primary-btn" asChild>
                <Link href = {`/patients/${userId}/new-appointment`}>New Appointment</Link>
            </Button>
            <p className = "copyright justify-start">© 2024 CarePluse</p>
        </div>
    </div>
  )
}

export default Sucess