import Alert from 'react-bootstrap/Alert';
import { Variant } from 'react-bootstrap/types';

export interface AlertInfo {
  type: Variant;
  message: string;
}

interface AlertMessageProps {
  info: AlertInfo | null;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  return <Alert variant={info.type}>{info.message}</Alert>;
};

export default AlertMessage;
