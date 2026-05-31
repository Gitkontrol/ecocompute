"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  name,
  value,
  onChange,
  placeholder = "Password",
  variant = "modal"

}) {
  
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles = variant === "modal"
      ? "dark:bg-gray-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
      : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"; 

  return (
    <div className="relative">
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required                
        className={`p-2 text-sm rounded-md bg-transparent border w-full dark:bg-transparent dark:border-gray-700 border-gray-300 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 ${inputStyles}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <Eye className="h-4 w-4" />:<EyeOff className="h-4 w-4" />}
      </button>
    </div>
  );
}
