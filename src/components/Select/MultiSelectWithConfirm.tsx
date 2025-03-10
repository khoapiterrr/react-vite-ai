import * as React from 'react';
import { X, Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectWithConfirmProps {
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
  applyText?: string;
  cancelText?: string;
}

export function MultiSelectWithConfirm({
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
  applyText = 'Apply',
  cancelText = 'Cancel',
}: MultiSelectWithConfirmProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tempValue, setTempValue] = React.useState<string[]>(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter(option => tempValue.includes(option.value));
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    if (tempValue.includes(optionValue)) {
      setTempValue(tempValue.filter(v => v !== optionValue));
    } else if (tempValue.length < maxSelected) {
      setTempValue([...tempValue, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    setTempValue(tempValue.filter(v => v !== optionValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && searchQuery === '' && tempValue.length > 0) {
      handleRemove(tempValue[tempValue.length - 1]);
    }
  };

  const handleApply = () => {
    onChange(tempValue);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setSearchQuery('');
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          'relative min-h-[2.5rem] w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm ring-offset-white transition-colors focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          error && 'border-red-500 focus-within:ring-red-500',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          loading && 'bg-gray-50',
          isOpen && 'border-primary-500'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map(option => (
            <div
              key={option.value}
              className="flex items-center gap-1 rounded-md bg-primary-50 px-2 py-0.5 text-xs text-primary-700 border border-primary-200"
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="hover:text-primary-900 focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {searchable && (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tempValue.length === 0 ? placeholder : ''}
              className="flex-1 bg-transparent outline-none placeholder:text-text-muted min-w-[120px]"
              disabled={disabled || loading}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-sm"
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 text-text-muted transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
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
                  disabled={option.disabled || (tempValue.length >= maxSelected && !tempValue.includes(option.value))}
                  className={cn(
                    'flex w-full items-center gap-2 px-2 py-1.5 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50',
                    option.disabled && 'cursor-not-allowed opacity-50',
                    tempValue.includes(option.value) && 'bg-primary-50'
                  )}
                >
                  <div className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border transition-colors',
                    tempValue.includes(option.value) 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                  )}>
                    {tempValue.includes(option.value) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  {option.label}
                </button>
              ))
            )}
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-2 py-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-3 py-1.5 text-sm text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {applyText}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 