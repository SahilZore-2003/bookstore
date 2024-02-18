import React from 'react'
import "./Home.scss"
import { About, Header, Services, Books, Arrivals, Banner, Sidebar } from '../../components'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <Services />
      <About />
      <Books />
      <Arrivals />
      <Banner />
    </div>
  )
}

export default Home
