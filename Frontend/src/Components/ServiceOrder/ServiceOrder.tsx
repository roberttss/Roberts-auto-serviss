import { RefObject, useState } from 'react';
import './ServiceOrder.scss'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

type ServiceProps = {
    serviceRef: RefObject<HTMLDivElement>
}

export const ServiceOrder = ({ serviceRef }: ServiceProps) => {
    const [serviceDate, setServiceDate] = useState<Date | null>(new Date());

    const isWeekend = (date: Date): boolean => {
        const day = date.getDay();
        // Disable Saturday (6) and Sunday (0)
        return day !== 6 && day !== 0;
    };

    console.log(1111, serviceDate)

    return (
        <div>
            <select name="services" id="">
                <option value="tyres">Change tyres</option>
                <option value="inspection">General inspection</option>
                <option value="cleaning">Car cleaning</option>
            </select>
            <DatePicker
                selected={serviceDate}
                onChange={(date) => setServiceDate(date)}
                placeholderText='DD/MM/YYYY'
                dateFormat='dd/MM/yyyy'
                filterDate={isWeekend} />
        </div>
    )
}