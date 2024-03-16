import { useState } from 'react';

export const useForm = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  return { name, setName, show, setShow };
};
