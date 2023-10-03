import { create } from 'zustand';

import { Toast, ToastService } from './toastTypes';

const useToastStore = create<ToastService>(set => ({
  toast: null,
  showToast: toast => set({ toast }),
  hideToast: () => set({ toast: null }),
}));

export function useToast(): Toast | null {
  return useToastStore(state => state.toast);
}

export function useToastService(): Omit<ToastService, 'toast'> {
  const showToast = useToastStore(state => state.showToast);
  const hideToast = useToastStore(state => state.hideToast);

  return {
    showToast,
    hideToast,
  };
}
