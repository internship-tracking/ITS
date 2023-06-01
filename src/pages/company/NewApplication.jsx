import React from "react";
import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Button,message, DatePicker, Form, Input, Select } from "antd";
const { RangePicker } = DatePicker;

const NewApplication = () => {
  const { Option } = Select;
  
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'A new application has been created successfully.',
      duration: 5,
    });
  };

  return (
    <>
      <CompanyNavbar />
      <div className="h-screen overflow-auto">
        <div className="flex justify-center vh-100">
          <div className="xl:px-20 px-10 pt-10 pb-20 w-1/2 flex flex-col h-full justify-center relative">
            <h1 className="text-center text-3xl font-bold mb-2 ">
              Requested Information
            </h1>
            <Form layout="vertical">
              {/* Staj Adı */}
              <Form.Item
                label="Internship Name"
                name={"internshipName"}
                rules={[
                  {
                    required: true,
                    message: "Internship Name must be required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* Staj Türü (zorunlu, isteğe bağlı)*/}
              <Form.Item
                label="Internship Type"
                name={"internshipType"}
                rules={[
                  {
                    required: true,
                    message: "Internship Type must be required!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  <Option value="compulsory">Compulsory</Option>
                  <Option value="voluntary">Voluntary</Option>
                </Select>
              </Form.Item>
              {/* Staj programı (yerinde, uzaktan, hibrit)*/}
              <Form.Item
                label="Internship Program"
                name={"internshipProgram"}
                rules={[
                  {
                    required: true,
                    message: "Internship Program must be required!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  <Option value="atWorkplace">At Workplace</Option>
                  <Option value="remote">Remote</Option>
                  <Option value="hybrid">Hybrid</Option>
                </Select>
              </Form.Item>
              {/* Sigorta durumu (Sigortayı okul karşılar., Sigortayı okul karşılamaz., Sigorta durumu fark  etmez.)*/}
              <Form.Item
                label="Insurance Situation"
                name={"insuranceSituation"}
                rules={[
                  {
                    required: true,
                    message: "Insurance Situation must be required!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  <Option value="positive">The school provides insurance.</Option>
                  <Option value="negative">
                    The school does not provide insurance.
                  </Option>
                  <Option value="notmatter">Insurance situation does not matter.</Option>
                </Select>
              </Form.Item>
              {/* Staj yapılacak tarih aralığı */}
              <Form.Item
                label="Range of the Dates on which the Internship can be performed"
                name={"RangePicker1"}
                rules={[
                  {
                    required: true,
                    message: "Date Range must be required!",
                  },
                ]}
              >
                <RangePicker />
              </Form.Item>
              {/* Staja başvuru yapabileceği tarih aralığı */}
              <Form.Item
                label="Range of the Dates on which the Internship can be applied"
                name={"RangePicker2"}
                rules={[
                  {
                    required: true,
                    message: "Date Range must be required!",
                  },
                ]}
              >
                <RangePicker />
              </Form.Item>
              {/* Stajın açılacağı departmanlar */}
              <Form.Item
                label="Department Name(s)"
                name={"departmentName"}
                rules={[
                  {
                    required: true,
                    message: "Department Name(s) must be required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* Staja başvurabilecek öğrencilerin bölümleri */}
              <Form.Item
                label="Student's Department Name(s)"
                name={"studentDepartmentName"}
              >
                <Input />
              </Form.Item>
              {/* Button */}
              <Form.Item>
                {contextHolder}
                <Button
                  type="primary"
                  onClick={success}
                  htmlType="submit"
                  className="w-full"
                  size="large"
                >
                  Create a New Application
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewApplication;
