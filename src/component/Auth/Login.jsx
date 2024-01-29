import { useState } from "react"
import LoginService from "../../services/LoginService";
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.css'
export default function Login() {

    let navigator = useNavigate();
    const [user, setUser] = useState({
        name: '',
        password: ''
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault
        LoginService.login(user)
            .then(res => {
                console.log(res)
                localStorage.setItem('authUser', JSON.stringify(res.data));
                navigator('/home');
            })
            .catch(err => {
                console.log(err);
                navigator('/');
            });
    }

    return (
        <div className='form'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} name="name" placeholder="Username" value={user.name} onChange={(e) => handleChange(e)} />
                </Form.Item>
                <Form.Item
                    name="userpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password} onChange={(e) => handleChange(e)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    &nbsp;
                    Or
                    &nbsp;
                    <a href="">register</a>
                </Form.Item>
            </Form>
        </div>
    )
}

