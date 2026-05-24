'Use Client'

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { createClient } from '@/lib/supabaseClient';


export default function ResendEmail({ email }) {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleResend = async () => {
    if (!email) return;

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    setLoading(false);

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

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleResend}
        disabled={loading || cooldown > 0}
        sx={{ mt: 2 }}
      >
        {cooldown > 0
          ? `Resend in ${cooldown}s`
          : loading
          ? 'Sending...'
          : 'Resend email'}
      </Button>

      {message && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </>
  );
}
