import React, { Component } from "react";
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import axios from "axios";
import { Url } from "../constants/url";

export default class Register extends Component {
    state = {
        email: "",
        password: ""
    };
    handleInput = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleRegister = event => {
        event.preventDefault();
        const { email, password } = this.state;
        axios
            .post(`${Url}/register`, {
                email,
                password
            })
            .then(response => {
                const res = response.data;
                console.log(res);
                // localStorage.setItem("token", res.token);
            })
            .catch(err => {
                console.log("Error in login: ", err.response);
            });
    };
    render() {
        const { email, password } = this.state;
        return (
            <div style={{ size: "18rem" }}>
                <Card>
                    <CardBody>
                        <CardTitle>Login</CardTitle>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleInput}
                                />
                            </FormGroup>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                onClick={() => this.props.history.push("/login")}
                            >
                                Back to Login
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
