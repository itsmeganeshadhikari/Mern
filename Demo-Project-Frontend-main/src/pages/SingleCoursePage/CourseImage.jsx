import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ImageContainer,
  ImageWrapper,
  MainImageWrapper,
  SubImageContainer,
} from './SingleCourse-Wrap'

const imageArray = [
  'https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
  'https://images.unsplash.com/photo-1571145421212-89e234a38c7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1638027610257-3495ec5ca9e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1640576905072-8181534f83ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
  'https://images.unsplash.com/photo-1639653818508-73a22946636d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
]
const CourseImage = () => {
  const [images, setImages] = useState(imageArray)
  const [currentImage, setCurrentImage] = useState(imageArray[0])

  return (
    <ImageContainer>
      <MainImageWrapper bgurl={currentImage} />
      <SubImageContainer>
        {images.map((item, index) => (
          <ImageWrapper
            key={index}
            src={item}
            alt='sub '
            className={`${item === currentImage ? 'active' : null}`}
            onClick={() => setCurrentImage(item)}
          />
        ))}
      </SubImageContainer>
    </ImageContainer>
  )
}

export default CourseImage
