import React, { useEffect, useState } from 'react'
import "./Arrivals.scss"
import ArrivalBook from './ArrivalBook'
import { useFirebase } from "../../context/AuthContext"
import { Loader } from "../index"
const Arrivals = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAllBooks } = useFirebase()

    useEffect(() => {
        setLoading(true)
        getAllBooks().then((val) => {
            setData(val.docs)
            setLoading(false)
        })
    }, [])

    return (
        <div className='arrivals' id='arrivals'>
            <h1 className="center">New Arrivals.</h1>
            <div className="container">
                {
                    loading ? <>
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                        <Loader />
                    </> :
                        data.map((e) => (
                            <ArrivalBook key={e.id} data={e.data()} id={e.id} />
                        ))
                }

            </div>
        </div>
    )
}

export default Arrivals
