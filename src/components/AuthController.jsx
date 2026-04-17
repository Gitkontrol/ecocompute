'use client'

import Navbar from './Navbar'
import ProfileDropdown from './ProfileDropdown'
import { useSupabaseAuth } from '../app/hooks/useSupabaseSession'
import { normalizeUser } from '../app/utils/normalizeUser'

export default function AuthController() {
  const { session, loading } = useSupabaseAuth()
  const user = session?.user ? normalizeUser(session.user) : null
  const provider = session?.user?.app_metadata?.provider
  const isEmailAuth = provider === 'email'
  



  return (
    <>
      <Navbar />

      {/* Auth trigger + dropdown */}
      <div className="relative flex justify-end px-6 mt-2">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <ProfileDropdown session={session} user={user} isEmailAuth={isEmailAuth} />
        )}
      </div>
    </>
  )
}
