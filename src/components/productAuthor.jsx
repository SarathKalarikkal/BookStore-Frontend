import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../UserContext'

function ProductAuthor({author}) {

const {user} = useUser()

  return (
    <div className="col-md-6 col-lg-3">
    <div className="author-box">
      <Link to={user ? `/authors/author/${author._id}` : '/login'}>
        <div className="author-image">
              <img src={author.image} alt="" />
        </div>
        </Link>
        <div className="author-title">
            <span>{author.authorName}</span>
        </div>
    </div>
</div>
  )
}

export default ProductAuthor
