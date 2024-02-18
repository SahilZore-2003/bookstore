import React from 'react'
import "./Services.scss"
import { TbTruckDelivery } from "react-icons/tb";
import { ImHeadphones } from "react-icons/im";
import { FaLock } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
const Services = () => {

    const services = [
        {
            icon: TbTruckDelivery,
            name: "Fast Delivery"
        },
        {
            icon: ImHeadphones,
            name: "24/7 Service"
        },
        {
            icon: RiCoupon2Line,
            name: "Best Deal"
        },
        {
            icon: FaLock,
            name: "Secure Payment"
        },
    ]

    return (
        <section className='services'>
            {
                services.map((e, index) => (
                    <div className="service" key={index}>
                        {e.icon()}
                        <h3>{e.name}</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                ))
            }


        </section>
    )
}

export default Services
