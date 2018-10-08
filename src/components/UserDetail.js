import React, { Component } from "react";
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import axios from "axios";

import { Url } from "../constants/url";

export default class UserDetail extends Component {
    state = {
        user: {}
    };
    componentDidMount() {
        const { id } = this.props.match.params;
        axios
            .get(`${Url}/users/${id}`)
            .then(response => {
                const res = response.data;
                this.setState({
                    user: res.data
                });
            })
            .catch(err => {
                console.log("Error getting user data: ", err.response);
            });
    }
    renderUserDetail = () => {
        const { user } = this.state;
        return (
            <Card style={{ width: 200 }}>
                <CardImg
                    top
                    style={{ height: 200, width: 200 }}
                    src={user.avatar}
                    alt="Card image cap"
                />
                <CardBody>
                    <CardTitle>{`${user.first_name} ${user.last_name}`}</CardTitle>
                </CardBody>
            </Card>
        );
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col>{this.renderUserDetail()}</Col>
                </Row>
            </Container>
        );
    }
}
