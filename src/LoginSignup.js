import React from "react";
import "./LoginSignup.css";

import { Button, Container, Card, Row, Col, Form } from "react-bootstrap";

import { FormFeedback } from "reactstrap";

const STATE = Object.freeze({ LOGIN: 0, SIGNUP: 1 });
const defaultLoginDetails = {
  username: "",
  password: "",
};

const defaultSignupDetails = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const touched = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  confirmpassword: false,
};

class LoginSignup extends React.Component {
  state = {
    which: STATE.LOGIN,
    loginDetails: { ...defaultLoginDetails },
    signupDetails: { ...defaultSignupDetails },
    touched: { ...touched },
  };

  componentDidUpdate() {
    // console.log(this.state);
  }

  swapState = () => {
    let which = this.state.which;
    // Switch to the other component
    if (which === STATE.LOGIN) which = STATE.SIGNUP;
    else if (which === STATE.SIGNUP) which = STATE.LOGIN;

    this.setState({
      which,
      loginDetails: { ...defaultLoginDetails },
      signupDetails: { ...defaultSignupDetails },
      touched: { ...touched },
    });
  };

  handleLoginChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let loginDetails = this.state.loginDetails;
    loginDetails[name] = value;
    this.setState({ loginDetails });
  };

  handleLoginSubmit = () => {
    const loginDetails = this.state.loginDetails;
    const username = loginDetails.username;
    const password = loginDetails.password;
    alert("Thanks " + username + ", your pass is " + password);
  };

  validate(firstname, lastname, email, password, confirmpassword) {
    const errors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    if (this.state.touched.firstname && firstname.length < 2) {
      errors.firstname = "First Name should be >= 2 characters";
    }

    if (this.state.touched.lastname && lastname.length < 2) {
      errors.lastname = "Last Name should be >= 2 characters";
    }

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Invalid Email";
    } else if (
      this.state.touched.email &&
      email.split("").filter((x) => x === ".").length !== 1
    ) {
      errors.email = "Invalid Email";
    }

    if (this.state.touched.confirmpassword && password !== confirmpassword) {
      errors.confirmpassword = "Enter the same password";
    }
    return errors;
  }

  handleSignupChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let signupDetails = this.state.signupDetails;
    signupDetails[name] = value;
    this.setState({ signupDetails });
  }

  handleSignup(event) {
    if (
      this.state.signupDetails.firstname.length > 0 &&
      this.state.signupDetails.lastname.length > 0 &&
      this.state.signupDetails.email.length > 0 &&
      this.state.signupDetails.password.length > 0 &&
      this.state.signupDetails.confirmpassword.length
    ) {
      const errors = this.validate(
        this.state.signupDetails.firstname,
        this.state.signupDetails.lastname,
        this.state.signupDetails.email,
        this.state.signupDetails.password,
        this.state.signupDetails.confirmpassword
      );
      let len =
        errors.firstname.length +
        errors.lastname.length +
        errors.email.length +
        errors.password.length +
        errors.confirmpassword.length;
      if (len === 0) {
        alert("You are Resgistered as " + this.state.signupDetails.email);
      }
      event.preventDefault();
    } else {
      alert("Invalid Details");
    }
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  Login = (props) => {
    const loginDetails = this.state.loginDetails;
    return (
      <Container fluid className="login">
        <Card className="login-card">
          <Card.Header className="login-header">LOGIN</Card.Header>
          <Card.Body className="login-body">
            <Form>
              <Form.Group controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={loginDetails.username}
                  name="username"
                  type="input"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    this.handleLoginChange(e);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={loginDetails.password}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    this.handleLoginChange(e);
                  }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="login-footer">
            <Row>
              <Col>
                <Button
                  className="login-button"
                  type="submit"
                  onClick={() => {
                    this.handleLoginSubmit();
                  }}
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  className="login-button"
                  onClick={() => {
                    this.swapState();
                  }}
                >
                  New User?
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    );
  };

  Signup = (props) => {
    let signupDetails = this.state.signupDetails;
    const errors = this.validate(
      this.state.signupDetails.firstname,
      this.state.signupDetails.lastname,
      this.state.signupDetails.email,
      this.state.signupDetails.password,
      this.state.signupDetails.confirmpassword
    );
    return (
      <Container fluid className="login">
        <Card className="login-card">
          <Card.Header className="login-header">SIGN UP</Card.Header>
          <Card.Body className="login-body">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="signupFirstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={signupDetails.firstname}
                    name="firstname"
                    type="name"
                    placeholder="Send"
                    onChange={(e) => {
                      this.handleSignupChange(e);
                    }}
                    onBlur={this.handleBlur("firstname")}
                  />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Form.Group>

                <Form.Group as={Col} controlId="signupLastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={signupDetails.lastname}
                    name="lastname"
                    type="name"
                    placeholder="Nudes"
                    onChange={(e) => {
                      this.handleSignupChange(e);
                    }}
                    onBlur={this.handleBlur("lastname")}
                  />
                </Form.Group>
                <FormFeedback>{errors.lastname}</FormFeedback>
              </Form.Row>

              <Form.Group controlId="signupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={signupDetails.email}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    this.handleSignupChange(e);
                  }}
                  onBlur={this.handleBlur("email")}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </Form.Group>

              <Form.Group controlId="signupPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  value={signupDetails.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    this.handleSignupChange(e);
                  }}
                  onBlur={this.handleBlur("password")}
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </Form.Group>

              <Form.Group controlId="signupConfirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={signupDetails.confirmpassword}
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    this.handleSignupChange(e);
                  }}
                  onBlur={this.handleBlur("confirmpassword")}
                />
                <FormFeedback>{errors.confirmpassword}</FormFeedback>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="login-footer">
            <Row>
              <Col>
                <Button
                  className="login-button"
                  type="submit"
                  onClick={(e) => {
                    this.handleSignup(e);
                  }}
                >
                  Sign Up
                </Button>
              </Col>
              <Col>
                <Button
                  className="login-button"
                  onClick={() => {
                    this.swapState();
                  }}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    );
  };

  render() {
    const which = this.state.which;
    if (which === STATE.LOGIN) return <this.Login />;
    else if (which === STATE.SIGNUP) return <this.Signup />;
  }
}

export default LoginSignup;
