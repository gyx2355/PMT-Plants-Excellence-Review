import React, { type ReactNode } from 'react';
import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastBody,
  type ToastIntent,
} from '@fluentui/react-components';
import { ToastContext } from './ToastContext';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toasterId = useId('app-toaster');
  const { dispatchToast } = useToastController(toasterId);

  const notify = (title: string, body?: string, intent: ToastIntent = 'info') => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {body && <ToastBody>{body}</ToastBody>}
      </Toast>,
      { intent }
    );
  };

  const notifySuccess = (title: string, body?: string) => notify(title, body, 'success');
  const notifyError = (title: string, body?: string) => notify(title, body, 'error');

  return (
    <ToastContext.Provider value={{ notify, notifySuccess, notifyError }}>
      {children}
      <Toaster toasterId={toasterId} position="bottom-end" pauseOnHover />
    </ToastContext.Provider>
  );
};
