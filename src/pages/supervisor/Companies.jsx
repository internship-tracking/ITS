import React, { useState, useEffect } from "react";
import axios from "axios";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Button, Modal, Input } from "antd";
import { EyeOutlined, CloseSquareFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Companies = () => {
  const [dataSource, setDataSource] = useState([]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectedRecord, setRejectedRecord] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/companies");
        setDataSource(response.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchData();
  }, []);

  const handleReject = (record) => {
    setRejectedRecord(record);
    setRejectReason(""); // reset the reject reason
    setRejectModalVisible(true);
  };

  const handleRejectModalOk = () => {
    if (rejectReason) {
      setDataSource((prev) => {
        return prev.filter((student) => student.id !== rejectedRecord.id);
      });
      setRejectModalVisible(false);
      setRejectReason(""); // reset the reject reason
      setRejectedRecord(null); // reset the rejected record
    }
  };

  const handleRejectModalCancel = () => {
    setRejectModalVisible(false);
    setRejectReason(""); // reset the reject reason
    setRejectedRecord(null); // reset the rejected record
  };

  const handleRejectReasonChange = (e) => {
    setRejectReason(e.target.value);
  };

  const columns = [
    {
      key: "1",
      title: "Company Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Sector",
      dataIndex: "sector",
    },
    {
      key: "3",
      title: "Location",
      dataIndex: "location",
    },
    {
      key: "4",
      title: "Contact",
      dataIndex: "contact",
    },
    {
      key: "5",
      title: "View",
      render: (record) => {
        return (
          <>
            <Link to={`/`}>
              <EyeOutlined style={{ color: "blue", fontSize: 18 }} />
            </Link>
          </>
        );
      },
    },

    {
      key: "6",
      title: "Reject",
      render: (record) => (
        <Button onClick={() => handleReject(record)} type="link">
          <CloseSquareFilled style={{ color: "red", fontSize: 35 }} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <SupervisorNavbar />
      <div className="px-6 py-6">
        <h1 className="text-4xl font-bold text-center mb-4">Companies</h1>
        <Table className="px-20" columns={columns} dataSource={dataSource} />
      </div>

      <Modal
        title="Reject Reason"
        visible={rejectModalVisible}
        onOk={handleRejectModalOk}
        onCancel={handleRejectModalCancel}
        bodyStyle={{ paddingTop: 0 }} // adjust the top padding of the modal body
      >
        <Input.TextArea
          placeholder="Enter the reason for rejection"
          value={rejectReason}
          onChange={handleRejectReasonChange}
          autoSize={{ minRows: 4, maxRows: 6 }} // adjust the number of rows displayed
          style={{ resize: "none", paddingTop: 8, paddingLeft: 8 }} // adjust the padding and resize behavior
          autoFocus // automatically focus on the input field when the modal opens
        />
      </Modal>
    </>
  );
};

export default Companies;
