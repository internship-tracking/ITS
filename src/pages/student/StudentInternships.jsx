import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Space, Upload, message, Popconfirm } from "antd";
import { DownloadOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import StudentNavbar from "../../components/navbar/StudentNavbar";
import { saveAs } from "file-saver";


const StudentInternships = () => {
    const studentId = useSelector((state) => state.auth.userId);
    const [dataSource, setDataSource] = useState();

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
                        <Upload beforeUpload={(file) => uploadInternshipBook(record.id, file)}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    )}
                </Space>
            ),
        },
    ];

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

    const uploadInternshipBook = async (internshipId, file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `http://localhost:5000/api/internships/${internshipId}/internshipbook`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                message.success("Internship book uploaded successfully");
                // Perform any additional actions after successful upload
            }
        } catch (error) {
            console.error("Error uploading internship book:", error);
            message.error("Failed to upload internship book");
        }
    };


    const deleteInternshipBook = (internshipId) => {
        // Make a request to the backend to delete the internship book based on the internshipId
        axios
            .delete(`http://localhost:5000/api/internships/${internshipId}/internshipbook`)
            .then(() => {
                // Update the dataSource by removing the internship book URL
                setDataSource((prevDataSource) => {
                    const updatedDataSource = prevDataSource.map((item) => {
                        if (item.id === internshipId) {
                            return { ...item, internshipBook: "" };
                        }
                        return item;
                    });
                    return updatedDataSource;
                });
                // Display a success message to the user
                message.success("Internship book deleted successfully.");
            })
            .catch((error) => {
                console.error("Failed to delete internship book:", error);
                // Display an error message to the user
                message.error("Failed to delete internship book. Please try again.");
            });
    };


    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/internships/${studentId}`);
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

