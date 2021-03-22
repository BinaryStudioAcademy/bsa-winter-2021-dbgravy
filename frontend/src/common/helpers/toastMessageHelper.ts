import { toast } from 'react-toastify';

export const successToastMessage = (message?: string): void => {
  toast.success(message || 'Success Notification!');
};

export const errorToastMessage = (message?: string): void => {
  toast.error(message || 'Error! Something went wrong with request!');
};
