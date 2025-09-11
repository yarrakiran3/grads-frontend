// src/components/ui/Alert.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';
import { X } from 'lucide-react';

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success: "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-600",
        destructive: "border-red-200 bg-red-50 text-red-800 [&>svg]:text-red-600",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-600",
        info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, dismissible, onDismiss, icon, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    // Default icons for each variant
    const defaultIcons = {
      success: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      destructive: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      warning: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      info: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      default: null,
    };

    const displayIcon = icon || (variant ? defaultIcons[variant] : null);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {displayIcon}
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };