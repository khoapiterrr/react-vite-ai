import * as React from 'react';
import { MultiSelectWithConfirm } from './MultiSelectWithConfirm';

export function MultiSelectWithConfirmExample() {
  const [value, setValue] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ];

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    setError('');
  };

  const handleSubmit = async () => {
    if (value.length === 0) {
      setError('Please select at least one option');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Selected values:', value);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Basic MultiSelect with Confirm */}
      <div>
        <h3 className="text-lg font-medium mb-4">MultiSelect with Confirm</h3>
        <MultiSelectWithConfirm
          value={value}
          onChange={handleChange}
          options={options}
          placeholder="Select frameworks"
          label="Frameworks"
          error={error}
          loading={loading}
          required
          applyText="Apply"
          cancelText="Cancel"
        />
      </div>

      {/* MultiSelect with Max Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">MultiSelect with Max Selection (3)</h3>
        <MultiSelectWithConfirm
          value={value}
          onChange={handleChange}
          options={options}
          placeholder="Select up to 3 frameworks"
          label="Frameworks (Max 3)"
          maxSelected={3}
          applyText="Confirm"
          cancelText="Reset"
        />
      </div>

      {/* MultiSelect without Search */}
      <div>
        <h3 className="text-lg font-medium mb-4">MultiSelect without Search</h3>
        <MultiSelectWithConfirm
          value={value}
          onChange={handleChange}
          options={options}
          placeholder="Select frameworks"
          label="Frameworks"
          searchable={false}
          applyText="Save"
          cancelText="Discard"
        />
      </div>

      {/* Disabled MultiSelect */}
      <div>
        <h3 className="text-lg font-medium mb-4">Disabled MultiSelect</h3>
        <MultiSelectWithConfirm
          value={value}
          onChange={handleChange}
          options={options}
          placeholder="Select frameworks"
          label="Frameworks"
          disabled
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