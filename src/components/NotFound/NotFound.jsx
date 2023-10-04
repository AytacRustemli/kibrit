import React from 'react'
import { Link } from 'react-router-dom'
import './notFound.scss'

const NotFound = () => {
  return (
    <div id="notfound">
        <div className="container">
            <div className="text">
                <h1>404</h1>
                <h2>Belə bir səhifə mövcud deyil.</h2>
                <button>
                    <Link to='/' style={{textDecoration: "none"}}>Ana səhifəyə qayıt.</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default NotFound