import React from 'react'
import '../styles/home.css'
import MenuCards from './components/MenuCards'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'

export default function Home() {
  const navigate=useNavigate()
  return (
    <Fade>
    <div className='home_container'>
      <img id='logo' src='logo.jpg' alt='none'/>
      <img id='bg' src='bg1.png' alt='m'/>
      <div className='cards-cont'>
        <MenuCards/>
        <MenuCards/>
      </div>
      <div className='cards-cont'>
      <Button style={{marginRight:20}} label='View All Programs'/>
      <Button onClick={()=>navigate('/Programme')} label='Create Program'/>
      </div>
    </div>
    </Fade>
  )
}
