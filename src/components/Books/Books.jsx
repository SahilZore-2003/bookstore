import React, { useRef, useState, useEffect } from 'react'
import "./Books.scss"
import Book from '../Book/Book'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaChevronCircleRight } from "react-icons/fa";
import { useFirebase } from "../../context/AuthContext"
import Loader from '../Loader/Loader';


const Books = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { getAllBooks } = useFirebase()


    const box = useRef(null)

    useEffect(() => {
        setLoading(true)
        getAllBooks().then((val) => {
            setData(val.docs)
            setLoading(false)
        })
    }, [])



    const handlenext = () => {
        box.current.scrollLeft = box.current.scrollLeft + box.current.clientWidth;
    }

    const handleprev = () => {
        box.current.scrollLeft = box.current.scrollLeft - box.current.clientWidth;
    }

    return (
        <div className='books' id='books'>
            <h1 className='center'>Featured Books</h1>
            <div className="main-book-container">
                <div className="book-container" ref={box}>



                    {
                        loading ? <>
                            <Loader />
                            <Loader />
                            <Loader />
                            <Loader />
                            <Loader />
                            <Loader />
                        </>

                            :
                            data.map((e) => (<Book key={e.id} id={e.id} data={e.data()} />))

                    }

                    {/* <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book /> */}
                </div>

                <button onClick={handleprev} className='prev'><FaCircleChevronLeft /></button>
                <button onClick={handlenext} className='next'><FaChevronCircleRight /> </button>
            </div>

        </div>
    )
}
export default Books
