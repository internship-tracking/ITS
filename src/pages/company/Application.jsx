import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Table, Modal, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined, CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";


const Application = () => {
  const companyId = localStorage.getItem('userId');
  const [announcementId, setAnnouncementId] = useState(null);
  const [tooltipData, setTooltipData] = useState([]);
  const [dataSource, setDataSource] = useState([

  ]);

  const [tableData, setTableData] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);

  const renderTooltipContent = (record) => {
    const student = tableData.find((item) => item.id === record.id);
    if (student) {
      return (
        <div>
          <p>Name: {student.name}</p>
          <p>Surname: {student.surname}</p>
          <p>Class Year: {student.classYear}</p>
          <p>GPA: {student.gpa}</p>
          <p>Email: {student.email}</p>
          <p>Phone: {student.phone}</p>
          <p>Address: {student.address}</p>
          {/* Add more student information fields as needed */}
        </div>
      );
    }
    return null;
  };

  const columns = [
    {
      key: "1",
      title: "Full Name",
      dataIndex: "internshipName",
    },
    {
      key: "2",
      title: "Number of Applications",
      render: (record) => <span>{record.applications.length}</span>,
    },
    {
      key: "3",
      title: "View",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            setAnnouncementId(record.id);
            setModalVisible(true);
          }}
        >
          <EyeOutlined style={{ color: "blue", fontSize: 20 }} />
        </Button>
      ),
    },
    {
      key: "4",
      title: "Delete",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            onDeleteAnnouncement(record);
          }}
        >
          <DeleteOutlined style={{ color: "red", fontSize: 20 }} />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/api/internship-announcements/${companyId}`)
        .then((response) => {
          setDataSource(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching internship announcements:", error);
        });
    };

    fetchData(); // Initial data fetch

    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);



  // Fetch internship applications data for a specific announcement
  useEffect(() => {
    if (announcementId) {
      console.log(announcementId);
      axios
        .get(`http://localhost:5000/api/internship-announcements/${announcementId}/applications`)
        .then((response) => {
          const applications = response.data;
          setTableData(
            applications.map((application) => {
              const {
                _id: applicationId,
                student: { name, surname },
              } = application;
              return {
                applicationId,
                studentName: name,
                studentSurname: surname,
              };
            })
          );
          setTooltipData(
            applications.map((application) => {
              const { student, ...rest } = application;
              return { student, ...rest };
            })
          );
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [announcementId]);




  const onDeleteAnnouncement = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this announcement?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        // Delete the application from the backend
        axios
          .delete(`http://localhost:5000/api/internship-announcements/${record.id}`)
          .then((response) => {
            console.log("Announcement deleted successfully!");
            setDataSource((prev) =>
              prev.filter((announcement) => announcement.id !== record.id)
            );
          })
          .catch((error) => {
            console.error("Error deleting announcement:", error);
          });
      },
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const tableColumns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <Tooltip title={renderTooltipContent(record)}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      key: "2",
      title: "Approve",
      render: (record) => (
        <Button
          onClick={() => {
            onApproveApplication(record);
          }}
          type="link"
        >
          <CheckSquareFilled style={{ color: "green", fontSize: 35 }} />
        </Button>
      ),
    },
    {
      key: "3",
      title: "Reject",
      render: (record) => (
        <Button
          type="link"
          onClick={() => {
            onRejectApplication(record);
          }}
        >
          <CloseSquareFilled style={{ color: "red", fontSize: 35 }} />
        </Button>
      ),
    },
  ];

  const onApproveApplication = (record) => {
    Modal.confirm({
      title: "Are you sure you want to approve this application?",
      okText: "Yes",
      okType: "primary",
      onOk: () => {
        // Send the approval request to the backend with updated status
        axios
          .patch(`http://localhost:5000/api/internship-applications/${record.id}`, { status: "Waiting for supervisor approval" }) // Include the updated status in the request body
          .then((response) => {
            console.log("Application approved successfully!");
            setTableData((prev) =>
              prev.filter((application) => application.id !== record.id)
            );
            const successModal = Modal.success({
              content: "The application has been approved.",
              footer: null, // Hide the button
            });

            setTimeout(() => {
              successModal.destroy(); // Close the modal
            }, 2000); // Wait for 2 seconds
          })
          .catch((error) => {
            console.error("Error approving application:", error);
          });
      },
    });
  };


  const onRejectApplication = (record) => {
    Modal.confirm({
      title: "Are you sure you want to reject this application?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        // Send the rejection request to the backend
        axios
          .patch(`http://localhost:5000/api/internship-applications/${record.id}`, { status: "Rejected" })
          .then((response) => {
            console.log("Application rejected successfully!");
            setTableData((prev) =>
              prev.filter((application) => application.id !== record.id)
            );
          })
          .catch((error) => {
            console.error("Error rejecting application:", error);
          });
      },
    });
  };



  return (
    <>
      <CompanyNavbar />
      <div className="px-6 py-6 w-4/5 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Internship Applications
        </h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title={<div className="text-center">Student Information</div>}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <Table columns={tableColumns} dataSource={tableData} />
        </Modal>
      </div>
    </>
  );
};

export default Application;

