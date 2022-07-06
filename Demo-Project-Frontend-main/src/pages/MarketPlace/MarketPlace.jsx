import React, { useState } from 'react'

import { $axios } from '../../lib/axios'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import {
  CategoryWrapper,
  MarketWrapper,
  PaginateWrapper,
  PaginationContainer,
} from './MarketPlace-Wrap'
import { useDispatch, useSelector } from 'react-redux'
import { addAllCategories } from '../../redux/slices/categorySlice'
import { OvalBox } from '../../components/styled'
import { categoryCourseFetcher } from '../../services'
import Paginate from '../../components/Paginate/Paginate'

const MarketPlace = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.category)
  const { pageNumber } = useSelector((state) => state.course)
  const dataFetcher = async () => {
    try {
      setLoading(true)
      const response = await $axios.get(
        `/courses/all?skip=${(pageNumber - 1) * 20}&limit=20`
      )
      setCourses(response.data.courses)
    } catch (error) {
      setIsError(true)
      setErrorMessage('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await $axios.get('/category')
      const categoryList = categories.map((item) => item.name)
      dispatch(addAllCategories(categoryList))
    } catch (error) {
      setErrorMessage('Something went wrong')
    }
  }

  React.useEffect(() => {
    fetchCategories()
    dataFetcher()
  }, [pageNumber])

  const categoryHandler = async (item) => {
    try {
      setLoading(true)
      const response = await categoryCourseFetcher(item)
      setCourses(response.data.courses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setIsError(true)
      setErrorMessage('Something went wrong')
    }
  }
  return (
    <div>
      <Header />
      {loading && <CircularProgress />}

      <CategoryWrapper>
        {categories.map((item, index) => {
          return (
            <OvalBox key={index} onClick={() => categoryHandler(item)}>
              {item}
            </OvalBox>
          )
        })}
      </CategoryWrapper>
      <MarketWrapper>
        {!loading && isError && <p>{errorMessage}</p>}
        {!loading &&
          !isError &&
          courses &&
          courses.map((course) => {
            const card = (
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color='text.secondary'
                    gutterBottom
                  >
                    {course?.courseCategory[0]?.name.toUpperCase()}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    {course?.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {course?.availability?.from}-{course?.availability?.to}
                  </Typography>
                  <Typography variant='body2'>{course?.description}</Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/course/${course?._id}`} className='link'>
                    See More
                  </Link>
                </CardActions>
              </React.Fragment>
            )
            return (
              <Box sx={{ width: 400 }} key={course?._id} className='card-box'>
                <Card variant='outlined'>{card}</Card>
              </Box>
            )
          })}
      </MarketWrapper>

      <Paginate />

      <Footer />
    </div>
  )
}

export default MarketPlace
