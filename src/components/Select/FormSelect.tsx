import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select';
import { cn } from '@/utils/cn';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Group {
  label: string;
  options: Option[];
}

interface FormSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: Option[] | Group[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function FormSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  loading = false,
  required = false,
  className,
  triggerClassName,
  contentClassName,
}: FormSelectProps) {
  // Find selected option label
  const getSelectedLabel = () => {
    if (!value) return '';

    const findOption = (options: Option[] | Group[]): string | undefined => {
      if (Array.isArray(options) && options.length > 0 && 'options' in options[0]) {
        // Search in grouped options
        for (const group of options as Group[]) {
          const found = group.options.find(opt => opt.value === value);
          if (found) return found.label;
        }
      } else {
        // Search in flat options
        const found = (options as Option[]).find(opt => opt.value === value);
        if (found) return found.label;
      }
      return undefined;
    };

    return findOption(options) || '';
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || loading}
      >
        <SelectTrigger
          className={cn(
            'w-full',
            error && 'border-red-500 focus:ring-red-500',
            loading && 'bg-gray-50',
            triggerClassName
          )}
        >
          <SelectValue>
            {value ? getSelectedLabel() : placeholder}
          </SelectValue>
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {Array.isArray(options) && options.length > 0 && 'options' in options[0] ? (
            // Render grouped options
            (options as Group[]).map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          ) : (
            // Render flat options
            (options as Option[]).map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 