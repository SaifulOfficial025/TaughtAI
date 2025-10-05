import React from 'react'
import Header from '../../Shared/Header'
import Footer from '../../Shared/Footer'
import Hero from './Hero'
import AllPost from './AllPost'

function RootPage() {
  return (
    <div>
        <Header />
        <Hero />
        <AllPost />
        <Footer />
    </div>
  )
}

export default RootPage
