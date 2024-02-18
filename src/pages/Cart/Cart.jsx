import React, { useEffect, useState } from 'react'
import "./Cart.scss"
import no_img from "../../assets/no-img.png"
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { useFirebase } from "../../context/AuthContext"
import cart from "../../assets/cart.svg"
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutLoader } from '../../components';

const Cart = () => {
    const { bookCart, setBookCart, user, Timestamp, toast, Toaster, addOrders } = useFirebase()
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        if (bookCart.length > 0) {
            const totalBill = bookCart.reduce((a, b) => a + b.quntity * Number(b.price), 0)
            setTotal(totalBill)
        }
    }, [bookCart])

    const addQnt = id => {
        const book = bookCart.find((e) => e.id === id)
        book.quntity += 1;
        localStorage.setItem("mycart", JSON.stringify([...bookCart]));
        setBookCart([...bookCart])
    }

    const subQnt = id => {
        const book = bookCart.find((e) => e.id === id)
        if (book.quntity == 1) return
        book.quntity -= 1;
        localStorage.setItem("mycart", JSON.stringify([...bookCart]));
        setBookCart([...bookCart])
    }

    const deleteFromCart = id => {
        const books = bookCart.filter((e) => e.id != id)
        localStorage.setItem("mycart", JSON.stringify(books));
        setBookCart(books)
    }

    const handleCheckOut = () => {
        setLoading(true)
        setBtnDisabled(true)
        const booksArray = bookCart.map((e) => `${e.name} (${e.quntity})`)
        const checkoutbill = {
            bill: total,
            books: booksArray,
            email: user.email,
            name: user.displayName,
            time: Timestamp.now()
                .toDate().toString(),

        }

        addOrders(checkoutbill).then((e) => {
            navigate("/confirm")
            setBookCart([])
            localStorage.removeItem("mycart")

        }).catch((e) => {
            toast.error("Something wents wrong")
        }).finally(() => {
            setLoading(false)
            setBtnDisabled(false)

        })
    }

    if (loading) {
        return <CheckoutLoader />
    }

    return (
        <>
            <Toaster />

            {
                !bookCart.length > 0 ?
                    <div className='empty-cart'>
                        <div>
                            <img src={cart} alt="" />
                            <h2 className="center">Cart is empty</h2>
                            <div className="center">

                                <Link to={"/"}>Buy Something</Link>
                            </div>
                        </div>
                    </div> :
                    <div className='cart'>
                        <div className="heading grid">
                            <div></div>
                            <div>name</div>
                            <div>Quntity</div>
                            <div>remove</div>
                            <div>price</div>
                        </div>

                        {
                            bookCart.map((e) => {
                                return (
                                    <div className="data grid">
                                        <div>
                                            <img src={e.image || no_img} alt="" />
                                        </div>
                                        <div className='book-info'>
                                            <h3>{e.name}</h3>
                                            <small>{e.author}</small>
                                        </div>
                                        <div className='qnt'>
                                            <button onClick={() => addQnt(e.id)}><FaPlus /></button>
                                            <span>{e.quntity}</span>
                                            <button onClick={() => subQnt(e.id)}><TiMinus /></button>
                                        </div>
                                        <div className='delete' onClick={() => deleteFromCart(e.id)}><RxCross1 /></div>
                                        <div>Rs.{e.price}</div>
                                    </div>
                                )
                            })
                        }

                        <div className="bill">
                            <div>
                                <span>Discount</span>
                                <h4>Rs.50</h4>
                            </div>
                            <div>
                                <span>total</span>
                                <h4>Rs.{total - 50}</h4>
                            </div>
                        </div>

                        <div className="buy"><button disabled={btnDisabled} onClick={handleCheckOut}>Check Out</button></div>


                    </div>
            }
        </>

    )
}

export default Cart
