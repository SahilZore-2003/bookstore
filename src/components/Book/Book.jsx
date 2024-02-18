import React, { useState, useEffect } from 'react'
import "./Book.scss"
import no_img from "../../assets/no-img.png"
import { useFirebase } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
const Book = ({ data, id }) => {
  const { name, author, genres, price, image } = data;
  const [url, setUrl] = useState(null)
  const { getImageUrl } = useFirebase()
  const navigate = useNavigate()
  useEffect(() => {
    getImageUrl(image).then((e) => setUrl(e))
  }, [])

  const addTocart = (e) => {
    e.target.disabled = true
  }

  return (
    <div className='book' onClick={() => {
      navigate(`/bookdetail/${id}`);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

    }}>
      <img src={url || no_img} alt="" />
      <h3>{name}</h3>
      <small>{author}</small>
      <div className="genres">
        {
          genres?.map((e, i) => (<small key={i}>{e}{i == genres.length - 1 ? "" : " ,"}</small>))
        }
      </div>
      <div className="price">
        <b>Rs. {price}.00</b>
      </div>
    </div>
  )
}

export default Book
