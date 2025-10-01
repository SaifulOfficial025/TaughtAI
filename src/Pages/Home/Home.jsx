import Container from "../../Layout/Container/Container"
import Footer from "../../Shared/Footer"
import Header from "../../Shared/Header"
import Approach from "./Approach"
import Blog from "./Blog"
import FAQ from "./FAQ"
import GetInTouch from "./GetInTouch"
import Hero from "./Hero"
import OurEthos42 from "./OurEthos42"
import Transform from "./Transform"

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <OurEthos42 />
      <Approach />
      <Transform />
      <Blog />
      <FAQ />
      <GetInTouch />
      <div className="mt-52">
      <Footer />
      </div>
    </div>
  )
}

export default Home
