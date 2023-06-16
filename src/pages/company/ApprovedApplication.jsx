import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Table, Modal, Button, Space, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  FileTextTwoTone,
  UploadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";


const ApprovedApplication = () => {
  const companyId = useSelector((state) => state.auth.userId);
  const [dataSource, setDataSource] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      key: "1",
      title: "Full Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Dates of Internship",
      dataIndex: "date",
    },
    {
      key: "3",
      title: "Approve of Internship Book",
      render: (record) => (
        <Space className="flex flex-wrap  gap-4">
          {record.status === "APPROVED" ? (
            <div className="flex items-center">
              <CheckCircleFilled
                className="text-green-500"
                style={{ fontSize: "20px" }}
              />
              <span className="ml-2">{record.status}</span>
            </div>
          ) : record.status === "REJECTED" ? (
            <div className="flex items-center">
              <CloseCircleFilled
                className="text-red-500"
                style={{ fontSize: "20px" }}
              />
              <span className="ml-2">{record.status}</span>
            </div>
          ) : (
            <Button
              type="link"
              onClick={() => {
                setModalVisible(record.id);
              }}
            >
              <FileTextTwoTone style={{ fontSize: 25 }} />
            </Button>
          )}
        </Space>
      ),
    },
    {
      key: "4",
      title: "Upload of Evaluation Form",
      render: (record) => (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size="large"
        >
          <Upload
            action={`http://localhost:5000/api/internships/${record.id}/evaluation`}
            listType="evaluation-form"
            maxCount={1}
            beforeUpload={validateFile}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
        </Space>
      ),
    },
  ];

  const validateFile = (file) => {
    const isPdf = file.type === "application/pdf";
    const fileSizeLimit = 10; // Size limit in MB

    if (!isPdf) {
      message.error("Only PDF files are allowed!");
      return Upload.LIST_IGNORE;
    }

    if (file.size / 1024 / 1024 > fileSizeLimit) {
      message.error(`File size must be less than ${fileSizeLimit}MB!`);
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleApprove = async (id) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: 'APPROVED',
        };
      }
      return item;
    });
    setDataSource(updatedDataSource);
    setModalVisible(false);

    try {
      // Send updated status to the backend
      await axios.put(`http://localhost:5000/api/internships/${id}`, { newStatus: 'APPROVED' });
      console.log('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleReject = async (id) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: 'REJECTED',
        };
      }
      return item;
    });
    setDataSource(updatedDataSource);
    setModalVisible(false);

    try {
      // Send updated status to the backend
      await axios.put(`http://localhost:5000/api/internships/${id}`, { newStatus: 'REJECTED' });
      console.log('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  useEffect(() => {
    axios.get(`http://localhost:5000/api/companies/${companyId}/internships`)
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Error fetching internships:", error);
      });
  }, []);


  return (
    <>
      <CompanyNavbar />
      <div className="px-6 py-6 w-4/5 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Approved Applications
        </h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title={<div className="text-center">Internship Book</div>}
          visible={modalVisible !== false}
          onCancel={closeModal}
          footer={[
            <Button type="primary" onClick={() => handleApprove(modalVisible)}>
              Approve
            </Button>,
            <Button onClick={() => handleReject(modalVisible)}>Reject</Button>,
          ]}
        >
          <span className="flex justify-center">
            Do you approve the internship book?
          </span>
        </Modal>
      </div>
    </>
  );
};

export default ApprovedApplication;
