import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Modal, Button, Space, Radio, Input } from "antd";
import {
    DeleteOutlined,
    EyeOutlined,
    CloseCircleFilled,
    CheckCircleFilled,
    CloseSquareFilled,
    CheckSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const InternshipApplications = () => {
    const supervisorId = useSelector((state) => state.auth.userId);
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            name: "f",
            date: "01.01.2021 - 01.02.2021",
            status: "Pending",
            department: "Department 1",
        },
        {
            id: 2,
            name: "n",
            date: "01.01.2021 - 01.02.2021",
            status: "Pending",
            department: "Department 2",
        },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.post("/api/applications", {
                    supervisorId,
                });
                setDataSource(response.data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            }
        };

        fetchApplications();
    }, [supervisorId]);

    const handleApproval = (record) => {
        const updatedDataSource = dataSource.map((item) => {
            if (item.id === record.id) {
                return {
                    ...item,
                    status: "Approved",
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
    };



    const handleRejection = (record) => {
        setSelectedApplication(record);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedApplication(null);
        setRejectionReason("");
    };

    const handleReject = () => {
        const updatedDataSource = dataSource.map((item) => {
            if (item.id === selectedApplication.id) {
                return {
                    ...item,
                    status: "Rejected",
                    rejectionReason: rejectionReason,
                };
            }
            return item;
        });
        setDataSource(updatedDataSource);
        closeModal();
    };

    const columns = [
        {
            key: "1",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "2",
            title: "Department",
            dataIndex: "department",
        },
        {
            key: "3",
            title: "Status",
            dataIndex: "status",
        },
        {
            key: "4",
            title: "View",
            render: (record) => {
                return (
                    <>
                        <Link to={`/internship-applications/${record.id}`}>
                            <EyeOutlined style={{ color: "blue", fontSize: 18 }} />
                        </Link>
                    </>
                );
            },
        },
        {
            key: "5",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        {record.status === "Pending" && (
                            <>
                                <Button
                                    type="primary"
                                    className="mr-2"
                                    onClick={() => handleApproval(record)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => handleRejection(record)}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {record.status === "Approved" && (
                            <>
                                <CheckCircleFilled style={{ color: "green", fontSize: 18 }} />
                                <span>Approved</span>
                            </>
                        )}
                        {record.status === "Rejected" && (
                            <>
                                <CloseCircleFilled style={{ color: "red", fontSize: 18 }} />
                                <span>Rejected: {record.rejectionReason}</span>
                            </>
                        )}
                    </>
                );
            },
        },

    ];

    return (
        <>
            <SupervisorNavbar />
            <div className="px-6 py-6 w-4/5 mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Internship Applications</h1>
                <Table dataSource={dataSource} columns={columns} />
                <Modal
                    title="Rejection Reason"
                    visible={modalVisible}
                    onCancel={closeModal}
                    footer={[
                        <Button key="cancel" onClick={closeModal}>
                            Cancel
                        </Button>,
                        <Button key="reject" type="danger" onClick={handleReject}>
                            Reject
                        </Button>,
                    ]}
                >
                    <Input
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter rejection reason"
                    />
                </Modal>
            </div>
        </>
    );
};

export default InternshipApplications;

