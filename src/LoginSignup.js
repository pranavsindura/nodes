import React from 'react'
import './LoginSignup.css'

import {Button, Container, Card, Row, Col, Form} from 'react-bootstrap'

const STATE = Object.freeze({LOGIN: 0, SIGNUP: 1});
const defaultLoginDetails = {
    username : '',
    password : ''
};

class LoginSignup extends React.Component
{
    state = {
        which : STATE.LOGIN,
        loginDetails : {...defaultLoginDetails},
    };

    componentDidUpdate()
    {
        console.log(this.state);
    }

    swapState = () => {
        let which = this.state.which;
        // Switch to the other component
        if(which === STATE.LOGIN) which = STATE.SIGNUP;
        else if(which === STATE.SIGNUP) which = STATE.LOGIN;

        this.setState({which, loginDetails : {...defaultLoginDetails}});
    };

    handleLoginChange = (event) =>
    {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;

        let loginDetails = this.state.loginDetails;
        loginDetails[name] = value;
        this.setState({loginDetails});
    }

    handleLoginSubmit = () =>
    {
        const loginDetails = this.state.loginDetails;
        const username = loginDetails.username;
        const password = loginDetails.password;
        alert('Thanks ' + username + ', your pass is ' + password);
    }

    Login = (props) =>
    {
        const loginDetails = this.state.loginDetails;
        return (
            <Container fluid className="login">
                <Card className="login-card">
                    <Card.Header className="login-header">LOGIN</Card.Header>
                    <Card.Body className="login-body">
                        <Form>
                            <Form.Group controlId="loginUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={loginDetails.username} name="username" type="input" placeholder="Enter Username" onChange={(e) => {this.handleLoginChange(e)}}/>
                            </Form.Group>
                            <Form.Group controlId="loginPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={loginDetails.password} name="password" type="password" placeholder="Enter Password" onChange={(e) => {this.handleLoginChange(e)}}/>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="login-footer">
                        <Row>
                            <Col>
                                <Button className="login-button" type = "submit" onClick = {()=>{this.handleLoginSubmit()}}>Submit</Button>
                            </Col>
                            <Col>
                                <Button className="login-button" onClick = {()=>{this.swapState()}}>New User?</Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
        );
    };

    Signup = (props) =>
    {
        return (
            <div>
                SIGNUP!
                <button onClick = {() => {this.swapState()}}>Go to Login</button>
            </div>
        );
    };

    render()
    {
        const which = this.state.which;
        if(which === STATE.LOGIN)
            return <this.Login/>
        else if(which === STATE.SIGNUP)
            return <this.Signup/>
    }
};

export default LoginSignup;