import React from 'react'
import Hero from '../About/Hero'
import Header from '../../Shared/Header'
import Footer from '../../Shared/Footer'
import OwnerDetails from '../About/OwnerDetails'
import Discovered from '../About/Discovered'
import Help from '../About/Help'

function RootPage() {
  return (
    <div>
        <Header />
        <Hero />
        <OwnerDetails />
        <Discovered />
        <Help/>
        <Footer />

    </div>
  )
}

export default RootPage
