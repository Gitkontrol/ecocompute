import { Alert, Snackbar, Dialog, Fade } from "@mui/material";
import { useState } from "react";



export default function Authmodal() {
    const [authNoticeOpen, setAuthNoticeOpen] = useState(false);

    supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    onSuccess(); // retry checkout
  }
});


    return (
    <div>           

<Dialog
  open={open}
  onClose={onClose}
  slots={{ transition: Fade }}
  slotProps={{
    transition: { timeout: 300 },
     sx: {
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },
  }}
>

<Snackbar
    open={authNoticeOpen}
    autoHideDuration={3000}
    onClose={() => setAuthNoticeOpen(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
    <Alert severity="info" sx={{ width: '100%' }}>
        Please sign in to continue your subscription.
    </Alert>
</Snackbar>
</Dialog>

            

    </div>
    )
};