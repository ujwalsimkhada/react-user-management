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

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        remember: false
    };
    componentDidMount() {
        if (token) {
            this.props.history.push("/users");
        }
    }
    handleInput = event => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            this.setState({
                [name]: checked
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    };
    handleLogin = event => {
        event.preventDefault();
        const { email, password, remember } = this.state;
        axios
            .post(`${Url}/login`, {
                email,
                password
            })
            .then(response => {
                const res = response.data;
                if (remember) {
                    localStorage.setItem("token", res.token);
                } else {
                    sessionStorage.setItem("token", res.token);
                }
                this.props.history.replace("users");
            })
            .catch(err => {
                console.log("Error in login: ", err.response);
            });
    };
    render() {
        const { email, password, remember } = this.state;
        return (
            <div style={{ size: "18rem" }}>
                <Card>
                    <CardBody>
                        <CardTitle>Login</CardTitle>
                        <Form onSubmit={this.handleLogin}>
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
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="remember"
                                        checked={remember}
                                        onChange={this.handleInput}
                                    />{" "}
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <Button type="submit" color="primary">
                                Login
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                onClick={() => this.props.history.push("/register")}
                            >
                                Register
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
