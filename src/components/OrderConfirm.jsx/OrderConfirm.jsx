import React from 'react'
import "./OrderConfirm.scss"
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const OrderConfirm = () => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        navigate("/")
    }
    return (
        <div className='order-confirm'>
            <div>
                <FaRegCheckCircle />
                <h1>Order Confirmed !</h1>
                <small>your order has been placed successfully.</small>
                <button onClick={handleConfirm}>Continue Shopping</button>
            </div>
        </div>
    )
}

export default OrderConfirm
