import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import StudentNavbar from "../../components/navbar/StudentNavbar";

const StudentApplications = () => {
    const studentId = useSelector((state) => state.auth.userId);
    const [dataSource, setDataSource] = useState();

    const deleteApplication = (applicationId) => {
        // Send the delete request to the backend
        axios
            .delete(`http://localhost:5000/api/internship-applications/${applicationId}`)
            .then((response) => {
                console.log("Internship Application deleted successfully!");
                setDataSource((prevDataSource) =>
                    prevDataSource.filter((item) => item.id !== applicationId)
                );
            })
            .catch((error) => {
                console.error("Error deleting internship application:", error);
            });
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${studentId}/applications`);
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
