import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default class Layout extends Component {
    state = {
        isOpen: false
    };
    toggle = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    };
    render() {
        return (
            <div>
                <Navbar dark color="primary" light expand="md">
                    <NavbarBrand>
                        <Link className="text-light" to="/">
                            User Management
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/users/">
                                    Users
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/login">
                                    Login
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}
