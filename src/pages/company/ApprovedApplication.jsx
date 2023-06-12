import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Table, Modal, Button, Space, Upload } from "antd";
import { useState } from "react";
import {
  FileTextTwoTone,
  UploadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";

const ApprovedApplication = () => {
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "İlke Aşağıçayır",
      date: "01.01.2021 - 01.02.2021",
      status: "",
    },
    {
      id: 2,
      name: "Ozan Berk",
      date: "01.01.2021 - 01.02.2021",
      status: "",
    },
    {
      id: 3,
      name: "Melda İrem",
      date: "01.01.2021 - 01.02.2021",
      status: "",
    },
    {
      id: 4,
      name: "Elif Nur",
      date: "01.01.2021 - 01.02.2021",
      status: "",
    },
    {
      id: 5,
      name: "Erkan Kayım",
      date: "01.01.2021 - 01.02.2021",
      status: "",
    },
  ]);

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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="evaluation-form"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
        </Space>
      ),
    },
  ];

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleApprove = (id) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: "APPROVED",
        };
      }
      return item;
    });
    setDataSource(updatedDataSource);
    setModalVisible(false);
  };

  const handleReject = (id) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: "REJECTED",
        };
      }
      return item;
    });
    setDataSource(updatedDataSource);
    setModalVisible(false);
  };

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
