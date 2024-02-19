import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Cart from "./pages/Cart/Cart"
import { Navbar, Footer, AddBook, BookDetail, OrderConfirm } from "./components"
import Orders from "./pages/Orders/Orders"


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/bookdetail/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirm" element={<OrderConfirm />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
