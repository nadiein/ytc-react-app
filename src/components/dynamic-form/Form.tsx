import React from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './../../models/form/FormData';

interface FormProps {
  id: string;
  initialData: FormData;
  onDelete: (id: string) => void;
  onAddAfter: (id: string) => void;
}

export default function Form({
  id,
  initialData,
  onDelete,
  onAddAfter
}: FormProps) {
  const { register } = useForm<FormData>({
    defaultValues: initialData,
  });

  return (
    <form className="form-user">
      <div className="form-control-wrapper">
        <input
          className="form-control"
          placeholder="user.username"
          {...register('name', { required: true })}
        />
        <input
          className="form-control"
          placeholder="user.email"
          {...register('email', { required: true })}
          type="email"
        />
      </div>
      <button className="btn-add-after" type="button" onClick={() => onAddAfter(id)}>
        Add after
      </button>
      <button className="btn-delete" type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </form>
  );
}
