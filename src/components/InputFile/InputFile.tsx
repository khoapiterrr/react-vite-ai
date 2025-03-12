import * as React from 'react';
import { cn } from '@/utils/cn';

interface InputFileProps {
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

export function InputFile({
  onChange,
  accept = '*',
  multiple = false,
  className,
  disabled = false,
}: InputFileProps) {
  return (
    <input
      type="file"
      onChange={(e) => onChange(e.target.files)}
      accept={accept}
      multiple={multiple}
      className={cn(
        'w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      disabled={disabled}
    />
  );
} 