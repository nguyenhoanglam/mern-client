import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { useAuthContext } from '../../services/contexts/AuthContext';
import { LoginForm as LoginFormState } from '../../types/auth';
import AlertMessage, { AlertInfo } from '../../components/AlertMessage';

const LoginForm = () => {
  const { loginUser } = useAuthContext();

  const [loginForm, setLoginForm] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const { username, password } = loginForm;

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);
      if (!loginData.success) {
        setAlertInfo({
          type: 'danger',
          message: loginData.message,
        });
        setTimeout(() => {
          setAlertInfo(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className='my-3' onSubmit={handleFormSubmit}>
        <AlertMessage info={alertInfo} />
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='mx-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
