import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Link } from "react-router-dom";
import axios from "axios";

import EditUser from "./EditUser";

import { Url } from "../constants/url";

// const users = [
//     {
//         id: 1,
//         first_name: "George",
//         last_name: "Bluth"
//     },
//     {
//         id: 2,
//         first_name: "sfsdf",
//         last_name: "Blusdgfgdfth"
//     },
//     {
//         id: 3,
//         first_name: "qwrwe",
//         last_name: "Blutdfbdh"
//     },
//     {
//         id: 4,
//         first_name: "qewrew",
//         last_name: "Blucvbcvbth"
//     }
// ];

export default class Users extends Component {
    state = {
        users: [],
        modal: false,
        editUsername: "",
        id: ""
    };

    componentDidMount() {
        this.fetchUsers();
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    fetchUsers = () => {
        axios
            .get(`${Url}/users`)
            .then(response => {
                const res = response.data;
                this.setState({
                    users: res.data
                });
            })
            .catch(err => {
                console.log("Error getting users: ", err.response);
            });
    };
    handleDelete = id => {
        axios
            .delete(`${Url}/users/${id}`)
            .then(response => {
                const res = response.data;
                this.fetchUsers();
                console.log(res);
            })
            .catch(err => {
                console.log("Error deleting user: ", err.response);
            });
    };
    handleUserEdit = user => {
        this.setState({
            modal: !this.state.modal,
            editUsername: `${user.first_name} ${user.last_name}`,
            id: user.id
        });
    };
    onEditInputChange = event => {
        this.setState({
            editUsername: event.target.value
        });
    };
    onEditUser = event => {
        event.preventDefault();
        const { id, editUsername, modal } = this.state;
        axios
            .put(`${Url}/users/${id}`, {
                name: editUsername
            })
            .then(response => {
                const res = response.data;
                this.setState({
                    modal: !modal
                });
                this.fetchUsers();
            })
            .catch(err => {
                console.log("Error editing user: ", err.response);
            });
    };
    renderUserTable = () => {
        const { users } = this.state;
        return users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                        <img src={user.avatar} alt="" className="rounded" />
                    </td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>
                        <Button tag={Link} color="primary" to={`/user/${user.id}`}>
                            Show
                        </Button>{" "}
                        <Button onClick={() => this.handleUserEdit(user)} color="success">
                            Edit
                        </Button>{" "}
                        <Button color="danger" onClick={() => this.handleDelete(user.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });
    };
    render() {
        const { editUsername, users } = this.state;
        const options = {
            paginationSize: 2,
            // pageStartIndex: 0,
            // firstPageText: "First",
            // prePageText: "Back",
            // nextPageText: "Next",
            // lastPageText: "Last",
            // nextPageTitle: "First page",
            // prePageTitle: "Pre page",
            // firstPageTitle: "Next page",
            // lastPageTitle: "Last page",
            // showTotal: true,
            sizePerPageList: [
                {
                    text: "2",
                    value: 2
                },
                {
                    text: "4",
                    value: 4
                },
                {
                    text: "All",
                    value: users.length
                }
            ]
        };
        const columns = [
            {
                dataField: "id",
                text: "S.No",
                sort: true
            },
            {
                dataField: "first_name",
                text: "First Name",
                sort: true
            },
            {
                dataField: "last_name",
                text: "Last Name"
            }
        ];
        const defaultSorted = [
            {
                dataField: "id",
                order: "asc"
            }
        ];
        return (
            <Container>
                <Row>
                    <Col>
                        {/*<Table>
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Avatar</th>
                                    <th>Full name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{this.renderUserTable()}</tbody>
                        </Table>*/}
                        <BootstrapTable
                            keyField="id"
                            data={users}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            cellEdit={cellEditFactory({ mode: "dbclick" })}
                            pagination={paginationFactory(options)}
                        />
                    </Col>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        centered
                        size="lg"
                        className="editModal"
                    >
                        <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                        <ModalBody>
                            <EditUser
                                userName={editUsername}
                                onEditUser={this.onEditUser}
                                onEditInputChange={this.onEditInputChange}
                            />
                        </ModalBody>
                    </Modal>
                </Row>
            </Container>
        );
    }
}
