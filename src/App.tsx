import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import Modal from './Modal';

export const App = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onReset = () => {
    setValue('');
  };

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <React.Fragment>
      <main className="relative h-screen w-screen">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-red-500 p-20">
          <Input
            className="mb-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {
              console.log('envet');
              if (e.key === 'Enter') {
                toggle();
                return;
              }
            }}
          />
          <Button onClick={toggle}>submit</Button>
        </div>
      </main>

      <Modal visible={isModalOpen} onClose={toggle}>
        <ModalComponent toggle={toggle} onReset={onReset} />
      </Modal>
    </React.Fragment>
  );
};

export const ModalComponent = ({
  toggle,
  onReset,
}: {
  toggle: () => void;
  onReset: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (value.toLowerCase() === 'enter') {
      setValue('');
      toggle();
      onReset();
      return;
    }

    alert(value);
    return;
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 bg-black">
      <form onSubmit={onSubmit}>
        <Input ref={inputRef} value={value} onChange={onChange} />
      </form>
    </div>
  );
};
