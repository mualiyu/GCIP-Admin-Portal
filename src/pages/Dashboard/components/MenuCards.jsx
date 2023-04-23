import React from 'react'
import './styles/menucard.css'
import { FolderIcon } from '../../../assets/Svg/Index'

export default function MenuCards() {
  return (
    <div className='menu-card-container'>
        <span id='title'>Nepa Performance Grants Program</span>
        <div id='guide'>
            <FolderIcon/>
            <a href='none'>user guide</a>
        </div>
    </div>
  )
}
