import { Button, Checkbox, Form, Input } from 'antd';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import UserContext from '../../contexts/UserContext';
import { LOGIN } from '../../routes/paths';

import * as S from './Login.styled';

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { setCurrentTab } = useContext(LayoutContext);
  useEffect(() => {
    setCurrentTab(LOGIN);
  }, [setCurrentTab]);

  const history = useNavigate();
  const onFinish = () => {
    setLoggedIn(!loggedIn);
    history('/profile');
  };

  const onFinishFailed = () => {};
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
          <S.Header>You`re already logged in</S.Header>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

Login.propTypes = {};

export default Login;
