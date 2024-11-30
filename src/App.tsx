import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

export const App = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
        <Button onClick={() => setIsModalOpen(true)}>submit</Button>
      </div>
      {isModalOpen && <Modal />}
    </main>
  );
};
