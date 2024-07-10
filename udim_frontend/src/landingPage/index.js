/** @format */

import Header from './header/Header'
import Hero from './hero/Hero'
import About from './about/About'
import CTA from './cta/CTA'
import Benefits from './benefits/Benefits'
import Feature from './features/Feature'
import Footer from './footer/Footer'
import {Helmet} from 'react-helmet'

const LandingPage = () => {
    return (
        <div>
            <Helmet>
                <title>Landing Page</title>
            </Helmet>
            <Header />
            <Hero />
            <About />
            <CTA />
            <Benefits />
            <Feature />
            <Footer />
        </div>
    )
}

export default LandingPage
