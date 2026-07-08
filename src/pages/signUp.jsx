import React, { useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignUp from '../components/Fragments/FormSignUp'
import AppSnackbar from '../components/Elements/AppSnackbar'
import { registerService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {
  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleSubmit = async (values) => {
    try {
      await registerService(values.fullname, values.email, values.password)
      setSnackbar({
        open: true,
        message: 'Registrasi Berhasil',
        severity: 'success'
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.msg || 'Email sudah pernah digunakan sebelumnya',
        severity: 'error'
      })
    }
  }

  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleSubmit} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default SignUp