import React from 'react'
import News from './News'
import { Link } from "react-router-dom";

function About(props) {
  return (
    <div>
      <div className="container">
      <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Science
                </Link>
              </li>
            </ul>
      </div>
        <News  category="science" pageSize= {30} mode ={props.mode}/>
    </div>
  )
}

export default About