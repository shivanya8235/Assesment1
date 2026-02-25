import React from 'react'
import Navbar from '../components/Navbar'
import FlowBuilder from '../components/FlowBuilder'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <div>
        <FlowBuilder/>
      </div>
    </div>
  )
}

export default HomePage