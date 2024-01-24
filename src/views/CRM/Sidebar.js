import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <section className='sidebar_section'>
      <h2>Movie Mania</h2>
      <ul>
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/movie-list">Movie</NavLink></li>
        <li><NavLink to="/booking">Booking</NavLink></li>
      </ul>
    </section>
  )
}

export default Sidebar