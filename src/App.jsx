/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import { Card, Layout, theme, Avatar, Button, Col, Row, Modal, Form, Input, Select, Space, Typography } from 'antd';
import './link.css';
import { NavLink } from 'react-router-dom';
import UserService from './services/UserService';
import DepartmentService from './services/DepartmentService';
import { Tag } from 'antd';
import UserList from './UserList';
const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const [departments, setDepartments] = useState([]);
  const [EditDep, setEditDep] = useState([])
  const [departmentName, setdepartmentName] = useState({
    name: '',
    delete: false
  })
  const [loginUser, setloginUser] = useState({});
  const [users, setusers] = useState([{
    label: '',
    value: '',
  }]);
  const [departmentEdit, setDepartmentEdit] = useState({
    departmentName: "",
    users: []
  })
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };



  const handleChange = (e) => {
    const value = e.target.value;
    setdepartmentName({ ...departmentName, name: value });
  }
  const handleRemove = (DepId) => {
    console.log(DepId)
    DepartmentService.removeDepartment(DepId).then(() => {
      console.log("Complete Delete")
      DepartmentService.getDepartments()
        .then(res => {
          setDepartments(res.data);
          console.log("Complete Delete")
        })
        .catch(err => {
          console.log(err);
        });
    })
  }


  const openEdit = (id) => {
    handleEdit(id);
    setEditOpen(true);
  }


  const handleEditCancel = () => {
    setEditOpen(false)
  }


  const handleEditOk = () => {
  }


  const handleEdit = (DepId) => {
    DepartmentService.getDepartmentById(DepId).then((res) => {
      setDepartmentEdit(res.data.name)
      console.log(departmentEdit)
      setEditDep(res.data)
      setEditOpen(true)
    }).catch((err) => {
      console.log(err)
    })
  }


  const handleEditDep = (selectedValues) => {
    const selectedDepartment = UserList.find(department => {
      return selectedValues.includes(department.name);
    });
  }

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(departmentName)
    DepartmentService.createDepartment(departmentName)
      .then(res => {
        console.log(res.data)
        DepartmentService.getDepartments()
          .then(res => {
            setDepartments(res.data);
            console.log("Department", res.data)
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    setloginUser(JSON.parse(localStorage.getItem("authUser")))
    DepartmentService.getDepartments()
      .then(res => {
        const DepartmentList = res.data.filter(dep => dep.delete === false); // Filter users where delete is true
        setDepartments(DepartmentList);
        console.log("Department", res.data)
      })
      .catch(err => {
        console.log(err);
      });
    UserService.getUsers()
      .then(res => {
        const usersToDelete = res.data.filter(user => user.delete === false).map((user) => {
          return {
            label: user.name,
            value: user.name
          };
        }); // Filter users where delete is true          

        setusers(usersToDelete);
      })
      .catch(err => {
        console.log(err);
      });

  }, [])

  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider style={{ paddingTop: '20px' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <NavLink
          to="/home"
          className={({ isActive }) => isActive ? 'link activeLink' : 'link'}
        >
          Department
        </NavLink>
        <NavLink
          to="/userlist"
          className={({ isActive }) => isActive ? 'link activeLink' : 'link'}
        >
          User-List
        </NavLink>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'flex-end',
            alignContent: 'center',
            alignItems: 'center',
            paddingRight: '10px',
            gap: '10px',
          }}
        >
          <Button type="primary" size={'large'} onClick={showModal}>
            Create Department
          </Button>
          <Modal
            title="Create Department"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item
                name="name"
                label="Department Name"
                value={departmentName.name} onChange={(e) => handleChange(e)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>


            </Form>
          </Modal>
          < Avatar size={'large'} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${loginUser.id}`} />
        </Header>
        <Content
          style={{
            margin: '10px 16px',
          }}
        >
          <Row gutter={10}>
            {
              departments.map((data, index) => (
                <Col span={6} key={index} style={{ marginBottom: "10px" }}>
                  <Card title={data.name} bordered={false} extra={
                    <div style={{ display: 'inline-block' }}>
                      <a onClick={() => openEdit(data.id)}>
                        <Tag color={"blue"}>
                          Edit
                        </Tag>
                      </a>
                      <a onClick={() => handleRemove(data.id)}>
                        <Tag color={"red"}>
                          Delete
                        </Tag></a>
                    </div>}
                    style={{ width: 300 }}
                  >
                    {data.name}
                  </Card>
                </Col>
              ))
            }
          </Row>
          <Modal
            title="Edit Department"
            open={editOpen}
            onOk={handleEditOk}
            confirmLoading={confirmLoading}
            onCancel={handleEditCancel}
          >
            <Form name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item
                name="name"
                label="Department Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input defaultValue="Hello" value={departmentEdit.departmentName} onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="Users"
                label="Users"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Space
                  style={{
                    width: '100%',
                  }}
                  direction="vertical"
                >
                  <Select
                    mode='multiple'
                    name="department"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    onChange={handleEditDep}
                    options={users}


                  />
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout >
  );
};
export default App;