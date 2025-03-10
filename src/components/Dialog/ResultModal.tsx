import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

type ResultType = 'success' | 'error' | 'warning' | 'info';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ResultType;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  closeOnOutsideClick?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export function ResultModal({
  isOpen,
  onClose,
  type,
  title,
  description,
  buttonText = 'OK',
  onButtonClick,
  closeOnOutsideClick = true,
  autoClose = false,
  autoCloseDelay = 3000,
}: ResultModalProps) {
  const Icon = icons[type];
  const colorClass = colors[type];

  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent closeOnOutsideClick={closeOnOutsideClick}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon className={`h-12 w-12 ${colorClass}`} />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-base mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <button
            onClick={onButtonClick || onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {buttonText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 