import { Card, CardMedia, Popover, Typography } from '@mui/material'
import styled from 'styled-components'

export const BetterCard = styled(Card)`
  border: 1px solid green;
  width: 30%;
  max-height: 20%;
`
export const DeleteConfirmationWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const BetterTypography = styled(Typography)`
  padding: 1rem;
`
export const ClickableCardMedia = styled(CardMedia)`
  &:hover {
    cursor: pointer;
  }
`

export const StatusWrapper = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  font-size: 05rem;
  color: green;
  padding: 1rem;
`
