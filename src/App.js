import logo from "./GCT.png";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Table1 } from "./Table";
import { Infopage } from "./Infopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const [loader, setLoader] = useState(true);

	const time = () => {
		setTimeout(() => {
			setLoader(false);
		}, 2000);
	};

	useEffect(() => {
		time();
	}, []);

	return (
		<div className="App">
			{loader ? (
				<div className="loder">
					<img src={logo} alt="" />
				</div>
			) : (
				<Router>
					<Routes>
						<Route path="/" element={<Table1 />} />
						<Route path="/data/:id" element={<Infopage />} />
					</Routes>
				</Router>
			)}

			{/* <Router>
				<Routes>
					<Route path="/" element={<Table1 />} />
					<Route path="/data/:id" element={<Infopage />} />
				</Routes>
			</Router> */}
			{/* <Infopage />
			<Table1 /> */}
		</div>
	);
}

export default App;
