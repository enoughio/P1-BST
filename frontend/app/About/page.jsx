import Header from '@/components/ui/About/Header.jsx' 
import AboutUs from '@/components/ui/About/AboutUs.jsx'
import OurStory from '@/components/ui/About/OurStory.jsx'
  import Mission from '@/components/ui/About/Mission'
import React from 'react'
import StorytellingCommunitySection from '@/components/ui/About/Aprosal.jsx'

// TODO: there is an hydration error in this page that needs to be fixed 

const About = () => {
  return (
    <div className='mx-4 md:mx-10'>
        
        {/* <Header /> */}
        <AboutUs />
        <Mission />
        <OurStory />
        <StorytellingCommunitySection />
        
    </div>
  )
}

export default About