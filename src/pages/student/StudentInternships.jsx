import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Space, Upload, message, Popconfirm } from "antd";
import { DownloadOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import StudentNavbar from "../../components/navbar/StudentNavbar";


const StudentInternships = () => {
    const studentId = useSelector((state) => state.auth.userId);
    const testInternships = [
        {
            id: 1,
            company: {
                companyName: "ABC Company",
                sector: "Technology",
                location: "New York",
            },
            startDate: "2023-01-01",
            endDate: "2023-02-28",
            internshipBook: "https://example.com/internship-book-1.pdf",
        },
        {
            id: 2,
            company: {
                companyName: "XYZ Company",
                sector: "Finance",
                location: "London",
            },
            startDate: "2023-03-01",
            endDate: "2023-04-30",
            internshipBook: "", // Empty internship book field
        },
        // Add more test data as needed
    ];

    const [dataSource, setDataSource] = useState(testInternships);

    // Rest of the code...

    const columns = [
        {
            key: "1",
            title: "Company",
            dataIndex: "company",
            render: (company) => company.companyName,
        },
        {
            key: "2",
            title: "Sector",
            dataIndex: "company",
            render: (company) => company.sector,
        },
        {
            key: "3",
            title: "Location",
            dataIndex: "company",
            render: (company) => company.location,
        },
        {
            key: "4",
            title: "Start Date",
            dataIndex: "startDate",
        },
        {
            key: "5",
            title: "End Date",
            dataIndex: "endDate",
        },
        {
            key: "6",
            title: "Internship Book",
            render: (record) => (
                <Space>
                    {record.internshipBook ? (
                        <>
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={() => downloadInternshipBook(record.internshipBook)}
                            >
                                Download
                            </Button>
                            <Popconfirm
                                title="Are you sure you want to delete the internship book?"
                                onConfirm={() => deleteInternshipBook(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="danger" icon={<DeleteOutlined />}>
                                    Delete
                                </Button>
                            </Popconfirm>
                        </>
                    ) : (
                        <Upload beforeUpload={uploadInternshipBook}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    )}
                </Space>
            ),
        },
    ];

    const downloadInternshipBook = (internshipBookUrl) => {
        // Implement the logic to download the internship book
        // You can use a library like file-saver to trigger the download
    };

    const uploadInternshipBook = (file) => {
        // Implement the logic to upload the internship book
        // You can make a request to the backend to handle the file upload
        // Once the upload is successful, update the dataSource with the new internship book URL
        // Display a success message to the user
        message.success("Internship book uploaded successfully.");
        return false; // Prevent default upload behavior
    };

    const deleteInternshipBook = (internshipId) => {
        // Implement the logic to delete the internship book
        // You can make a request to the backend to delete the internship book based on the internshipId
        // Once the deletion is successful, update the dataSource by removing the internship book URL
        // Display a success message to the user
        message.success("Internship book deleted successfully.");
    };

    const openInternshipDetails = (internshipId) => {
        // Implement the logic to open the internship details modal
        // You can use Modal component from 'antd' and make a request to the backend to get the internship details based on the internshipId
        // Show the details in the modal
    };

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get(`/api/internships/${studentId}`);
                setDataSource(response.data);
            } catch (error) {
                console.error("Failed to fetch internships:", error);
            }
        };

        fetchInternships();
    }, [studentId]);

    return (
        <>
            <StudentNavbar />
            <div className="px-6 py-6 w-4/5 mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">My Internships</h1>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    );
};

export default StudentInternships;

