export function getUserAvatar(user) {
  if (!user) return null;

  return (
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.identities?.[0]?.identity_data?.avatar_url ||
    user?.identities?.[0]?.identity_data?.picture ||
    null
  );
}

export function getUserDisplayName(user) {
  if (!user) return "User";

  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User"
  );
}

export function getUserInitials(user) {
  const name = getUserDisplayName(user);

  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}