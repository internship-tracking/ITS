import { Button, Form, Input } from "antd";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Link } from "react-router-dom";


const SupervisorPassword = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/", {
        method: "",
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
    <>
    <SupervisorNavbar />
    <div className="h-screen overflow-auto ">
      <div className="flex justify-center items-center vh-100">
        <div className="xl:px-20 px-10 py-10 w-1/2 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold my-10">CHANGE PASSWORD</h1>
          <Form layout="vertical" onFinish={onFinish}>
            {/* Password */}
            <Form.Item
              label="Password"
              name={"password"}
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
            {/* Password */}
            <Form.Item
              label="New Password"
              name={"password"}
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
            <Form.Item>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mr-2"
                  size="large"
                >
                  Update
                </Button>
                <Link to="/Supervisor">
                <Button htmlType="button" size="large">
                  Cancel
                </Button>
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default SupervisorPassword;
