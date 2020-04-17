import React, { Component } from 'react'
import AddEmployee from './components/AddEmployee'
import {
  Row,
  Col
} from 'antd'
import ListEmployee from './components/ListEmployee'


export default class s extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={11} style={{ marginLeft: "40px" }}>
            <AddEmployee></AddEmployee>

          </Col>
          <Col span={11} style={{ marginLeft: "40px" }}>
            <ListEmployee></ListEmployee>
          </Col>
        </Row>
      </div>
    )
  }
}
