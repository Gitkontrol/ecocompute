'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getDiceBearAvatar } from '@/app/utils/dicebear'
import SignInForm from './auth/SignInForm'
import AuthButtons from './auth/OAuthButtons'
import SignupLink from './auth/SignupLink'
import Avatar from './Avatar'
import Link from 'next/link'
import clsx from 'clsx'

function getOAuthAvatar(user) {
   if (!user) return null

  const metadata = user.user_metadata || {}
   

  return (       
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.identities?.[0]?.identity_data?.avatar_url ||
    user?.identities?.[0]?.identity_data?.picture ||
     getDiceBearAvatar(
      metadata.full_name ||
      metadata.name ||
      user.email ||
      "user"
    )
    
  )
}


export default function ProfileDropdown({ inputVariant = "dropdown" }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const isEmailAuth = user?.app_metadata?.provider === 'email';
  const oauthAvatar = getOAuthAvatar(user);
 

  const ref = useRef(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
    })

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

     return () => listener.subscription.unsubscribe()
  }, [])
  
  // Close on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 pr-5 pt-3 text-sm font-medium hover:opacity-80 dark:text-white"
      >
        {session?.user ? (
          <>
            {isEmailAuth ? (
                <Avatar user={user} size={36} />
              ) : oauthAvatar? (
                <img
                  src={oauthAvatar}
                  alt="User avatar"
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                ) : (
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm">
                {user?.email?.[0]?.toUpperCase() ?? '?'}
              </div>
              
            )}           
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Dropdown Content */}
      <div
        className={clsx(
          'absolute right-0 mt-2 z-10 rounded-lg dark:bg-gray-900 transition-all duration-200 ease-out',
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {!session ? (
        <div className="relative -top-12 -right-6 w-72 p-4 bg-white border border-gray-300 rounded-sm dark:bg-gray-900 dark:border-gray-700">
          <SignInForm variant={inputVariant}/>

          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <span className="mx-3 text-xs text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          </div>

          <AuthButtons />
          <SignupLink />
        </div>
        ) : (
          <div className="flex flex-col py-2">
            <div className="flex flex-col py-2 pr-9 w-[250px]">
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b px-2 py-3 dark:border-gray-700">
          {isEmailAuth ? (
          <Avatar user={user} size={36} />
        ) : getOAuthAvatar(user) ? (
            <img
              src={getOAuthAvatar(user)}
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            ) : (
          <div className="w-9 h-9 rounded-full relative top-[10px] flex items-center justify-center text-white text-sm">
            {user?.email?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Signed in as
          </p>
          <p className="text-sm font-medium">
            {user?.email}
          </p>
        </div>
      </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="profile" className='text-black'>
            <path fill="currentColor" d="M5.84846399,13.5498221 C7.28813318,13.433801 8.73442297,13.433801 10.1740922,13.5498221 C10.9580697,13.5955225 11.7383286,13.6935941 12.5099314,13.8434164 C14.1796238,14.1814947 15.2696821,14.7330961 15.73685,15.6227758 C16.0877167,16.317132 16.0877167,17.1437221 15.73685,17.8380783 C15.2696821,18.727758 14.2228801,19.3149466 12.4926289,19.6174377 C11.7216312,19.7729078 10.9411975,19.873974 10.1567896,19.9199288 C9.43008411,20 8.70337858,20 7.96802179,20 L6.64437958,20 C6.36753937,19.9644128 6.09935043,19.9466192 5.83981274,19.9466192 C5.05537891,19.9062698 4.27476595,19.8081536 3.50397353,19.6530249 C1.83428106,19.3327402 0.744222763,18.7633452 0.277054922,17.8736655 C0.0967111971,17.5290284 0.00163408158,17.144037 0.000104217816,16.752669 C-0.00354430942,16.3589158 0.0886574605,15.9704652 0.268403665,15.6227758 C0.72692025,14.7330961 1.81697855,14.1548043 3.50397353,13.8434164 C4.27816255,13.6914539 5.06143714,13.5933665 5.84846399,13.5498221 Z M8.00262682,-1.16351373e-13 C10.9028467,-1.16351373e-13 13.2539394,2.41782168 13.2539394,5.40035587 C13.2539394,8.38289006 10.9028467,10.8007117 8.00262682,10.8007117 C5.10240696,10.8007117 2.75131423,8.38289006 2.75131423,5.40035587 C2.75131423,2.41782168 5.10240696,-1.16351373e-13 8.00262682,-1.16351373e-13 Z" transform="translate(4 2)"></path>
          </svg>
          Profile
        </Link>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-red-50 dark:hover:bg-red-900/20"
        >         
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-red-700'>
            <path d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z" fill="currentColor"/>
            <path d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z" fill="currentColor"/>
            <path d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z" fill="currentColor"/>
          </svg>
          Sign out
        </button>
      </div>

      </div>
    )}
    </div>
  </div>
  )
}
