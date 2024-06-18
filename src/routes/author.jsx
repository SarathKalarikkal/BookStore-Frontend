import React, { useEffect } from 'react'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import ProductAuthor from '../components/productAuthor';
import BASE_URL from '../config';


export async function loader({ params }) {
   const response = await fetch(`${BASE_URL}/authors/author/${params.id}`);
   const author = await response.json();
   console.log("The single author", author);


   let limit = 8
   const authorResponse = await fetch(`${BASE_URL}/authors?limit=${limit}`);
    const authors = await authorResponse.json();

   return { author,authors };
 }


function Author() {

   const {author, authors} = useLoaderData()

   const location = useLocation();

   useEffect(() => {
      // Scroll to the top of the page whenever the location changes
      window.scrollTo(0, 0);
    }, [location]);
   
   const Navigate = useNavigate()

   const chunkedAuthors = [];
   for (let i = 0; i < authors.length; i += 4) {
       chunkedAuthors.push(authors.slice(i, i + 4));
   }

  return (
    <main>
        <div className="author-wrapper">
           <div className="container">
              <div className="row">
                 <div className="col-lg-6">
                    <div className="authur-img">
                        <img src={author.image} alt="" />
                    </div>
                 </div>
                 <div className="col-lg-6">
                    <div className="author-content">
                        <h2>{author.authorName}</h2>
                        <p>{author.description}</p>
                        <div className='mt-4'>
                        <h5>Books Written</h5>
                        <ul>
                           {
                              author.booksWritten.map((book)=>{
                                 return (
                                    <li>{book}</li>
                                 )
                              })
                           }
                        </ul>
                        </div>
                        <Link className='readmore'>Read More</Link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div className="similar-products">
           <div className="container">
            <div className="row">
               <div className="similar-heading">
                  <h3 className='text-center mb-5'>Similar Authors</h3>
               </div>
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
        </div>
    </main>
  )
}

export default Author