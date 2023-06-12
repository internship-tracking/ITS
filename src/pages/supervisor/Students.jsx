import SupervisorNavbar from "../../components/navbar/SupervisorNavbar";
import { Table, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Students = () => {
  const supervisorId = useSelector((state) => state.auth.userId);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post("/api/students", {
          supervisorId,
        });
        setDataSource(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [supervisorId]);

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

  const getStudents = (email, password) => async dispatch => {

    try {
      const response = await axios.post('http://localhost:5000/api', {
        supervisorId,

      });

      console.log(response.data)

    } catch (error) {
      //
    }
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
