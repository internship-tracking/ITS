import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Modal } from "antd";
import { useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Students = () => {

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "x",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 2,
      name: "y",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 3,
      name: "z",
      number: 99,
      type: "Compulsory",
    },
    {
      id: 4,
      name: "w",
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
      title: "Department",
      dataIndex: "department",
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
      key: "",
      title: "Delete",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                onDeleteStudents(record);
              }}
              style={{ color: "red", fontSize: 18 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteStudents = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  return (
    <>
      <SupervisorNavbar />
      <div className="px-6 py-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Students
        </h1>
        <Table
          className="px-20"
          columns={columns}
          dataSource={dataSource}
        ></Table>
       
      </div>
    </>
  );
};

export default Students;
