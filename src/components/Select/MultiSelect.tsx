import * as React from 'react';
import { X, Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  className?: string;
  maxSelected?: number;
  searchable?: boolean;
}

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = 'Select options',
  label,
  error,
  disabled = false,
  loading = false,
  required = false,
  className,
  maxSelected = 5,
  searchable = true,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter(option => value.includes(option.value));
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else if (value.length < maxSelected) {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && searchQuery === '' && value.length > 0) {
      handleRemove(value[value.length - 1]);
    }
  };

  const handleContainerClick = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
    }
  };

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        onClick={handleContainerClick}
        className={cn(
          'relative min-h-[2.5rem] w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm ring-offset-white transition-colors focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 cursor-pointer',
          error && 'border-red-500 focus-within:ring-red-500',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          loading && 'bg-gray-50',
          isOpen && 'border-primary-500'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.slice(0, 3).map(option => (
            <div
              key={option.value}
              className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                className="hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedOptions.length > 3 && (
            <div className="flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              +{selectedOptions.length - 3} more
            </div>
          )}
          {searchable && (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={value.length === 0 ? placeholder : ''}
              className="flex-1 bg-transparent outline-none placeholder:text-text-muted min-w-[120px]"
              disabled={disabled || loading}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {selectedOptions.length > 0 && (
            <span className="text-xs text-gray-500">
              {selectedOptions.length} selected
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            disabled={disabled || loading}
            className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
          >
            <ChevronDown
              className={cn(
                'h-4 w-4 text-text-muted transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
          {searchable && (
            <div className="sticky top-0 flex items-center gap-2 bg-white px-2 py-1.5 border-b border-gray-100">
              <Search className="h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent outline-none placeholder:text-text-muted"
              />
            </div>
          )}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-1.5 text-text-muted">No options found</div>
            ) : (
              filteredOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  disabled={option.disabled || (value.length >= maxSelected && !value.includes(option.value))}
                  className={cn(
                    'flex w-full items-center gap-2 px-2 py-1.5 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50',
                    option.disabled && 'cursor-not-allowed opacity-50',
                    value.includes(option.value) && 'bg-gray-50'
                  )}
                >
                  <div className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border transition-colors',
                    value.includes(option.value) 
                      ? 'border-gray-400 bg-gray-400' 
                      : 'border-gray-300'
                  )}>
                    {value.includes(option.value) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 