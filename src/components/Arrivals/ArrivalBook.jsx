import React, { useState, useEffect } from 'react'
import no_img from "../../assets/no-img.png"
import { FaStar } from "react-icons/fa";
import { useFirebase } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
const ArrivalBook = ({ data, id }) => {
  const { name, author, genres, price, image } = data;
  const [url, setUrl] = useState(null)
  const { getImageUrl } = useFirebase()
  const navigate = useNavigate("")
  useEffect(() => {
    getImageUrl(image).then((e) => setUrl(e))
  }, [])
  return (
    <div className='arrival-book' onClick={() =>{
      navigate(`/bookdetail/${id}`);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      }}>
      <div className='img-con'>
        <img src={url || no_img} alt="" />
      </div>
      <h3>{name}</h3>
      <div className="rating">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </div>
  )
}

export default ArrivalBook
