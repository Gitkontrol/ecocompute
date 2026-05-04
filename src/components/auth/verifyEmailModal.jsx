import { useState, useEffect } from 'react';
import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Typography, } from '@mui/material';
import { supabase } from '@/lib/supabaseClient';

export default function VerifyEmailModal({ open, onClose, email }) {
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
  if (!open) return; // only listen when modal is open

  const { data: { subscription } } =
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onVerified(); // 🔥 tell parent to resume flow
      }
    });

  return () => subscription.unsubscribe();
}, [open, onVerified]);



  const handleResend = async () => {
    if (!email) return;

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/signup/success?next=${encodeURIComponent(next)}`,
     },
    });

    setLoading(false);

    if (error) {
      setMessage('Failed to resend email.');
      return;
    }

    setMessage('Verification email sent!');
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

  const maskEmail = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name.slice(0, 2)}***@${domain}`;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verify your email</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please verify your email to continue your subscription.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          We sent a link to <strong>{maskEmail(email)}</strong>
        </Typography>

        {message && (
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            {message}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleResend}
          disabled={loading || cooldown > 0}
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : loading
            ? 'Sending...'
            : 'Resend email'}
        </Button>

        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
