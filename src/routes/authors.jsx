import React, { useEffect } from 'react'
import ProductAuthor from '../components/productAuthor'
import { useLoaderData, useLocation } from 'react-router-dom';
import { apiFetch } from '../api';



export async function loader() {
  const authors = await apiFetch("/authors")
  // const authors = await authorResponse.json()
  
  return { authors };
}

function Authors() {

const {authors}  = useLoaderData()

const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main>
      <section className='author-page-banner'>
        <h2>Authors</h2>
        <p>Explore the minds behind your favorite books and their inspirations, and their latest works.</p>
      </section>

        <section className='books-wrapper-sec'>
          <div className="container">
            <div className="all-books-sec">
              <div className="row">
                 {
                  authors.map((author)=>{
                    return(
                      <ProductAuthor key={author._id} author={author} />
                    )
                  })
                 }
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}

export default Authors