import React from 'react';
import { Container, NavDropdown, Button, Navbar, Form, Card, CardColumns } from 'react-bootstrap';
import './HomePage.css';
class HomePage extends React.Component {
	state = {};

	render() {
		let card_list = [];
		for (let i = 0; i < 10; i++)
			card_list.push(
				<Card>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
			);

		return (
			<Container fluid className="home">
				<Container>
					<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
						<Navbar.Brand className="nodes-text">NODES | User</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse>
							<Form inline>
								<Form.Control type="input" placeholder="Search" />
							</Form>
							<NavDropdown title="Create New" className="nodes-text">
								<NavDropdown.Item>Note</NavDropdown.Item>
								<NavDropdown.Item>Checklist</NavDropdown.Item>
							</NavDropdown>
							<Button variant="outline-danger" className="ml-auto logout">
								Logout
							</Button>
						</Navbar.Collapse>
					</Navbar>
				</Container>
				<Container>
					<CardColumns>
                        {card_list}
                    </CardColumns>
				</Container>
			</Container>
		);
	}
}

export default HomePage;
