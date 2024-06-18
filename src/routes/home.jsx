import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import Product from '../components/product'
import Author from '../components/productAuthor'
import ProductAuthor from '../components/productAuthor';
import BASE_URL from '../config';


export async function loader() {
    const limit = 8; // Adjusted to fetch 8 books to split into two groups

    const bookResponse = await fetch(`${BASE_URL}/books?limit=${limit}`);
    const books = await bookResponse.json();

    const authorResponse = await fetch(`${BASE_URL}/authors?limit=${limit}`);
    const authors = await authorResponse.json();
   
    return { books, authors };
}

function Home() {
    const { books, authors } = useLoaderData();

    const [subEmail, setSubEmail] = useState('');
    const [popup, setPopup] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubscribtion = (e) => {
        e.preventDefault();
        const userName = subEmail.split('@')[0];
        setPopup(userName);
        setShowPopup(true);
        setSubEmail('');
    };

    // Split books array into groups of 4
    const chunkedBooks = [];
    for (let i = 0; i < books.length; i += 4) {
        chunkedBooks.push(books.slice(i, i + 4));
    }
    // Split authors array into groups of 4
    const chunkedAuthors = [];
    for (let i = 0; i < authors.length; i += 4) {
        chunkedAuthors.push(authors.slice(i, i + 4));
    }

    const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

    return (
        <>
            <section className='hero-banner'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h1>Explore Your Next Great Read</h1>
                            <p>Dive into a vast collection of stories across all genres, handpicked to cater to every reader's delight</p>
                            <div className="hero-btns">
                                <Link to={'/books'} className='hero-btn-1'>
                                    Buy Now
                                </Link>
                                <Link to={'/books'} className='hero-btn-2'>
                                    Explore
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='features-sec'>
                <div className="container">
                    <div className="feature">
                        <div className="feature-box">
                            <i className="bi bi-tags-fill"></i>
                            <span>Best price</span>
                        </div>
                        <div className="feature-box">
                            <i className="bi bi-archive-fill"></i>
                            <span>Get great deals</span>
                        </div>
                        <div className="feature-box">
                            <i className="bi bi-truck"></i>
                            <span>Free delivery</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='popular-books'>
                <div className="container">
                    <div className="popular-header">
                        <h2>Popular Books</h2>
                        <p>Explore a curated selection of popular books spanning various genres and captivating narratives</p>
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
            </section>

            <section className='popular-authors'>
                <div className="container">
                    <div className="popular-header">
                        <h2>Popular Authors</h2>
                        <p>Discover the minds behind your favorite stories by exploring works from renowned authors.</p>
                    </div>
                    
                    <div className="row">
                        <div id="carouselAuthors" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselAuthors" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselAuthors" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                {chunkedAuthors.map((authorGroup, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="row">
                                            {authorGroup.map((author) => (
                                                
                                                    <ProductAuthor author={author} key={author._id}/>
                                               
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselAuthors" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselAuthors" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='newsletter'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="news-letter-box">
                                <h2>Stay Updated with Our Latest News</h2>
                                <p>Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and special events.</p>
                                <div className="news-inp">
                                    <form onSubmit={handleSubscribtion}>
                                        <input
                                            type="email"
                                            placeholder='Enter your email address'
                                            value={subEmail}
                                            onChange={(e) => setSubEmail(e.target.value)}
                                            required
                                        />
                                        <button type='submit' data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showPopup && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowPopup(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                Thank you for subscribing, <span className="popup-name">{popup}!</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            
        </>
    );
}

export default Home;
