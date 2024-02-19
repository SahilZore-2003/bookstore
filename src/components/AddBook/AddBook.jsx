import React, { useRef, useState } from 'react'
import "./AddBook.scss"
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import Select from "multiselect-react-dropdown"
import { useFirebase } from "../../context/AuthContext"


const AddBook = () => {
    const { toast, Toaster, addNewBook } = useFirebase()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [bookurl, setBookUrl] = useState("")
    const [disabled, setDisabled] = useState(false)


    const handleChange = (selectedList) => {
        setSelectedGenres(selectedList)
    }
    const handleRemove = (selectedList) => {
        setSelectedGenres(selectedList)
    }

    const handleAddBook = () => {

        if (name == "" || price == "" || author == "" || !selectedGenres.length > 0) return toast.error("please fill all information.")
        const bookdata = { name, price: Number(price), image, author, genres: selectedGenres }
        console.log(bookdata)

        setDisabled(true)

        addNewBook(name, author, price, image[0], selectedGenres).then(() => {
            toast.success("book added successfully!")
            setName("")
            setPrice("")
            setAuthor("")
            setSelectedGenres([])
            setBookUrl("")
            setImage([])
        }).catch((e) => {
            toast.error("Something wents wrong!")
        }).finally(() => {
            setDisabled(false)
        })
    }

    const handleFile = (e) => {
        setImage([e.target.files[0]])

        var reader = new FileReader();
        reader.onload = function (e) {
            setBookUrl(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const file_input = useRef(null)

    return (
        <div className='addbook'>
            <Toaster />
            <div className='form'>
                <div className={image.length > 0 ? "book-image upload" : "book-image"}>
                    <input type="file" accept='image/*' name="" onChange={handleFile} ref={file_input} hidden />
                    <RiUploadCloud2Fill />
                    <p>Choose a file or drag and drop here.</p>
                    <small>JPEG PNG formats upto 50MB</small>
                    <button onClick={() => file_input.current.click()}>Browse File</button>


                    {
                        image.length > 0 && (
                            <div className="upload-book-info">
                                <div className='left'>
                                    <img src={bookurl} alt="" />
                                    <div>
                                        <h4>{image[0].name.slice(0, 15)}</h4>

                                        <small>{(image[0].size / 1000).toFixed(1)}kb.</small>
                                    </div>
                                </div>

                                <div>
                                    <TiTick />
                                </div>

                            </div>
                        )
                    }


                </div>

                <div className="input-group">
                    <label htmlFor="">Book Name</label> <br />
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="">Author name</label> <br />
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} name="author" id="" />
                </div>
                <div className="input-group">
                    <label htmlFor="">Price</label> <br />
                    <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>


                <div className="input-group">
                    <label htmlFor="">Select Genres</label>
                    <Select
                        isObject={false}
                        placeholder={""}
                        onSelect={handleChange}
                        onRemove={handleRemove}
                        options={[
                            'Drama',
                            'Comedy',
                            'Thriller',
                            'Action',
                            'Love'
                        ]}
                    />
                </div>

                <div className="center">
                    <button onClick={handleAddBook} disabled={disabled}>Add Book</button>
                </div>
            </div>

        </div>
    )
}

export default AddBook
