import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.scss";
import { Form, Input, Button, Checkbox } from "antd";
import {
  loginUser,
  useAuthState,
  useAuthDispatch,
} from "../../Context/index.js";

const Auth = (props) => {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleLogin = async (values) => {
    try {
      let email = values.username;
      let password = values.password;
      let response = await loginUser(dispatch, { email, password });
      console.log(response.user);
      if (response.user) {
        console.log("kek");
        props.history.push("/reports");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        className='logo-auth'
        src='https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/173843990_3990233587736899_218563331268235017_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uBSePUL166wAX9KnkpO&_nc_ht=scontent-arn2-1.xx&oh=beced5529961d0395d33346149421d8a&oe=60C13073'
      />
      <h1 style={{ textAlign: "center", fontWeight: 600, maxWidth: "280px" }}>
        Автоматизированная
        <br /> отчетность
      </h1>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: "Логин не введен!",
            },
          ]}
        >
          <Input placeholder='Логин' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: "Пароль не введен!",
            },
          ]}
        >
          <Input type='password' placeholder='Пароль' />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Восстановить доступ
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
