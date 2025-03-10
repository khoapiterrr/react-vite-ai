import * as React from 'react';
import { FormSelect } from './FormSelect';

export function FormSelectExample() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Flat options
  const flatOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  // Grouped options
  const groupedOptions = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'potato', label: 'Potato' },
        { value: 'tomato', label: 'Tomato' },
      ],
    },
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setError('');
  };

  const handleSubmit = async () => {
    if (!value) {
      setError('Please select an option');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Selected value:', value);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Basic Select */}
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Select</h3>
        <FormSelect
          value={value}
          onChange={handleChange}
          options={flatOptions}
          placeholder="Select an option"
          label="Basic Select"
          error={error}
          loading={loading}
          required
        />
      </div>

      {/* Grouped Select */}
      <div>
        <h3 className="text-lg font-medium mb-4">Grouped Select</h3>
        <FormSelect
          value={value}
          onChange={handleChange}
          options={groupedOptions}
          placeholder="Select a category"
          label="Grouped Select"
          error={error}
          loading={loading}
          required
        />
      </div>

      {/* Disabled Select */}
      <div>
        <h3 className="text-lg font-medium mb-4">Disabled Select</h3>
        <FormSelect
          value={value}
          onChange={handleChange}
          options={flatOptions}
          placeholder="Select an option"
          label="Disabled Select"
          disabled
        />
      </div>

      {/* Custom Styled Select */}
      <div>
        <h3 className="text-lg font-medium mb-4">Custom Styled Select</h3>
        <FormSelect
          value={value}
          onChange={handleChange}
          options={flatOptions}
          placeholder="Select an option"
          label="Custom Styled Select"
          className="max-w-md"
          triggerClassName="bg-gray-50"
          contentClassName="bg-white"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
} 