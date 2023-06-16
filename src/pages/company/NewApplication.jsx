import React from "react";
import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Button, Modal, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import { MdWarning } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;


const NewApplication = () => {
  const companyId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const successModal = Modal.success({
      content: "The application has been created successfully.",
      footer: null,
    });

    setTimeout(() => {
      successModal.destroy(); // Modal'ı kapat
    }, 1000); // 2 saniye beklet
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Option } = Select;

  const onFinish = (values) => {

    axios
      .post(`http://localhost:5000/api/companies/${companyId}/internship-announcements`, values)
      .then((response) => {
        setIsModalOpen(false);
        Modal.success({
          content: "The announcement has been created successfully.",
          footer: null,
        });
      })
      .catch((error) => {
        console.error("Error creating announcement:", error);
        Modal.error({
          title: "Error",
          content: "An error occurred while creating the announcement.",
        });
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
            <Form layout="vertical" onFinish={onFinish}>
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
                  <Option value="positive">
                    The school provides insurance.
                  </Option>
                  <Option value="negative">
                    The school does not provide insurance.
                  </Option>
                  <Option value="notmatter">
                    Insurance situation does not matter.
                  </Option>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  onClick={showModal}
                >
                  Create a New Application
                </Button>
                <Modal
                  title={
                    <div className="flex items-center text-2xl ">
                      <MdWarning className="text-yellow-500 mr-2" />
                      <span>Warning!</span>
                    </div>
                  }
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  closable={false}
                >
                  <p>Do you approve it?</p>
                  <p>
                    When you create an application, you can not edit it again.
                  </p>
                </Modal>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewApplication;
