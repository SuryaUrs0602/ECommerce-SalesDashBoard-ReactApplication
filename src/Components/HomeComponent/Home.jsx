import React from 'react'
import MainContent from './MainContent'
import Service from '../ServiceComponent/Service'
import TrustedPartners from '../ServiceComponent/TrustedPartners'

const Home = () => {

    const data = {
        name: "Cart Craze"
    }

  return (
    <div>
        <MainContent myData={data} />
        <Service />
        <TrustedPartners />
    </div>
  )
}

export default Home
