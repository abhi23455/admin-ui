import React from 'react'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignUp from '../components/Fragments/FormSignUp'

function SignUp(props) {
  const { onNavigate } = props
  return (
    <AuthLayout>
      <FormSignUp onNavigate={onNavigate} />
    </AuthLayout>
  )
}

export default SignUp