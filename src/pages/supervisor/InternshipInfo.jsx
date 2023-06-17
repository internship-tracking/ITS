import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Modal, Button, Space, Radio, Input, message } from "antd";
import { FileTextTwoTone, DownloadOutlined, CheckCircleFilled, CloseCircleFilled, CloseSquareFilled, CheckSquareFilled } from "@ant-design/icons";
import { saveAs } from "file-saver";
import moment from "moment";

const InternshipInfo = () => {
  const supervisorId = useSelector((state) => state.auth.userId);
  const [size, setSize] = useState('large'); // default is 'middle'
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/supervisors/${supervisorId}/internships`);
        console.log(response.data);
        setDataSource(response.data.internships);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
      }
    };

    fetchInternships();
  }, [supervisorId]);

  const columns = [
    {
      key: "1",
      title: "Full Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Company",
      dataIndex: "companyName",
    },
    {
      key: "3",
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => moment(startDate).format("YYYY-MM-DD"),
    },
    {
      key: "4",
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("YYYY-MM-DD"),
    },
    {
      key: "5",
      title: "Download Internship Book",
      render: (record) => (
        <>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}></Radio.Group>
          <Space direction="vertical">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size={size}
              onClick={() => downloadInternshipBook(record.internshipBook)}
            >
              Download
            </Button>
          </Space>
        </>
      ),
    },
    {
      key: "6",
      title: "Approve of Internship Book",
      render: (record) => (
        <Space className="flex flex-wrap  gap-4">
          {record.status === "APPROVED" ? (
            <div className="flex items-center">
              <CheckCircleFilled className="text-green-500" style={{ fontSize: "20px" }} />
              <span className="ml-2">{record.status}</span>
            </div>
          ) : record.status === "REJECTED" ? (
            <div className="flex items-center">
              <CloseCircleFilled className="text-red-500" style={{ fontSize: "20px" }} />
              <span className="ml-2">{record.status}</span>
            </div>
          ) : (
            <Button type="link" onClick={() => setModalVisible(record.id)}>
              <FileTextTwoTone style={{ fontSize: 25 }} />
            </Button>
          )}
        </Space>
      ),
    },
    {
      key: "7",
      title: "Download Evaluation Form",
      render: (record) => (
        <>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}></Radio.Group>
          <Space direction="vertical">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size={size}
              onClick={() => downloadEvaluationForm(record.evaluationForm)}
            >
              Download
            </Button>
          </Space>
        </>
      ),
    },
    {
      key: "8",
      title: "Approve",
      render: (record) => (
        <Button onClick={() => onApproveStudent(record)} type="link">
          <CheckSquareFilled style={{ color: "green", fontSize: 35 }} />
        </Button>
      ),
    },
    {
      key: "9",
      title: "Reject",
      render: (record) => (
        <Button type="link" onClick={() => onRejectStudent(record)}>
          <CloseSquareFilled style={{ color: "red", fontSize: 35 }} />
        </Button>
      ),
    },
  ];

  const onApproveStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to approve this internship?",
      okText: "Yes",
      okType: "primary",
      onOk: async () => {
        try {
          await axios.patch(`http://localhost:5000/api/internships/${record.id}`, { status: "Approved" });
          setDataSource((prev) => {
            return prev.filter((internship) => internship.id !== record.id);
          });

          const successModal = Modal.success({
            content: "The internship has been approved.",
            footer: null, // Hide the button
          });
          setTimeout(() => {
            successModal.destroy();
          }, 2000);
        } catch (error) {
          throw new Error("Failed to approve internship: " + error.message);
        }
      },
    });
  };

  const onRejectStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to reject this internship?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          await axios.patch(`http://localhost:5000/api/internships/${record.id}`, { status: "Rejected" });
          setDataSource((prev) => {
            return prev.filter((internship) => internship.id !== record.id);
          });
        } catch (error) {
          throw new Error("Failed to reject internship: " + error.message);
        }
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

    // Send API request to update the internship book status to "APPROVED"
    axios.put(`http://localhost:5000/api/internships/${id}`, { internshipBookStatus: "APPROVED" })
      .then((response) => {
        // Handle success response if needed
        console.log(response.data.message);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Failed to update internship book status:", error);
      });
  };

  const handleReject = (id) => {
    if (rejectionReason.trim() === "") {
      message.warning("Please provide feedback for the rejection.");
      return;
    }
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
    setRejectionReason("");

    // Send API request to update the internship book status to "REJECTED"
    axios.put(`http://localhost:5000/api/internships/${id}`, { internshipBookStatus: "REJECTED" })
      .then((response) => {
        // Handle success response if needed
        console.log(response.data.message);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Failed to update internship book status:", error);
      });
  };

  const downloadInternshipBook = (internshipId) => {
    // Make a request to download the internship book
    axios({
      url: `http://localhost:5000/api/internships/${internshipId}/internshipbook`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const filename = getFilenameFromResponse(response);

        // Trigger the download using file-saver
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, filename);
      })
      .catch((error) => {
        console.error("Error downloading internship book:", error);
        message.error("Failed to download internship book");
      });
  };

  const getFilenameFromResponse = (response) => {
    const contentDispositionHeader = response.headers["content-disposition"];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, "");
    }
    return "internship-book.pdf";
  };
  const downloadEvaluationForm = (internshipId) => {
    // Make a request to download the internship book
    axios({
      url: `http://localhost:5000/api/internships/${internshipId}/evaluation`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const filename = getFilenameFromResponse(response);

        // Trigger the download using file-saver
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, filename);
      })
      .catch((error) => {
        console.error("Error downloading internship book:", error);
        message.error("Failed to download internship book");
      });
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