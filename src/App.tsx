import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

export const App = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                alert(value);
                setValue('');
                return;
              }
            }}
          />
          <Button onClick={toggle}>submit</Button>
        </div>
      </main>

      {isModalOpen && (
        <ModalComponent isModalOpen={isModalOpen} toggle={toggle} />
      )}
    </React.Fragment>
  );
};

export const ModalComponent = ({
  isModalOpen,
  toggle,
}: {
  isModalOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <div>
      <Button onClick={toggle}>Click Me</Button>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Do Something</Button>{' '}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
