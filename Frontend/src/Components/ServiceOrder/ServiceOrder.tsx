import { useContext } from 'react';
import './ServiceOrder.scss'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

type serviceFormData = {
    serviceType: string;
    orderedServiceDate: Date;
    orderedServiceTime: string;
}

export const ServiceOrder = () => {
    const { user } = useContext(GlobalContext)

    const isWeekend = (date: Date): boolean => {
        const day = date.getDay();

        return day !== 6 && day !== 0;
    };

    const today = new Date();

    const { control, register, handleSubmit } = useForm<serviceFormData>()

    const onSubmit: SubmitHandler<serviceFormData> = async ({ serviceType, orderedServiceDate, orderedServiceTime }) => {
        const serviceData = {
            createAt: new Date(Date.now()),
            name: serviceType,
            orderedServiceDate,
            orderedServiceTime,
            userId: user?.id
        }

        const response = await fetch("http://localhost:3000/api/services/create", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(serviceData)
        })
        const responseJSON = await response.json();

        if (responseJSON.statusCode === 500) {
            return alert("Please try again")
        }
    }

    return (
        <div className='serviceOrder__container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("serviceType")}>
                    <option value="tyres">Change tyres</option>
                    <option value="inspection">General inspection</option>
                    <option value="cleaning">Car cleaning</option>
                </select>
                <Controller
                    control={control}
                    name='orderedServiceDate'
                    render={({ field }) => (
                        <DatePicker
                            placeholderText='DD/MM/YYYY'
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                            dateFormat='dd/MM/yyyy'
                            filterDate={isWeekend}
                            minDate={today}
                        />
                    )}
                />
                <select {...register("orderedServiceTime")} >
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                </select>
                <button>Order service</button>
            </form>
        </div>
    )
}