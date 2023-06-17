import { Button, Form, Input } from "antd";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SupervisorPassword = () => {
  const supervisorId = useSelector((state) => state.auth.userId);

  const onFinish = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      // Display an error message or perform any other desired action
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/supervisors/${supervisorId}/change-password`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data); // You can do something with the response data
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
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Current password is required!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {/* New Password */}
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "New password is required!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {/* Confirm Password */}
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
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
