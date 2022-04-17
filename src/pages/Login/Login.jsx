import { Button, Checkbox, Form, Input } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import * as S from './Login.styled';

const Login = () => {
  const { userName, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Success:', values);
    setLoggedIn(!loggedIn);
    history.push('/profile');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <S.Wrapper>
      <S.Container>
        {!loggedIn ? (
          <>
            <S.Header>Login / Register</S.Header>
            <S.FormWrapper>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </S.FormWrapper>
          </>
        ) : (
          <S.Header>You're already logged in</S.Header>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

Login.propTypes = {};

export default Login;
