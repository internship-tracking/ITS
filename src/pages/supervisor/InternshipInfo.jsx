import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Modal, Button, Space, Radio, Input, message } from "antd";
import { FileTextTwoTone, DownloadOutlined, CheckCircleFilled, CloseCircleFilled, CloseSquareFilled, CheckSquareFilled } from "@ant-design/icons";


const InternshipInfo = () => {
  const supervisorId = useSelector((state) => state.auth.userId);
  const [size, setSize] = useState('large'); // default is 'middle'
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/internship-info", {
          supervisorId,
        });
        setDataSource(response.data);
      } catch (error) {
        console.error("Failed to fetch internship info:", error);
      }
    };

    fetchData();
  }, [supervisorId]);

  const columns = [
    {
      key: "1",
      title: "Full Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Download Internship Book",

      render: (record) => (
        <>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          </Radio.Group>
          <Space direction="vertical">
            <Button type="primary" icon={<DownloadOutlined />} size={size}>
              Download
            </Button>
          </Space>
        </>
      ),
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
        <>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          </Radio.Group>
          <Space direction="vertical">
            <Button type="primary" icon={<DownloadOutlined />} size={size}>
              Download
            </Button>
          </Space>
        </>
      ),
    },
    {
      key: "5",
      title: "Approve",
      render: (record) => (
        <Button
          onClick={() => {
            onApproveStudent(record);
          }}
          type="link"
        >
          <CheckSquareFilled style={{ color: "green", fontSize: 35 }} />
        </Button>
      ),
    },
    {
      key: "6",
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
      title: "Are you sure you want to approve this internship.",
      okText: "Yes",
      okType: "primary",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((internship) => internship.id !== record.id);
        });
        const successModal = Modal.success({
          content: "The internship has been approved.",
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
      title: "Are you sure you want to reject this internship?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((internship) => internship.id !== record.id);
        });
      },
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setRejectionReason("");
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
    setRejectionReason("");
  };

  const handleReject = (id) => {

    const updatedDataSource = dataSource.map((item) => {
      if (rejectionReason.trim() === "") {
        const errorModal = Modal.error({
          content: "Please provide a feedback for the rejection.",
          footer: null, // Buton gösterme
        });

        setTimeout(() => {
          errorModal.destroy(); // Modal'ı kapat
        }, 2000); // 2 saniye beklet
        //message.error("Please provide a feedback for the rejection.");
        //return item;
      }
      else if (item.id === id) {
        return {
          ...item,
          status: "REJECTED",
        };

      }
      return item;
    });
    setDataSource(updatedDataSource);
    setModalVisible(false);
    setRejectionReason("");
  };



  return (
    <>
      <SupervisorNavbar />
      <div className="px-6 py-6 w-4/5 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Internship Informations
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
          <div className="mt-4">
            <Input.TextArea
              placeholder="Enter the feedback for the internship notebook"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default InternshipInfo;
