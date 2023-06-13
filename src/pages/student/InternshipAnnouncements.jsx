import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Modal } from "antd";
import StudentNavbar from "../../components/navbar/StudentNavbar";

const InternshipAnnouncements = () => {
    const studentId = useSelector((state) => state.auth.userId);
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            company: {
                name: "Company A",
            },
            sector: "Sector 1",
            location: "Location 1",
            contactNumber: "123456789",
            internshipName: "Internship 1",
            internshipType: "Type 1",
            internshipProgram: "Program 1",
            insuranceSituation: "Situation 1",
            dateRange1: "2023-01-01",
            dateRange2: "2023-02-01",
            departmentNames: "Department 1",
            studentDepartmentNames: "Student Department 1",
        },
        {
            id: 2,
            company: {
                name: "Company B",
            },
            sector: "Sector 2",
            location: "Location 2",
            contactNumber: "987654321",
            internshipName: "Internship 2",
            internshipType: "Type 2",
            internshipProgram: "Program 2",
            insuranceSituation: "Situation 2",
            dateRange1: "2023-03-01",
            dateRange2: "2023-04-01",
            departmentNames: "Department 2",
            studentDepartmentNames: "Student Department 2",
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get("/api/announcements");
                setDataSource(response.data);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleApplication = (record) => {
        setSelectedAnnouncement(record);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedAnnouncement(null);
    };

    const handleApply = () => {
        // Logic to submit the application
        const applicationData = {
            studentId,
            announcementId: selectedAnnouncement.id,
        };

        // Send the application data to the server using axios or fetch
        // Example axios request:
        axios.post("/api/apply", applicationData)
            .then((response) => {
                // Handle the success response
                console.log("Application submitted successfully:", response.data);
                closeModal();
            })
            .catch((error) => {
                // Handle the error response
                console.error("Failed to submit application:", error);
            });
    };

    const columns = [
        {
            key: "1",
            title: "Company",
            dataIndex: "company",
            render: (company) => company.name, // Assuming the company object has a "name" property
        },
        {
            key: "2",
            title: "Sector",
            dataIndex: "sector",
        },
        // Add more columns as needed
        // Modify the dataIndex to match the corresponding field in the announcement object
        {
            key: "apply",
            title: "Action",
            render: (record) => (
                <Button type="primary" onClick={() => handleApplication(record)}>
                    Apply
                </Button>
            ),
        },
    ];

    return (
        <>
            <StudentNavbar />
            <div className="px-6 py-6 w-4/5 mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">Internship Announcements</h1>
                <Table dataSource={dataSource} columns={columns} />
                <Modal
                    title="Application Form"
                    visible={modalVisible}
                    onCancel={closeModal}
                    footer={[
                        <Button key="cancel" onClick={closeModal}>
                            Cancel
                        </Button>,
                        <Button key="apply" type="primary" onClick={handleApply}>
                            Apply
                        </Button>,
                    ]}
                >
                    {/* Remove the application message input field */}
                </Modal>
            </div>
        </>
    );
};

export default InternshipAnnouncements;
