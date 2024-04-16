import React, { Component, useEffect, useState } from 'react';

import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';



import {
  Form, Radio, Space, Switch,
  Table, Card, Button, DatePicker,
  Modal, Select, Input,
  Tabs,
  Cascader,
  InputNumber,
  TreeSelect,
  Badge,
  Tag,
} from 'antd';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import AddUser from '../../Register/Register';


function Pro() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate()

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [totalUsersData, setTotalUsers] = useState(null)
  const [createdAtAfter, setCreatedAtAfter] = useState('')
  const [createdAtBefore, setCreatedAtBefore] = useState('')
  const [limit, setLimit] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  const [usersData, setUsers] = useState([])

  const { RangePicker } = DatePicker;

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    const createdBefore = dateString[1]
    setCreatedAtBefore(createdBefore)
    const createdAfter = dateString[0]
    setCreatedAtAfter(createdAfter)

  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };




  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const admin = decodedToken.role
  
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

 




  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: '1',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: '2',
    },
    ,
    {
      title: 'Email',
      dataIndex: 'email',
      key: '3',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: '4',
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: '5',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: '6',
    },
    {
      title: 'Days Off',
      dataIndex: 'soldeDays',
      key: '7',
    }
    , {
      title: 'Status',
      dataIndex : 'isActive',
     
      filters: [
        {
          text: 'Active',
          value: 'true',
        },
        {
          text: 'Inactive',
          value: 'false',
        },
      ],
      

      onFilter: (value, record) => record.isActive.indexOf(value) === 0,
      key: '8'
      
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    }


  ];
  const home = () => {
    history('/dashboard')
  }
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  
  const dateNow = new Date()
  useEffect(() => {
    if (admin === 'Super Admin') {
      axiosInstance.get(`/users?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`).then((response) => {
        setUsers(response.data.users)
        setTotalUsers(response.data.totalUsers)
      })
    }

  }, [])

  const handleOk = () => {
    if (admin === 'Super Admin') {
      axiosInstance.get(`/users?page=1&limit=${limit}&sortBy=${sortBy}&createdAtBefore=${createdAtBefore}&createdAtAfter=${createdAtAfter}`).then((response) => {
      console.log('respons', response.data);
        setUsers(response.data.users)
        setTotalUsers(response.data.totalUsers)
      })
    }
    setIsModalOpen(false);
  };

  console.log('data :', usersData);

  useEffect(() => {
    console.count('comp re-render');
  }, [])
    const isActive = usersData.map((data) => data.isActive)

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModalAddUser = () => {
      setOpen(true);
    };
    const handleOkAdd = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    const handleCancelAdd = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sort By
      </Button>
      <Modal title="Sort By" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Space direction="vertical" size={20}>
      
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              width: 350,
            }}
          >
            <Form.Item label="Field to sort by"  >
              <Select name="sortBy" onSelect={(e) => setSortBy(e)}>
                <Select.Option value="createdAt">createdAt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date">
              <RangePicker

                format="YYYY-MM-DD"
                onChange={onChange}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Limit" >
              <Input onChange={(e) =>  setLimit(e.target.value)} />
            </Form.Item>

           
          </Form>

        </Space>
      </Modal>
      
      <span  >Total Users : {totalUsersData}</span> <br />
      <Button onClick={home}>Back Home</Button>
      {/* <Table rowKey={(record) => record.uid} columns={columns} dataSource={usersData} onChange={handleChange} /> */}
      <Table  dataSource={usersData} onChange={handleChange} >
       <ColumnGroup title= "Name" >
        <Column title="first Name" dataIndex="firstName" key="firstName"/>
        <Column title="Last Name" dataIndex="lastName" key="lastName"/>
       </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email"/>
        <Column title="Role" dataIndex="role" key="role"/>
        <Column title="Building" dataIndex="building" key="building"/>
        <Column title="Phone" dataIndex="phone" key="phone"/>
        <Column title="Days Off" dataIndex="soldeDays" key="soldeDays"/>
        <Column  title="Status" dataIndex="isActive" key="isActive" 
        filters={[
        {
          text: 'Active',
          value: 'true',
        },
        {
          text: 'Inactive',
          value: 'false',
        },
      ]}
      onFilter={(value, record) => record.isActive.indexOf(value) === 0}
        filterIcon={filtered =>{ 
          if(isActive === "true" ) { console.log("fegrfdgfd");}}}
         
    
      />
        <Column title="Operation" dataIndex="Operation" key="firstName"
          render= {(_, record) => (
            <Space size="middle">
              <a>Add </a>
              <a>Delete</a>
              <a>Update</a>
            </Space>
          )}/>
       
     
      </Table>

    <Button type="primary" onClick={showModalAddUser}>
    Open Modal with async logic
  </Button>
  <Modal
    title="Add new user"
    open={open}
    onOk={handleOkAdd}
    confirmLoading={confirmLoading}
    onCancel={handleCancelAdd}
  >
    <AddUser />
  </Modal>

    </>
  );
}
export default Pro;

/////////////////////////code succes////////////////////////////////////////////

/*import React, { Component, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import {
  Form, Radio, Space, Switch,
  Table, Card, Button, DatePicker,
  Modal, Select, Input,
  Tabs,
  Cascader,
  InputNumber,
  TreeSelect,
  Badge,
  Tag,
} from 'antd';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
//import AddUser from '../../Register/Register';


function Profile() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [totalUsersData, setTotalUsers] = useState(null)
  const [createdAtAfter, setCreatedAtAfter] = useState('')
  const [createdAtBefore, setCreatedAtBefore] = useState('')
  const [limit, setLimit] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  const [usersData, setUsers] = useState([])

  const { RangePicker } = DatePicker;

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    const createdBefore = dateString[1]
    setCreatedAtBefore(createdBefore)
    const createdAfter = dateString[0]
    setCreatedAtAfter(createdAfter)

  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const admin = decodedToken.role
  
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

 

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: '1',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: '2',
    },
    ,
    {
      title: 'Email',
      dataIndex: 'email',
      key: '3',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: '4',
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: '5',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: '6',
    },
    {
      title: 'Days Off',
      dataIndex: 'soldeDays',
      key: '7',
    }
    , {
      title: 'Status',
      dataIndex : 'isActive',
     
      filters: [
        {
          text: 'Active',
          value: 'true',
        },
        {
          text: 'Inactive',
          value: 'false',
        },
      ],
      

      onFilter: (value, record) => record.isActive.indexOf(value) === 0,
      key: '8'
     
      
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    }


  ];
  const home = () => {
    navigate('/Da')
  }
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

 
  const dateNow = new Date()
  useEffect(() => {
    if (admin === 'Super Admin') {
      axiosInstance.get(`/users?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`).then((response) => {
        setUsers(response.data.users)
        setTotalUsers(response.data.totalUsers)
      })
    }

  }, [])

  const handleOk = () => {
    if (admin === 'Super Admin') {
      axiosInstance.get(`/users?page=1&limit=${limit}&sortBy=${sortBy}&createdAtBefore=${createdAtBefore}&createdAtAfter=${createdAtAfter}`).then((response) => {
      console.log('respons', response.data);
        setUsers(response.data.users)
        setTotalUsers(response.data.totalUsers)
      })
    }
    setIsModalOpen(false);
  };

  console.log('data :', usersData);

  useEffect(() => {
    console.count('comp re-render');
  }, [])
    const isActive = usersData.map((data) => data.isActive)

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModalAddUser = () => {
      setOpen(true);
    };
    const handleOkAdd = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    const handleCancelAdd = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sort By
      </Button>
      <Modal title="Sort By" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Space direction="vertical" size={20}>
      
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              width: 350,
            }}
          >
            <Form.Item label="Field to sort by"  >
              <Select name="sortBy" onSelect={(e) => setSortBy(e)}>
                <Select.Option value="createdAt">createdAt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date">
              <RangePicker

                format="YYYY-MM-DD"
                onChange={onChange}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Limit" >
              <Input onChange={(e) =>  setLimit(e.target.value)} />
            </Form.Item>
          </Form>

        </Space>
      </Modal>
     
      <span  >Total Users : {totalUsersData}</span> <br />
      <Button onClick={home}>Back Home</Button>
    
      <Table  dataSource={usersData} onChange={handleChange} >
       <ColumnGroup title= "Name" >
        <Column title="first Name" dataIndex="firstName" key="firstName"/>
        <Column title="Last Name" dataIndex="LastName" key="lastName"/>
       </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email"/>
        <Column title="Role" dataIndex="role" key="role"/>
        <Column title="Building" dataIndex="building" key="building"/>
        <Column title="Phone" dataIndex="phone" key="phone"/>
        <Column title="Days Off" dataIndex="soldeDays" key="soldeDays"/>
        <Column  title="Status" dataIndex="isActive" key="isActive" 
        filters={[
        {
          text: 'Active',
          value: 'true',
        },
        {
          text: 'Inactive',
          value: 'false',
        },
      ]}
      onFilter={(value, record) => record.isActive.indexOf(value) === 0}
        filterIcon={filtered =>{ 
          if(isActive === "true" ) { console.log("fegrfdgfd");}}}
         
    
      />
        <Column title="Operation" dataIndex="Operation" key="firstName"
          render= {(_, record) => (
            <Space size="middle">
              <a>Add </a>
              <a>Delete</a>
              <a>Update</a>
            </Space>
          )}/>
       
     
      </Table>





     
    <Button type="primary" onClick={showModalAddUser}>
    Open Modal with async logic
  </Button>
  <Modal
    title="Add new user"
    open={open}
    onOk={handleOkAdd}
    confirmLoading={confirmLoading}
    onCancel={handleCancelAdd}
  >
    
  </Modal>

    </>
  );
}


export default Profile;*/

