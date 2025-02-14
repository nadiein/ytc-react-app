import { FormData } from './../models/form/FormData';

export const mockApiSubmit = (formData: FormData): Promise<FormData> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? res(formData)
        : rej('Error saving data');
    }, 1000);
  });
};
