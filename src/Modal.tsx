import { useEffect } from 'react';

import Portal from './Portal';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}

const Modal = ({ onClose, visible, children }: ModalProps) => {
  const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscModalClose = (e: Event & { key: KeyboardEvent['key'] }) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscModalClose);
    return () => window.removeEventListener('keydown', handleEscModalClose);
  }, [onClose]);

  return (
    <Portal selector="modal">
      <div
        className={`fixed inset-0 z-50 box-border overflow-auto outline-none ${
          visible ? 'block' : 'hidden'
        }`}
        onClick={onMaskClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onMaskClick(e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
      >
        {children}
      </div>
      <div
        className={`fixed inset-0 z-40 box-border overflow-auto opacity-70 outline-none ${
          visible ? 'bg-black' : 'hidden'
        }`}
      />
    </Portal>
  );
};

export default Modal;
