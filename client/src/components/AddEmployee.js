import React, { Component } from 'react'
import {
  Row,
  Col,
  PageHeader,
  Form,
  Input,
  Checkbox,
  Modal, 
  Button
} from 'antd'
import axios from 'axios'

export default class AddEmployee extends Component {

  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this)
    // this.onFinishFailed = this.onFinishFailed.bind(this)

    console.log(this.props.student_id)
  }


  onFinish(value) {
    console.log(value)

    axios.post('http://localhost:5000/api/student', value)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))

  }
  onFinishFailed(errorInfo) {
    // console.log(errorInfo)
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <PageHeader title="Student Details" />

          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="studentName"
              rules={[
                {
                  // required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="studentEmail"
              rules={[
                {
                  // required: true,
                  type: 'email',
                  message: 'Please input your Email',
                },
              ]}
            >
              <Input />

            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="studentPhoneNumber"
              rules={[
                {
                  // required: true,
                  message: 'Please input your Phone Number',
                },
              ]}
            >
              <Input />

            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    )
  }
}
