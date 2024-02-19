import React, { useEffect, useState } from 'react'
import "./Orders.scss"
import { useFirebase } from "../../context/AuthContext"
import { CheckoutLoader } from "../../components"
const Orders = () => {

    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(false)
    const { getAllOrers } = useFirebase()

    const convertDate = (buydate) => {

        const monthsinnumbers = {
            "Jan": 0,
            "Feb": 1,
            "Mar": 2,
            "Apr": 3,
            "May": 4,
            "Jun": 5,
            "Jul": 6,
            "Aug": 7,
            "Sep": 8,
            "Oct": 9,
            "Nov": 10,
            "Dec": 11,
        }

        const arr = buydate.split(" ")
        const [, month, date, year, time] = arr;
        const [hours, min] = time.split(":")
        return new Date(+year, monthsinnumbers[month], +date, +hours, +min).getTime()

    }


    useEffect(() => {
        setLoading(true)
        getAllOrers().then((e) => {
            setOrders(e.docs.map(e => e.data()))
        }).catch((e) => console.log(e))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <CheckoutLoader />
    }

    return (
        <div className='orders'>

            <table>
                <thead>
                    <tr>
                        <th>Sr-no</th>
                        <th>Email ID</th>
                        <th>Time & Date</th>
                        <th>Book</th>
                        <th>Bill</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orders?.sort((a, b) => convertDate(a.time) > convertDate(b.time) ? -1 : 1).map((e, i) => {

                            return (
                                <tr key={e.time}>
                                    <td data-cell="sr" className='sr'>{++i}</td>
                                    <td data-cell="email">{e.email}</td>
                                    <td data-cell="time & date">{e.time.slice(0, 25)}</td>
                                    <td data-cell="books">
                                        {
                                            e.books.map((e) => (<div>{e}</div>))
                                        }
                                    </td>
                                    <td data-cell="bill">{e.bill}</td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
        </div>
    )
}

export default Orders
