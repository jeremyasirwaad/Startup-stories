import React, { useState } from "react";
import "./App.css";
import mydata from "./datanew.json";
import { Table, Tag, Space, Input, Button, Layout, Badge } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Nav } from "./Nav";
import "antd/dist/antd.css";
// import MaterialTable from "material-table";

export const Table1 = () => {
	const [page, setPage] = React.useState(1);

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: "",
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			)
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	const columns = [
		{
			title: "Index",
			key: "index",
			render: (value, item, index) => (page - 1) * 10 + index + 1
		},

		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			filters: [
				{
					text: "Circuit",
					value: "Circuit"
				},
				{
					text: "Non-Circuit",
					value: "Non-Circuit"
				}
			],
			onFilter: (value, record) => record.type === value
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters
			}) => {
				return (
					<Layout style={{ padding: "20px 20px", backgroundColor: "white" }}>
						<Input
							size="large"
							style={{ marginBottom: "10px" }}
							autoFocus
							placeholder="Search By Name"
							value={selectedKeys[0]}
							onChange={(e) => {
								setSelectedKeys(e.target.value ? [e.target.value] : []);
							}}
							onPressEnter={() => {
								confirm();
							}}
							onBlur={() => {
								confirm();
							}}
						/>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								onClick={() => {
									confirm();
								}}
								type="primary"
							>
								Search
							</Button>
							<Button
								type="danger"
								onClick={() => {
									clearFilters();
									confirm();
								}}
							>
								Clear
							</Button>
						</div>
					</Layout>
				);
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
			onFilter: (value, record) => {
				return record.name.toLowerCase().includes(value.toLowerCase());
			}
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
			filters: [
				{
					text: "CSE",
					value: "CSE"
				},
				{
					text: "IT",
					value: "IT"
				},
				{
					text: "ECE",
					value: "ECE"
				},
				{
					text: "EEE",
					value: "EEE"
				},
				{
					text: "MECH",
					value: "MECH"
				},
				{
					text: "IBT",
					value: "IBT"
				},
				{
					text: "CIVIL",
					value: "CIVIL"
				},
				{
					text: "EIE",
					value: "EIE"
				},
				{
					text: "M.E",
					value: "M.E"
				}
			],
			onFilter: (value, record) => record.department === value
		},
		{
			title: "Tags",
			key: "tags",
			dataIndex: "tags",
			render: (tags) => (
				<>
					{tags.map((tag) => {
						let color;
						if (tag === "FullStack") {
							color = "blue";
						}
						if (tag === "DataScience") {
							color = "green";
						}
						if (tag === "Digital Marketing") {
							color = "red";
						}
						if (tag === "AI and ML Developer") {
							color = "purple";
						}
						if (tag === "DataAnalytics") {
							color = "cyan";
						}
						if (tag === "Product-Managment") {
							color = "gold";
						}
						if (tag === "Layout Design") {
							color = "magenta";
						}
						if (tag === "Business Intelligence") {
							color = "volcano";
						}
						if (tag === "DataEngineer") {
							color = "yellow";
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year",
			sorter: (a, b) => a.year - b.year,
			sortDirections: ["descend", "ascend"]
		}
	];

	return (
		<div>
			<Nav></Nav>
			<div className="tablebody">
				<div className="tablecontainer">
					<div className="titlediv">
						<div className="badgeno">{mydata.length}</div>
						<span>StartUp Stories</span>
					</div>
					<Table
						columns={columns}
						dataSource={mydata}
						pagination={{
							pageSize: 27
						}}
					/>
				</div>
			</div>
		</div>
	);
};
