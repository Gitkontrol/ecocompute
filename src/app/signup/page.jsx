'use client'

import { useState } from 'react'
import { Box, Button, TextField, Typography, Paper, Divider } from '@mui/material'
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from "next/navigation"
import { getAuthErrorMessage } from '@/lib/auth/getErrorMsg';
import { Eye, EyeOff } from "lucide-react";


export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    
    // 1️⃣ Handle Supabase errors cleanly
    if (error) {      
        setMessage(getAuthErrorMessage(error))
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
            type={showPassword? "text":"password"}
            helperText="Minimum 8 characters"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute translate-y-9 right-[40%] text-gray-400"
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>

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
