import { useState } from 'react';

export const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event, type = '') => {
    if (type === 'reset') setValue('');
    else setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
