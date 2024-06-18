import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../UserContext'

function Product({book}) {

 const {user} = useUser()

  return (
    <div className="col-md-6 col-lg-3">
                    <div className="product-card">
                        <Link to={user ? (`/books/book/${book._id}`) : '/login'}>
                        <div className="product-image">
                            <img src={book.image} alt="" />
                        </div>
                        </Link>
                        <div className="product-details">
                            <h5 className="product-title">{book.bookName}</h5>
                            <div className="auth-price">
                               <span className="product-author">{book.author}</span>
                               <span className="product-price">₹ {book.price}</span>
                            </div>
                        </div>
                       
                    </div>
     </div>
  )
}

export default Product
