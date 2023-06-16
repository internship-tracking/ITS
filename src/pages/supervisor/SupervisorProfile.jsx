import { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";

const { Option } = Select;

const SupervisorProfile = () => {
  const [userData, setUserData] = useState({
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    departmentName: "department1"
  });

  const supervisorId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/supervisors/${supervisorId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [supervisorId]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/supervisors/${supervisorId}`, {
        ...userData,
        ...values
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SupervisorNavbar />
      <div className="h-screen overflow-auto">
        <div className="flex justify-center vh-100">
          <div className="xl:px-20 px-10 py-10 w-1/2 flex flex-col h-full justify-center relative">
            <h1 className="text-center text-5xl font-bold mb-2 ">PROFILE</h1>
            <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="surname"
                rules={[
                  {
                    required: true,
                    message: "Surname is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Department"
                name="departmentName"
                rules={[
                  {
                    required: true,
                    message: "Department is required!",
                  },
                ]}
              >
                <Select>
                  <Option value="department1">Department 1</Option>
                  <Option value="department2">Department 2</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Phone is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-end mb-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mr-2"
                    size="large"
                  >
                    Update
                  </Button>
                  <Button htmlType="button" size="large">
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorProfile;
