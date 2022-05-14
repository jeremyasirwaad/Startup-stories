import logo from "./logo.svg";
import "./App.css";
import { Table1 } from "./Table";
import { Infopage } from "./Infopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Table1 />} />
					<Route path="/data/:id" element={<Infopage />} />
				</Routes>
			</Router>
			{/* <Infopage />
			<Table1 /> */}
		</div>
	);
}

export default App;
