import { Typography } from '@mui/material'
import styled from 'styled-components'

export const HeadingLabel1 = styled(Typography)`
  color: yellow;
  font-size: 2rem !important;
`

export const HeadingLabel2 = styled(Typography)`
  font-size: 1rem;
`

export const OvalBox = styled.div`
  min-width: 4rem;
  height: 1.5rem;
  background-color: yellowgreen;
  border-radius: 10px;
  padding: 0.5rem;
  width: max-content;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: darkgreen;
  }
`
