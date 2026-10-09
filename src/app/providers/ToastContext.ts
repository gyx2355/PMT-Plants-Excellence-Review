import { createContext } from 'react';
import type { ToastIntent } from '@fluentui/react-components';

export interface ToastContextType {
  notify: (title: string, body?: string, intent?: ToastIntent) => void;
  notifySuccess: (title: string, body?: string) => void;
  notifyError: (title: string, body?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
