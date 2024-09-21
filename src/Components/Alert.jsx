import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample({name , message , errRef , type}) {
  const [show, setShow] = useState(true);
  
  if (show) {
    return (
      <Alert variant={type} onClose={() => setShow(true)} dismissible>
        <Alert.Heading>{name}</Alert.Heading>
        <p ref={ errRef } style={{color:"rgb(245, 144, 122)"}}> 
          {message}
        </p>
      </Alert>
      
    );
  }
}

export default AlertDismissibleExample;