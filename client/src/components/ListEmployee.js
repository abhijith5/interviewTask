import React, { Component } from 'react'
import {
  Modal,
  Row,
  Col,
  PageHeader,
  Form,
  Input,
  Checkbox,
  Button
} from 'antd';
import axios from 'axios'

export default class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      studentId: '',
      visible: false,
      // dataEntry:false,
      editStudentName: '',
      editStudentEmail: '',
      editStudentPhoneNumber: '',
      studentName: '',
      studentEmail: '',
      studentPhoneNumber: ''
    }

    this.editClick = this.editClick.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
    this.onFinish = this.onFinish.bind(this)

  }

  async onFinish(value) {


    if (value.studentName == undefined) {
      this.setState({
        studentName: this.state.editStudentName
      })
    } else {
      this.setState({
        studentName: value.studentName
      })
    }

    if (value.studentEmail == undefined) {
      this.setState({
        studentEmail: this.state.editStudentEmail
      })
    } else {
      this.setState({
        studentEmail: value.studentEmail
      })
    }
    if (value.studentPhoneNumber == undefined) {
      this.setState({
        studentPhoneNumber: this.state.editStudentPhoneNumber
      })
    } else {
      this.setState({
        studentPhoneNumber: value.studentPhoneNumber
      })
    }

    const data = {
      studentName: this.state.studentName,
      studentEmail: this.state.studentEmail,
      studentPhoneNumber: this.state.studentPhoneNumber
    }
    console.log(data)

    await axios.put('http://localhost:5000/api/student/update/' + this.state.studentId, data)
      .then(res => console.log(res))
      .catch(err => console.log(err))


  }

  async editClick(id) {

    this.setState({ studentId: id })

    await axios.get(`http://localhost:5000/api/student/${id}`)
      .then(res => this.setState({
        editStudentName: res.data.studentName,
        editStudentEmail: res.data.studentEmail,
        editStudentPhoneNumber: res.data.studentPhoneNumber,
        visible: true,

      }))
      .catch(err => console.error(err))


  }

  async deleteClick(id) {
    await axios.delete(`http://localhost:5000/api/student/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  async componentDidMount() {
    await axios.get('http://localhost:5000/api/student/')

      .then(res =>
        this.setState({
          studentList: res.data,
        })
      )
      .catch(err => console.error(err))
  }

  render() {

    return (
      <div style={{ marginTop: "2%" }}>
        <h2>Student List</h2>
        <table style={{ width: "100%" }}>
          <tr>
            <th>Firstname</th>
            <th>E mail</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
          {this.state.studentList.map((student, i) => (
            <tr>
              <td>{student.studentName}</td>
              <td>{student.studentEmail}</td>
              <td>{student.studentPhoneNumber}</td>
              <td>
                <Button type="primary" onClick={() => this.editClick(student._id)}>Edit </Button>
                <button type="submit" onClick={(e) => this.deleteClick(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
        {this.state.visible ?
          <Modal
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
            onOk={this.handleOk}

          >
            <Row>
              <Col span={24}>
                <PageHeader title="Edit Student" />

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
                    <Input defaultValue={this.state.editStudentName} />
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
                    <Input defaultValue={this.state.editStudentEmail} />

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
                    <Input defaultValue={this.state.editStudentPhoneNumber} />

                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
        </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Modal> : null}
      </div>
    )
  }
}
