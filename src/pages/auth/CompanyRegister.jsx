import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const CompanyRegister = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data); // you can do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="flex justify-center vh-100">
        <div className="xl:px-20 px-10 py-10 w-1/2 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 ">REGISTER</h1>
          <Form layout="vertical" onFinish={onFinish}>
            {/* Firma Adı */}
            <Form.Item
              label="Firm Name"
              name={"firmname"}
              rules={[
                {
                  required: true,
                  message: "Firm Name must be required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Lokasyon */}
            <Form.Item label="Location" name={"location"}>
              <Input />
            </Form.Item>
            {/* Telephone */}
            <Form.Item label="Contact Number" name={"contact"}>
              <Input />
            </Form.Item>
            {/* Sektör */}
            <Form.Item label="Sector" name={"sector"}>
              <Input />
            </Form.Item>
            {/* Personel Sayısı */}
            <Form.Item label="Work Areas" name={"workAreas"}>
              <Input />
            </Form.Item>
            {/* Username */}
            <Form.Item
              label="Username"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Username must be required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* E-mail */}
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
              <Input />
            </Form.Item>
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password must be required!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password />
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
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center left-0 w-full">
            Do you have an account?&nbsp;
            <Link to="/company/login" className="text-blue-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
