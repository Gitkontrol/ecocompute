// 'use client'

// import { useSearchParams, useRouter } from 'next/navigation'
// import { Box, Button, Typography, Paper } from '@mui/material'
// import ResendEmail from '@/components/auth/ResendEmail'


// export default function SignupSuccessPage() {
//   const params = useSearchParams()
//   const router = useRouter()

//   const type = params.get('type') // "verified" | "confirm"

//   const isVerified = type === 'verified'

//   return (
//     <Box
//       minHeight="80vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       px={2}
//     >
//       <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%', textAlign: 'center' }} className='space-y-3'>        
//         <Typography variant="h5" gutterBottom>
//           {isVerified ? 'Account Created!' : (
//           <span style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '8px'
//           }}>
//             Check your email            
//           </span>)}
//           <img 
//               src='/delivered.png' 
//               alt='delivered' 
//               height={120} 
//               width={120}
//               className='relative left-32'
//             />
//         </Typography>
//         {isVerified ? <img
//           src='/verified48.png'
//           alt='correct'
//           height={70}
//           width={70}
//           className='flex mx-auto'
//         /> : ''}
        

//         <Typography variant="body1" sx={{ mb: 3 }}>
//           {isVerified
//             ? 'Your account has been successfully created. You can now access your dashboard.'
//             : 'We’ve sent a confirmation link to your email. Please confirm your account to continue.'}
//         </Typography>
        
        
//         {!isVerified && (
//           <Typography
//             variant="body2"
//             sx={{
//               color: 'text.secondary',
//               backgroundColor: 'rgba(0,0,0,0.03)',
//               px: 2,
//               py: 1.5,
//               borderRadius: 1,
//             }}
//           >
//             You can explore the platform without confirming your email, but you’ll be required to verify your account before completing any purchase.
//           </Typography>
//         )}
//             <div className='grid'>
//               {isVerified && (
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ mb: 2 }}
//                   onClick={() => router.push('/dashboard')}
//                 >
//                   Go to Dashboard
//                 </Button>
//               )}
//               <div className='pt-10'/>

//               <Button
//                 variant="outlined"
                
//                 onClick={() => router.push('/')}
//                 className='hover:bg-blue-600 hover:text-white'
//               >
//                 Back to Homepage
//               </Button>
//               <ResendEmail />
//             </div>
//       </Paper>
//     </Box>
//   )
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button,  Typography,  Paper,  CircularProgress, } from '@mui/material';
import { supabase } from '@/lib/supabaseClient'

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  useEffect(() => {
  const paramEmail = searchParams.get('email');
  const storedEmail = localStorage.getItem('signup_email');

  const finalEmail = paramEmail || storedEmail || '';

  if (finalEmail) {
    setEmail(finalEmail);

    // keep it updated in storage
    localStorage.setItem('signup_email', finalEmail);
  }
}, [searchParams]);


  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cooldown, setCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔍 Initial session check
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();
  }, []);

  // 🔥 Real-time auth listener (replaces polling)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setSession(session);

        // small delay for smoother UX
        setTimeout(() => {
          router.push('/');
        }, 1200);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // 🚀 Redirect if already verified
  useEffect(() => {
  if (session) {
    localStorage.removeItem('signup_email'); // cleanup

    setTimeout(() => {
      router.push('/');
    }, 1200);
  }
}, [session, router]);

  // 📩 Resend email
  const handleResend = async () => {
    if (!email) {
      setResendLoading(true);
      setMessage('Missing email. Please sign up again.');
      return;
    }
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    setResendLoading(false);

    if (error) {
      setMessage('Failed to resend email. Try again.');
      return;
    }

    setMessage('Confirmation email sent!');
    setCooldown(30);

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 🎯 Mask email
  const maskEmail = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name.slice(0, 2)}***@${domain}`;
  };

  if (loading) {
    return (
      <Box minHeight="80vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#f9fafb', px: 2 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        }}
      >
        {session ? (
          <>
            <img
              src='/verified48.png'
              alt='correct'
              height={70}
              width={70}
              className='flex mx-auto'
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              You're all set 🎉
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Redirecting to your dashboard...
            </Typography>
             <Typography variant="body2" color="text.secondary">
              You can access your dashboard with the button below if you're not redirected automatically.
            </Typography>

            {/* 🧭 Fallback button */}
            <Button
              variant="text"
              sx={{ mt: 2 }}
              onClick={() => router.push('/dashboard')}
            >
              Go to dashboard
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Check your email
              
              <img 
              src='/delivered.png' 
              alt='delivered' 
              height={120} 
              width={120}
              className='relative left-32'
            />
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
              We’ve sent a confirmation link to{' '}
              <strong>{maskEmail(email)}</strong>
            </Typography>           

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please verify your account to continue.
            </Typography>

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

            {/* 🔁 Resend */}
            <Button       
              
              sx={{ mt: 3 }}
              onClick={handleResend}
              disabled={resendLoading || cooldown > 0}
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : resendLoading
                ? 'Sending...'
                : 'Resend confirmation email'}
            </Button>

            {message && (
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}

            {/* 🧭 Fail-safe navigation */}
            <Button
              variant="text"
              sx={{ mt: 0 }}
              onClick={() => router.push('/')}
            >
              Back to homepage
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
