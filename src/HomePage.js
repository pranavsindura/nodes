import React from 'react';
import { Container, NavDropdown, Button, Navbar, Form, Card, CardColumns } from 'react-bootstrap';
import './HomePage.css';
class HomePage extends React.Component {
	state = {
		filterText: ''
	};

    handleFilterChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
        let state = this.state;
        state[name] = value;
        this.setState(state);
    }

	getNotes = (filterText) => {
		let notes = [];
		// Load from User's saved notes
		let content = require('./content.json').content;
		for (let i = 0; i < content.length; i++)
			if (!filterText.length || (filterText.length > 0 && content[i].toLowerCase().includes(filterText.toLowerCase())))
				notes.push(
					<Card key={'card-' + i}>
						<Card.Body>
							<Card.Title>Card title</Card.Title>
							<Card.Text>{content[i]}</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
				);
		return notes;
	}

	render() {
		const filterText = this.state.filterText;
		return (
			<Container fluid className="home">
				<Container>
					<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
						<Navbar.Brand className="nodes-text">NODES | User</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse>
							<Form inline>
								<Form.Control
									name="filterText"
									value={filterText}
									onChange={(e) => {
										this.handleFilterChange(e);
									}}
									type="input"
									placeholder="Search"
								/>
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
					<CardColumns>{this.getNotes(filterText)}</CardColumns>
				</Container>
			</Container>
		);
	}
}

export default HomePage;
