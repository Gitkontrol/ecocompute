export default function AuthDropdown({ onClose }) {
  return (
    <div className="w-72 p-4 bg-white border border-gray-300 rounded-sm dark:bg-gray-900 dark:border-gray-700">
      <SignInForm onSuccess={onClose} variant="dropdown" />

      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        <span className="mx-3 text-xs text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
      </div>

      <AuthButtons />
      <SignupLink variant="dropdown" />
    </div>
  )
}
