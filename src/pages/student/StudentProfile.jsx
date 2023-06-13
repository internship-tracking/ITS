import { Button, Form, Input } from "antd";
import StudentNavbar from "../../components/navbar/StudentNavbar";


const StudentProfile = () => {
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
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <StudentNavbar />
            <div className="h-screen overflow-auto">
                <div className="flex justify-center vh-100">
                    <div className="xl:px-20 px-10 py-10 w-1/2 flex flex-col h-full justify-center relative">
                        <h1 className="text-center text-5xl font-bold mb-2 ">PROFILE</h1>
                        <Form layout="vertical" onFinish={onFinish}>
                            {/* Hocanın Adı */}
                            <Form.Item
                                label="Supervisor Name"
                                name={"supervisorname"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Supervisor Name must be required!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Departman */}
                            <Form.Item label="Department" name={"department"}>
                                <Input value="department" />
                            </Form.Item>
                            {/* Telephone */}
                            <Form.Item label="Contact Number" name={"contact"}>
                                <Input value="contact" />
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
