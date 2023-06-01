import CompanyNavbar from "../../components/navbar/CompanyNavbar";
import { Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Application = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Software",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 2,
      name: "Hardware",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 3,
      name: "DevOps",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 4,
      name: "Data Science",
      number: 99,
      type: "Compulsory",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Number of Applications",
      dataIndex: "number",
    },
    {
      key: "3",
      title: "View ",
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
      key: "4",
      title: "Edit",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditApplication(record);
              }}
              style={{ fontSize: 18 }}
            />
          </>
        );
      },
    },
    {
      key: "5",
      title: "Delete",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                onDeleteApplication(record);
              }}
              style={{ color: "red", fontSize: 18 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteApplication = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((application) => application.id !== record.id);
        });
      },
    });
  };
  const onEditApplication = (record) => {
    setIsEditing(true);
    setEditingApplication({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingApplication(null);
  };
  return (
    <>
      <CompanyNavbar />
      <div className="px-6 py-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Internship Applications
        </h1>
        <Table
          className="px-20"
          columns={columns}
          dataSource={dataSource}
        ></Table>
        <Modal
          title="Edit Application"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((application) => {
                if (application.id === editingApplication.id) {
                  return editingApplication;
                } else {
                  return application;
                }
              });
            });
            resetEditing();
          }}
        >
          <label htmlFor="name">Internship Name</label>
          <Input className="mb-2"
            value={editingApplication?.name}
            onChange={(e) => {
              setEditingApplication((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <label htmlFor="type">Internship Type</label>
          <Input className="mb-2"
            value={editingApplication?.type}
            onChange={(e) => {
              setEditingApplication((pre) => {
                return { ...pre, department: e.target.value };
              });
            }}
          />
          
        </Modal>
      </div>
    </>
  );
};

export default Application;
