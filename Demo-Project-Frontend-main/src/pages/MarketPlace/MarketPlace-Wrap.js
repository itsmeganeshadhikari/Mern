import { Pagination } from '@mui/material'
import styled from 'styled-components'

export const MarketWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;

  .card-box {
    padding: 1rem;
  }
  @media (max-width: 500) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
  }
`

export const CourseNotFoundWrapper = styled.div`
  min-height: 50vh;
  /* This is not working */
  img {
    align-self: center;
  }
`

// TODO:Ask nabin dai about pagination

export const CategoryWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  text-transform: uppercase;
  gap: 1rem;
`
