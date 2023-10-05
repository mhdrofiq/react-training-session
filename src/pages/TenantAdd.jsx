import React from 'react'
import {Button, Form, message} from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TenantAdd() {

    const [formInstance] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = (valueForm) => {
        //console.log('Success:', valueForm);
        axios.post('https://backend-kantin-umn.fly.dev/admin/tenant/register', valueForm,{
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImthbnRpbi51bW5AZ21haWwuY29tIiwiaWF0IjoxNjk2NDg2MjY0LCJleHAiOjE2OTcwOTEwNjR9.nt_7kdZ6BmcawsJa0wNkMNvQod9thG3J9c-Ybo7PHG8`
            },
        })
        .then((response) => {
            if(response.data.status === 201){
                navigate('/')
            }
        }).catch((error) => {
            message.error(error.response.data.message)
        })
    };

    return (
        <div>
            <Form onFinish={onFinish} form={formInstance}>
                <Form.Item label="Email" name='email'>
                    <input type="email" />
                </Form.Item>
                <Form.Item label="Full name" name='full_name'>
                    <input type="text" />
                </Form.Item>
                <Form.Item label="Location" name='location'>
                    <input type="text" />
                </Form.Item>
                <Form.Item label="Description" name='description'>
                    <input type="text" />
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <input type="password" />
                </Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </div>
    )
}
