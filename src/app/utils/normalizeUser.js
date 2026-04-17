// utils/normalizeUser.js
export function normalizeUser(user) {
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0],
    avatar:
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null,
  }
}
