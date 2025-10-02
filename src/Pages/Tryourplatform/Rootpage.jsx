import React from 'react'
import Hero from "../Tryourplatform/Hero"
import Bespoke from "../Tryourplatform/Bespoke"
import Academy from "../Tryourplatform/Academy"
import Primary from "../Tryourplatform/Primary"
import Footer from '../../Shared/Footer'
import Header from '../../Shared/Header'

function Rootpage() {
  return (
    <div>
        <Header />
        <Hero />
        <Bespoke />
        <Academy />
        <Primary />
        <Footer />
        
    </div>
  )
}

export default Rootpage
