"use client"
import FooterLink from '@/components/FooterLink'
import InputField from '@/components/InputField'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'  

const SignIn = () => {

   const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: '',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    }, mode: 'onBlur',
  })
  
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1 className='form-title'>Log In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-2'>
        <InputField 
          name="email" 
          label="Email" 
          placeholder="Enter your email"
          register={register} 
          error={errors.email}
          validation={{ required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address' } }}
        />
        <InputField 
          name="password" 
          label="Password" 
          placeholder="Enter your password"
          type='password'
          register={register} 
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 6 }}
        />

        
        <button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />

      </form>

    </div>
  )
}

export default SignIn