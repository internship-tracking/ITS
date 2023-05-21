import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Table, Modal, Button } from "antd";
import { useState } from "react";
import { DeleteOutlined, EyeOutlined, CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";

const Application = () => {
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Software",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 2,
      name: "Hardware",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 3,
      name: "DevOps",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 4,
      name: "Data Science",
      number: 99,
      type: "Compulsory",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Number of Applications",
      dataIndex: "number",
    },
    {
      key: "3",
      title: "View",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <EyeOutlined style={{ color: "blue", fontSize: 20 }}/>
        </Button>
        
      ),
    },
    {
      key: "4",
      title: "Delete",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            onDeleteApplication(record);
          }}
        >
          <DeleteOutlined style={{ color: "red", fontSize: 20 }}/>
        </Button>
      ),
    },
  ];

  const onDeleteApplication = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this application?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((application) => application.id !== record.id);
        });
      },
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const tableColumns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Approve",
      render: (record) => (
        <Button
        onClick={() => {
          onApproveStudent(record);
        }}
          type="link"
        >
          <CheckSquareFilled  style={{ color: "green", fontSize: 35 }}/>
        </Button>
      ),
    },
    {
      key: "3",
      title: "Reject",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            onRejectStudent(record);
          }}
        >
          <CloseSquareFilled 
          style={{ color: "red", fontSize: 35 }}
        />
        </Button>
        
      ),
    },
  ];

  const onApproveStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to approve this student?",
      okText: "Yes",
      okType: "primary",
      onOk: () => {
        setDataSource2((prev) => {
          return prev.filter((student) => student.id !== record.id);
        });
        const successModal = Modal.success({
          content: "The student has been approved.",
          footer: null, // Buton gösterme
        });
      
        setTimeout(() => {
          successModal.destroy(); // Modal'ı kapat
        }, 2000); // 2 saniye beklet
      },
    });
  };

  const onRejectStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to reject this student?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource2((prev) => {
          return prev.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const [tableData, setDataSource2] = useState([
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
    },
    {
      id: 3,
      name: "İlke Aşağıçayır",
    },
    {
      id: 4,
      name: "Mehmet Yılmaz",
    },
    {
      id: 5,
      name: "Ayşe Yılmaz",
    },
    {
      id: 6,
      name: "Fatma Yılmaz",
    },
    // Add more data rows as needed
  ]);

  return (
    <>
      <CompanyNavbar />
      <div className="px-6 py-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Internship Applications
        </h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title={<div className="text-center">Student Information</div>}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <Table columns={tableColumns} dataSource={tableData} />
        </Modal>
      </div>
    </>
  );
};

export default Application;
