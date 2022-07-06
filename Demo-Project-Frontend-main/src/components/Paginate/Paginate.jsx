import React from 'react'
import { useDispatch } from 'react-redux'
import { PaginateWrapper, PaginationContainer } from './PaginateWrap'
import { changePageNumber } from '../../redux/slices/courseSlice'

const Paginate = () => {
  const dispatch = useDispatch()
  const handleChange = (event, page) => {
    dispatch(changePageNumber(page))
  }

  return (
    <PaginationContainer>
      <PaginateWrapper
        count={10}
        shape='rounded'
        variant='outlined'
        spacing={4}
        color='primary'
        onChange={handleChange}
      />
    </PaginationContainer>
  )
}

export default Paginate
