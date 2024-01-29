/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import { Layout, theme, Avatar, Button, Table, Tag, Space, Modal, Form, Input, Select } from 'antd';
import { NavLink } from 'react-router-dom';
import './link.css';
import UserService from './services/UserService';
import DepartmentService from './services/DepartmentService';
const { Header, Content, Footer, Sider } = Layout;

const UserList = () => {

  const [loginUser, setloginUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const columns = [
    {
      title: 'UserID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => (

        <>
          {
            < Avatar size={'large'} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.userID}`} />
          }
        </>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (_, { department }) => (
        <>
          {department && (
            <Tag color={department.name.length > 5 ? 'geekblue' : 'green'} key={department.id}>
              {department.name.toUpperCase()}
            </Tag>
          )}
        </>
      )
    }, {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editModal(record.userID)}>Edit {record.name}</a>
          <a onClick={() => deleteUser(record.userID)}>Delete</a>
        </Space>
      ),
    },
  ]

  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([{
    label: '',
    value: '',
  }]);
  const [departmentList, setDepartmentList] = useState([]);
  const [createUser, setCreateUser] = useState({
    userID: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    department: {}
  });


  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }


  const showModal = () => {
    setOpen(true);
  };

  const editModal = (userID) => {
    setEditopen(true);
    UserService.getUserById(userID)
      .then((res) => {
        setEditUser(res.data);
        setEditopen(true);
      })
      .catch(err => {
        console.log(err);
        // Optionally handle the error state here, e.g., showing an error message
      });
  }
  const deleteUser = (userID) => {
    UserService.DeleteById(userID).then(() => {
      console.log("delete")
      UserService.getUsers()
        .then(res => {
          setUsers(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    })

  }



  const handleOk = () => {

    setConfirmLoading(true);
    UserService.createUser(createUser).then(() => {
      UserService.getUsers()
        .then(res => {
          setUsers(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
    setTimeout(() => {

      setOpen(false);
      setConfirmLoading(false);
    }, 2000);


  };


  const handleEditOk = () => {
    setConfirmLoading(true);
    console.log(editUser)
    UserService.updateUser(editUser).then((res) => {
      console.log(res)
      UserService.getUsers()
        .then(res => {

          setUsers(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
    setTimeout(() => {

      setEditopen(false);
      setConfirmLoading(false);
    }, 2000);


  };


  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditCancel = () => {
    setEditopen(false);
  };




  const handleChange = (e) => {
    const value = e.target.value;
    setCreateUser({ ...createUser, [e.target.name]: value, delete: false })
  };

  const handleEditChange = (e) => {
    const value = e.target.value;
    setEditUser({ ...editUser, [e.target.name]: value, })
    console.log(editUser)
  };

  const handleEditDep = (selectedValues) => {
    const selectedDepartment = departmentList.find(department => {
      return selectedValues.includes(department.name);
    });

    setCreateUser(prevState => ({
      ...prevState,
      department: selectedDepartment || {}
    }));
  };

  const handleDep = (selectedValues) => {
    const selectedDepartment = departmentList.find(department => {
      return selectedValues.includes(department.name);
    });

    setCreateUser(prevState => ({
      ...prevState,
      department: selectedDepartment || {}
    }));
  };






  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+95" >+95</Option>
      </Select>
    </Form.Item>
  );



  useEffect(() => {
    setloginUser(JSON.parse(localStorage.getItem("authUser")))
    UserService.getUsers()
      .then(res => {

        const usersToDelete = res.data.filter(user => user.delete === false); // Filter users where delete is true
        const updatedUsers = usersToDelete.map(user => {
          return {
            key: user.userID,
            ...user,
          };
        });
        console.log(updatedUsers)
        setUsers(updatedUsers); // Update the state with the filtered users
      })
      .catch(err => {
        console.log(err);
      });
    DepartmentService.getDepartments()
      .then(res => {
        const selectDepartmentList = res.data.map((dep) => {
          return {
            label: dep.name,
            value: dep.name
          };
        });
        setDepartmentList(res.data)
        setDepartments(selectDepartmentList);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])



  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            Create User
          </Button>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item
                name="userID"
                label="userID"

                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input value={createUser.userID} name="userID" onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="name"
                label="User name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input value={createUser.name} name="name" onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input value={createUser.email} name="email" onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: false }]}
              >
                <Input addonBefore={prefixSelector} name="phone" style={{ width: '100%' }} value={createUser.phone} onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="password"

                label="User password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input value={createUser.password} name="password" onChange={(e) => handleChange(e)} />
              </Form.Item>
              <Form.Item
                name="department"
                label="Department"
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
                    name="department"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    onChange={handleDep}
                    options={departments}


                  />
                </Space>
              </Form.Item>
            </Form>
          </Modal>
          {/* Edit */}
          <Modal
            title="Title"
            open={editopen}
            onOk={handleEditOk}
            confirmLoading={confirmLoading}
            onCancel={handleEditCancel}
          >
            <Form name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item
                name="name"
                label="User name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input value={editUser.name} name="name" onChange={(e) => handleEditChange(e)} />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input value={editUser.email} name="email" onChange={(e) => handleEditChange(e)} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: false }]}
              >
                <Input addonBefore={prefixSelector} name="phone" style={{ width: '100%' }} value={editUser.phone} onChange={(e) => handleEditChange(e)} />
              </Form.Item>
              <Form.Item
                name="password"

                label="User password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input value={editUser.password} name="password" onChange={(e) => handleEditChange(e)} />
              </Form.Item>
              <Form.Item
                name="department"
                label="Department"
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
                    name="department"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    onChange={handleEditDep}
                    options={departments}


                  />
                </Space>
              </Form.Item>
            </Form>
          </Modal>
          {/* Edit */}

          < Avatar size={'large'} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${loginUser.id}`} />
        </Header>
        <Content
          style={{
            margin: '10px 16px',
          }}
        >
          <Table columns={columns} dataSource={users} />
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
export default UserList;