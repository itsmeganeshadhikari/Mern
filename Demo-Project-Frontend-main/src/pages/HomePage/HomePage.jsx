import React from 'react'
import { useDispatch } from 'react-redux'

import Aside from '../../components/Aside/Aside'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import MainContainer from '../../components/MainContainer/MainContainer'
import { $axios } from '../../lib/axios'
import { HomeWrapper } from './HomePage_Wrap'

const HomePage = () => {
  return (
    <HomeWrapper>
      <Header />

      <Aside></Aside>
      <MainContainer />
      <Footer />
    </HomeWrapper>
  )
}

export default HomePage
