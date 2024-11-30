import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

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
              if (e.key === 'Enter') {
                toggle();
                return;
              }
            }}
          />
          <Button onClick={toggle}>submit</Button>
        </div>
      </main>

      {isModalOpen && (
        <ModalComponent
          isModalOpen={isModalOpen}
          toggle={toggle}
          onReset={onReset}
        />
      )}
    </React.Fragment>
  );
};

export const ModalComponent = ({
  isModalOpen,
  toggle,
  onReset,
}: {
  isModalOpen: boolean;
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
    <div>
      <Button onClick={toggle}>Click Me</Button>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <Input ref={inputRef} value={value} onChange={onChange} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Do Something</Button>{' '}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
