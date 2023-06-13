import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import StudentNavbar from "../../components/navbar/StudentNavbar";

const StudentApplications = () => {
    const studentId = useSelector((state) => state.auth.userId);
    const testApplications = [
        {
            id: 1,
            name: "Application 1",
            department: "Department 1",
            status: "Pending",
        },
        {
            id: 2,
            name: "Application 2",
            department: "Department 2",
            status: "Approved",
        },
        {
            id: 3,
            name: "Application 3",
            department: "Department 3",
            status: "Rejected",
        },
    ];
    const [dataSource, setDataSource] = useState(testApplications);

    const deleteApplication = (applicationId) => {
        setDataSource((prevDataSource) =>
            prevDataSource.filter((item) => item.id !== applicationId)
        );
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`/api/applications/${studentId}`);
                setDataSource(response.data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            }
        };

        fetchApplications();
    }, [studentId]);

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
            title: "Action",
            render: (record) => (
                <Popconfirm
                    title="Are you sure you want to delete this application?"
                    onConfirm={() => deleteApplication(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger" icon={<DeleteOutlined />} size="small">
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <StudentNavbar />
            <div className="px-6 py-6 w-4/5 mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">My Applications</h1>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    );
};

export default StudentApplications;
