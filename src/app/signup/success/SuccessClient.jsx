'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Box, Button, Typography, Paper } from '@mui/material'
import Image from 'next/image'


export default function SignupSuccessPage() {
  const params = useSearchParams()
  const router = useRouter()

  const type = params.get('type') // "verified" | "confirm"

  const isVerified = type === 'verified'

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%', textAlign: 'center' }} className='space-y-3'>        
        <Typography variant="h5" gutterBottom>
          {isVerified ? 'Account Created!' : (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            Confirm your email            
          </span>)}
          <img 
              src='/delivered.png' 
              alt='delivered' 
              height={120} 
              width={120}
              className='relative left-32'
            />
        </Typography>
        {isVerified ? <img
          src='/verified48.png'
          alt='correct'
          height={70}
          width={70}
          className='flex mx-auto'
        /> : ''}
        

        <Typography variant="body1" sx={{ mb: 3 }}>
          {isVerified
            ? 'Your account has been successfully created. You can now access your dashboard.'
            : 'We’ve sent a confirmation link to your email. Please confirm your account to continue.'}
        </Typography>
        
        
  {!isVerified && (
  <Typography
    variant="body2"
    sx={{
      color: 'text.secondary',
      backgroundColor: 'rgba(0,0,0,0.03)',
      px: 2,
      py: 1.5,
      borderRadius: 1,
    }}
  >
    You can explore the platform without confirming your email, but you’ll be required to verify your account before completing any purchase.
  </Typography>
)}

        {isVerified && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard
          </Button>
        )}
        <div className='pt-10'/>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.push('/')}
          className='hover:bg-blue-600 hover:text-white'
        >
          Back to Homepage
        </Button>
      </Paper>
    </Box>
  )
}
