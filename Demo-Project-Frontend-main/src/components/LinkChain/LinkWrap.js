import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LinkWrapper = styled.div`
  min-height: 50px;
  background: grey;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .separator {
    color: black;
    font-size: 2rem;
  }
  gap: 1rem;
  font-size: 2rem;
  color: white;
  padding: 1rem;

  &:last-child {
    color: black;
  }
`

export const BetterLink = styled(Link)`
  text-decoration: none;
  color: white;
`
