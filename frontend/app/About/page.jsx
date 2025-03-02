import Fotter from '@/components/Fotter'
import Header from "../../components/ui/About/Header.jsx"
import AboutUs from '../../components/ui/About/AboutUs.jsx'
import OurStory from '../../components/ui/About/OurStory.jsx'
import Aprosal from '../../components/ui/About/Aprosal.jsx'
import Mission from '../../components/ui/About/Mission.jsx'
import Head from 'next/head'
import React from 'react'

const About = () => {
  return (
    <div className='mx-4 md:mx-10'>
        
        <Header />
        <AboutUs />
        <Mission />
        <OurStory />
        <Aprosal />
        <Fotter />
        
    </div>
  )
}

export default About