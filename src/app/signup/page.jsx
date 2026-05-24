'use client'

import { useState } from 'react'
import { Box, Button, TextField, Typography, Paper, Divider } from '@mui/material'
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from "next/navigation"


export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  

  const handleSignup = async () => {
  if (loading) return // prevent double submit

  setLoading(true)
  setMessage('')

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/signup/success?email=${encodeURIComponent(email)}`,
      },
    })

    
    // 1️⃣ Handle Supabase errors cleanly
    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        setMessage('This email is already registered. Please sign in instead.')
      } else {
        setMessage(error.message)
      }

      // Clear any partial auth state
      await supabase.auth.signOut()
      return
    }

      if (data?.session) {
    router.push('/signup/success?type=verified')
    return
}

    // Email confirmation required
    router.push('/signup/success?type=confirm')


  } catch (err) {
    // 4️⃣ Network / fetch errors
    console.error(err)
    setMessage('Oops! Something went wrong. Please try again.')

    // Safety cleanup
    await supabase.auth.signOut()
  } finally {
    setLoading(false)
  }
}


  // const handleMagicLink = async () => {
  //   setLoading(true)
  //   setMessage('')

  //   const { error } = await supabase.auth.signInWithOtp({
  //     email,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/confirm`
  //     }
  //   })

  //   if (error) setMessage(error.message)
  //   else setMessage('Magic link sent. Check your email.')

  //   setLoading(false)
  // }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create your account
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          Sign up to continue
        </Typography>

        <img
          src='/contract.png'
          alt='cloud image'
          height={120}
          width={120} 
          className='flex mx-auto relative top-3 left-3'
        />

        <Box mt={3}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            helperText="Minimum 8 characters"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSignup}
            disabled={loading}
          >
             {loading ? 'Creating account…' : 'Create account'}
          </Button>

          {/* <Divider sx={{ my: 2 }}>OR</Divider> */}

          {/* <Button
            fullWidth
            variant="outlined"
            onClick={handleMagicLink}
            disabled={!email || loading}
          >
            Email me a magic link
          </Button> */}

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            <a href="/forgot-password">Forgot password?</a>
          </Typography>

          {message && (
            <Typography
              variant="body2"
              align="center"
              color="success.main"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  )
}
