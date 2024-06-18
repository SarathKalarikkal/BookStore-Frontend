import React, { useEffect } from 'react'
import { Link,  useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { UserProvider } from '../UserContext';
import { useProduct } from '../productContext';
import Product from '../components/product';
import BASE_URL from '../config';


export async function loader({ params }) {
  const response = await fetch(`${BASE_URL}/books/book/${params.id}`);
  const book = await response.json();
  console.log("The single book", book);

  const limit = 8; // Adjusted to fetch 8 books to split into two groups

  const bookResponse = await fetch(`${BASE_URL}/books?limit=${limit}`);
  const books = await bookResponse.json();
  return { book, books };
}


function Book() {

  const {book, books} = useLoaderData()
  const {addToCart} = useProduct()

  const handleCart= ()=>{
    addToCart(book)
  }

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

const Navigate  = useNavigate()


const chunkedBooks = [];
for (let i = 0; i < books.length; i += 4) {
    chunkedBooks.push(books.slice(i, i + 4));
}

  return (
    <main>
        <div className="single-product-wrapper">
             <div className="container">
                 <div className="row">
                     <div className="col-lg-6">
                     <div className="single-product-img">
                        <img src={book.image} alt="" />
                     </div>
                     </div>
                     <div className="col-lg-6">
                         <div className="single-product-content">
                             <h2>{book.bookName}</h2>
                             <h5>{book.author}</h5>
                             <p>{book.description}</p>
                             <span className='price'>₹ {book.price}</span>
                             <Link to={'#'}>
                               <button onClick={handleCart}>Add to cart</button>
                             </Link>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
        <div className="similar-products">
           <div className="container">
            <div className="row">
               <div className="similar-heading">
                  <h3 className='text-center mb-5'>Similar Books</h3>
               </div>
            </div>
            <div className="row">
            <div id="carouselBooks" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselBooks" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselBooks" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                {chunkedBooks.map((bookGroup, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="row">
                                            {bookGroup.map((book) => (
                                                
                                                    <Product book={book} key={book._id} />
                                                
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselBooks" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
    
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselBooks" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                            </button>
                        </div>
            </div>
           </div>
        </div>
    </main>
  )
}

export default Book