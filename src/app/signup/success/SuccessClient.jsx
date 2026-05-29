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

      // 🔥 session already exists
    if (data.session) {
      router.refresh();
      localStorage.removeItem('signup_email');

      router.replace('/');
      return;
    }
      setLoading(false);
    };

    checkSession();
  }, []);

  // 🔥 Real-time auth listener (replaces polling)
 useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);

    if (event === 'SIGNED_IN' && session) {
      localStorage.removeItem('signup_email');

      setTimeout(() => {
        router.replace('/');
      }, 800);
    }
  });

  return () => subscription.unsubscribe();
}, [router]);

  
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
