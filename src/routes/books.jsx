import React, { useState, useEffect } from 'react';

import { useLoaderData, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Product from '../components/product';
import { apiFetch } from '../api';
import BASE_URL from '../config';

export async function loader() {
  const books = await apiFetch("/books");
  // const books = await bookResponse.json();
  return { books };
}

function Books() {

  const initialData = useLoaderData();
  const [sortOrder, setSortOrder] = useState('');
  const [books, setBooks] = useState(initialData.books);

  const fetchBooks = async (sortOrder) => {
    let url = `${BASE_URL}/books`;
    if (sortOrder) {
      url += `?sort=${sortOrder}`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
    }
  };

  useEffect(() => {
    fetchBooks(sortOrder);
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main>
      <section className='books-page-banner'>
        <h2>Books</h2>
        <p> Dive into our collection to find your next great read.</p>
      </section>

      <section className='books-wrapper-sec'>
        <div className="container">
          <div className="book-header">
            <h4>Browse all the available books</h4>
            <select name="Filter" id="filter" onChange={handleSortChange}>
              <option value="">Sort By</option>
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
            </select>
          </div>
          <div className="all-books-sec">
            <div className="row">
              {books.map((book) => (
                <Product key={book._id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Books;
