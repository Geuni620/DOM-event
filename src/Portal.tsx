import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const element = document.getElementById(selector);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
