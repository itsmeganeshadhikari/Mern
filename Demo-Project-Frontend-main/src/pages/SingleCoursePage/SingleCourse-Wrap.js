import { Button } from '@mui/material'
import styled from 'styled-components'

export const SingleCourseWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-rows: minmax(auto, auto);
  padding: 1rem;
  margin: 1rem 0;
`

export const ImageContainer = styled.div`
  display: 'flex';
  flex-direction: column;

  .active {
    outline: 2px solid #bf131c;
  }
  &:hover {
    cursor: pointer;
  }
`

export const MainImageWrapper = styled(({ bgurl, ...otherProps }) => (
  <div {...otherProps} />
))`
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgurl});
`

export const SubImageContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const ImageWrapper = styled.img`
  width: 18%;
  height: 100px;
  padding: 0.2rem;
`

export const CourseContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 2rem;
`

export const BetterButton = styled(Button)`
  margin: 0 auto;
  font-size: 2rem !important;
  color: white !important;
  padding: 1rem;
`

export const BetterBox = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #626262;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 3rem 0;
`

export const DescriptionWrapper = styled.div`
  color: #626262;
  line-height: 1.5;
  width: 90%;
  text-align: justify;
`

export const TitleWrapper = styled.h1`
  font-size: 3rem;
  color: blue;
  text-transform: capitalize;
`
