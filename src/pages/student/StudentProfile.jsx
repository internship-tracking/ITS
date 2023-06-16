import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentNavbar from "../../components/navbar/StudentNavbar";

const { Option } = Select;

const StudentProfile = () => {
    const [userData, setUserData] = useState(null);
    const studentId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/students/${studentId}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            }); // Simulate getting data from API
    }, [studentId]);

    const onFinish = async (values) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/students/${studentId}`, {
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

    if (!userData) return "Loading...";

    return (
        <>
            <StudentNavbar />
            <div className="h-screen overflow-auto">
                <div className="flex justify-center vh-100">
                    <div className="xl:px-20 px-10 py-10 w-1/2 flex flex-col h-full justify-center relative">
                        <h1 className="text-center text-5xl font-bold mb-2 ">PROFILE</h1>
                        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
                            <Form.Item
                                label="Student Number"
                                name="studentNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: "Student number is required!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Name */}
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
                            {/* Surname */}
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
                            {/* Class Year */}
                            <Form.Item
                                label="Class Year"
                                name="classYear"
                                rules={[
                                    {
                                        required: true,
                                        message: "Class year is required!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* GPA */}
                            <Form.Item
                                label="GPA"
                                name="gpa"
                                rules={[
                                    {
                                        required: true,
                                        message: "GPA is required!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Email */}
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
                            {/* Phone */}
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
                            {/* Address */}
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Address is required!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Department */}
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

export default StudentProfile;
