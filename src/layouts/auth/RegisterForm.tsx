import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AlertMessage, { AlertInfo } from '../../components/AlertMessage';
import { useAuthContext } from '../../services/contexts/AuthContext';
import { RegisterForm as RegisterFormState } from '../../types/auth';

const RegisterForm = () => {
  const { registerUser } = useAuthContext();

  const [registerForm, setRegisterForm] = useState<RegisterFormState>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const { username, password, confirmPassword } = registerForm;

  const showScheduledAlert = (info: AlertInfo) => {
    setAlertInfo(info);
    setTimeout(() => {
      setAlertInfo(null);
    }, 3000);
  };

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      showScheduledAlert({
        type: 'danger',
        message: 'Passwords do not match',
      });
      return;
    }

    // Register new user
    try {
      const registerData = await registerUser(registerForm);

      if (!registerData.success) {
        showScheduledAlert({
          type: 'danger',
          message: registerData.message,
        });
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
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='mx-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
