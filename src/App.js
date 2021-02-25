import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	// Link,
	Route,
	Switch
} from 'react-router-dom';

import './App.css';
import LoginSignup from './LoginSignup';
import HomePage from './HomePage';

function App() {
	return (
		<div className="App">
			<Router>
					{
						// Handle which Component to display based on whether User is logged in or not
						// with Redux global state
					}
					<Switch>
						<Route path="/home">
							<HomePage />
						</Route>
						<Route path="/">
							<LoginSignup />
						</Route>
					</Switch>
			</Router>
		</div>
	);
}

export default App;
