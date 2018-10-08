import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class EditUser extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.props.onEditUser}>
                            <FormGroup>
                                <Label>Enter Name</Label>
                                <Input
                                    type="text"
                                    value={this.props.userName}
                                    onChange={this.props.onEditInputChange}
                                />
                            </FormGroup>
                            <Button type="submit">Edit User</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
