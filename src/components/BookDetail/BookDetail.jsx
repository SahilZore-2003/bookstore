import React, { useState, useEffect } from 'react'
import "./BookDetail.scss"
import no_img from "../../assets/no-img.png"
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { BookLoader } from "../../components"
import { useFirebase } from '../../context/AuthContext';
const BookDetail = () => {
    const [book, setBook] = useState([])
    const [imgurl, setImgurl] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { getBookById, getImageUrl, bookCart, setBookCart } = useFirebase()


    useEffect(() => {
        setLoading(true)
        getBookById(id).then((e) => {
            setBook(e.data())
            setLoading(false)
            getImageUrl(e.data().image).then((e) => setImgurl(e))
        })
    }, [])

    const addToCart = (e) => {
        e.target.disabled = true;
        e.target.innerText = "Added"
        setBookCart([...bookCart, { ...book, quntity: 1, id: id, image: imgurl }])
    }




    return (
        <>
            {
                loading ? <BookLoader /> :
                    <div className='book-detail'>

                        <div className="left">
                            <img src={imgurl || no_img} alt="" />
                        </div>
                        <div className="right">
                            <h2>{book.name}</h2>
                            <small>{book.author}</small>
                            <div className="rating">
                                <FaStar className="gold" />
                                <FaStar className="gold" />
                                <FaStar className="gold" />
                                <CiStar className='gray' />
                                <CiStar className='gray' />
                            </div>
                            <div className="desc">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates eligendi quibusdam non iusto tenetur, perferendis beatae culpa molestiae ea quae!
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>price</th>
                                        <td className='price'>{book.price} rs</td>
                                    </tr>
                                    <tr>
                                        <th>genres</th>
                                        <td className='genres'>
                                            {
                                                book?.genres?.map((e, i) => (<span key={i}>{e}</span>))
                                            }
                                        </td>
                                    </tr>

                                </tbody>

                            </table>
                            <button onClick={(e) => addToCart(e)}>Add to cart</button>
                        </div>
                    </div>
            }
        </>

    )
}

export default BookDetail
