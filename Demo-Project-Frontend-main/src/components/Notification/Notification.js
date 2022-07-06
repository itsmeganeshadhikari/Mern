import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Notification = ({ open }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        Incorrect Email or Password
      </Alert>
    </Snackbar>
  )
}

export default Notification
