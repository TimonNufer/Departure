import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Login.css';

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const forwardRouting = () => {
    navigate('/homePage');
  };

  const Validate = () => {
    axios.post('http://localhost:4242/api/login', { email, password })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        forwardRouting();
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Validate(email, password);
  };

  return (
    <Form className="Login" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="email-text">{t('mail')}</Form.Label>
        <Form.Control type="email" placeholder={t('mail')} onChange={handleEmailChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="pwd-text">{t('password')}</Form.Label>
        <Form.Control type="password" placeholder={t('password')} onChange={handlePasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        {t('submit')}
      </Button>
    </Form>
  );
}

export default Login;
