import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AlignItemsList from "./components/NewsListItem";
import { Button, Container, InputBase } from "@material-ui/core";
import SearchAppBar from "./components/AppSearchBar";

function App() {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState("how to be successful");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const searchInputRef = useRef();

	// useEffect(() => {
	// 	axios
	// 		.get("http://hn.algolia.com/api/v1/search?query=reacthooks")
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			setResults(response.data.hits);
	// 		});
	// }, []);

	useEffect(() => {
		getResults();
	}, []);

	const getResults = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`https://hn.algolia.com/api/v1/search?query=${query}`
			);
			setResults(response.data.hits);
		} catch (err) {
			setError(err);
		}
		setIsLoading(false);
	};

	const handleChange = (event) => {
		event.preventDefault();
		setQuery(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getResults();
	};

	const handleClearSearch = () => {
		setQuery("");
		searchInputRef.current.focus();
	};
	// console.log(query);
	return (
		<>
			{/* <SearchAppBar query={query} /> */}

			<Container>
				{/* <InputBase
					placeholder="Search…"
					// classes={{
					// 	root: classes.inputRoot,
					// 	input: classes.inputInput,
					// }}

					inputProps={{ "aria-label": "search" }}
					style={{
						border: "2px solid grey",
						float: "right",
						padding: "1px 5px",
						borderRadius: "999px",
						width: 200,
					}}
				/> */}
				{/* <img src="../public/apple-touch-icon.png" alt="hat-logo" /> */}
				<img
					src="./favicon.ico"
					alt="hat-logo"
					style={{ marginTop: "5px" }}
				/>

				<h2
					style={{
						color: "#303F9E",
						display: "inline",
						fontFamily: "'Audiowide', cursive",
						marginTop: 0,
						paddingLeft: 10,
					}}
				>
					Hacker News
				</h2>
				<form
					onSubmit={handleSubmit}
					style={{
						float: "right",
						marginTop: "35px",
					}}
				>
					<input
						type="text"
						style={{
							border: "2px solid grey",
							padding: "5px",
							width: 200,
						}}
						value={query}
						onChange={handleChange}
						ref={searchInputRef}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={getResults}
						// type="submit"
						style={{
							marginLeft: "10px",
						}}
					>
						Search
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClearSearch}
						// type="submit"
						style={{
							margin: "10px",
						}}
					>
						Clear
					</Button>
					{/* <button type="submit">Search</button> */}
				</form>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />

				{results && (
					<AlignItemsList results={results} isLoading={isLoading} />
				)}
				{error && (
					<h3 style={{ color: "red" }}>Error: {error.message}</h3>
				)}
			</Container>
		</>
	);
}

export default App;
