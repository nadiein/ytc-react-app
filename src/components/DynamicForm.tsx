import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './dynamic-form.css';

interface FormData {
  id: string;
  name: string;
  email: string;
}

export default function DynamicForm() {
  const [forms, setForms] = useState<FormData[]>([
    { id: Date.now().toString(), name: '', email: '' },
  ]);

  const addFormToTop = () => {
    setForms([{ id: Date.now().toString(), name: '', email: '' }, ...forms]);
  };

  const addFormAfter = (id: string) => {
    const newForm = { id: Date.now().toString(), name: '', email: '' };
    setForms((prevForms) => {
      const newForms = [...prevForms],
        index = newForms.findIndex((form) => form.id === id);
      if (index >= 0) {
        newForms.splice(index + 1, 0, newForm);
      }
      return newForms;
    });
  };

  const deleteForm = (id: string) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div className="form-component">
      <div className="header-wrapper">
        <h1 className="header-title">Users</h1>
        <button className="btn-add-new" type="button" onClick={addFormToTop}>
          Add New
        </button>
      </div>

    <div className="form-user-wrapper">
      {forms.map((form) => (
        <Form
          key={form.id}
          id={form.id}
          onDelete={deleteForm}
          onAddAfter={addFormAfter}
        />
      ))}
    </div>
      <button className="btn-save" type="submit">Save Changes</button>
    </div>
  );
}


function Form({
  id,
  onDelete,
  onAddAfter
}: {
  id: string;
  onDelete: (id: string) => void,
  onAddAfter: (id: string) => void
}) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { name: '', email: '' },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <form
      className="form-user"
      onSubmit={handleSubmit(onSubmit)}
    >
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