import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { login } from '../../redux/authSlice';

const CompanyLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData; // Destructure email and password from formData

  const handleSubmit = () => {

    dispatch(login(email, password)).then(() => {
      //  navigate to ...
      navigate('/');
    });
  };

  return (
    <div className="h-screen ">
      <div className=" h-full flex justify-center">
        <div className="xl:px-40 px-10 w-1/2 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGIN</h1>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail must be required!",
                },
              ]}
            >
              <Input onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Password must be required!",
                },
              ]}
            >
              <Input.Password onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center left-0  w-full">
            Do not you have an account?&nbsp;
            <Link to="/company/register" className="text-blue-600">
              Register Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
