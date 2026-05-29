'use client';

import {
  getUserAvatar,
  getUserInitials,
  getUserDisplayName
} from '@/lib/getUserAvatar';

export default function Avatar({ user, size = 40, className = '' }) {
  if (!user) return null;

  const avatarUrl = getUserAvatar(user);
  const initials = getUserInitials(user);
  const name = getUserDisplayName(user);

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold text-gray-800 dark:text-white">
          {initials}
        </span>
      )}
    </div>
  );
}
