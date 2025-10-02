import React from 'react'
import Header from '../../Shared/Header'
import Footer from '../../Shared/Footer'
import Hero from './Hero'
import TrainingCPD from './TrainingCPD'
import CustomAITools from './CustomAITools'
import Bespoke from './Bespoke'

function Rootpage() {
  return (
    <div>
        <Header />
      <Hero />
      <TrainingCPD />
      <CustomAITools />
      <Bespoke />
        <Footer />
    </div>
  )
}

export default Rootpage
