import { useState } from 'react'
import { Button } from 'react-bootstrap'

//Components
import MyNavbar from './Components/Navbar';
//pages
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import ListingPage from './Pages/List';
import HomePage from './Pages/Home';
import BookDetail from './Pages/Detail';
import OrderPage from './Pages/ViewOrders';
import ViewOrderDetails from './Pages/ViewOrderDetail';
//css
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import {Routes , Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MyNavbar/>
    <Routes>
    <Route path="/" element ={<HomePage/>}/> 
    <Route path="/login" element ={<LoginPage/>}/>
    <Route path="/register" element ={<RegisterPage/>}/>
    <Route path="/book/list" element ={<ListingPage/>}/>
    <Route path="/book/view/:bookId" element ={<BookDetail/>}/>
    <Route path="/book/orders" element ={<OrderPage/>}/>
    <Route path="/books/orders/:Id" element ={<ViewOrderDetails/>}/>
    </Routes>
    </>
  )
}

export default App
