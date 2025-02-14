import React, { useEffect, useState } from 'react';
import Form from './Form';
import { mockApiSubmit } from './../../mock-api/mockApiService';
import { FormData } from './../../models/form/FormData';

import './dynamic-form.css';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DynamicForm() {
  const [forms, setForms] = useState<FormData[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersModule = await import('./../../mock-api/users.json'),
        users: User[] = usersModule.default;
      setForms(
        users.map(user => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email
        }))
      );
    };

    loadUsers();
  }, []);

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

  const handleSaveChanges = async () => {
    const allFormData = forms.map((form) => ({
      id: form.id,
      name: form.name,
      email: form.email,
    }));

    try {
      const responses = await Promise.all(
        allFormData.map((data) => mockApiSubmit(data))
      );
      console.log('All forms saved successfully:', responses);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
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
            initialData={form}
            onDelete={deleteForm}
            onAddAfter={addFormAfter}
          />
        ))}
      </div>
      <button
        className="btn-save"
        type="button"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
}
