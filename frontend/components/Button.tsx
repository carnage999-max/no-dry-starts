import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--color-tiger-orange-500)] text-white hover:bg-[var(--color-tiger-orange-600)] focus:ring-[var(--color-tiger-orange-500)]',
    secondary: 'bg-[var(--color-white-500)] text-[var(--color-graphite-950)] hover:bg-[var(--color-white-600)] focus:ring-[var(--color-white-500)]',
    outline: 'border-2 border-[var(--color-white-500)] text-[var(--color-white-500)] hover:bg-[var(--color-white-500)] hover:text-[var(--color-graphite-950)] focus:ring-[var(--color-white-500)]',
    ghost: 'text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] focus:ring-[var(--color-white-500)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
