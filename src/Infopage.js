import React, { useEffect, useState } from "react";
import mydata from "./datanew.json";
import { Nav } from "./Nav";
import "./Infopage.css";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export const Infopage = () => {
	const { id } = useParams();
	const [stdata, setStdata] = useState({});
	const [imgloading, setImgloading] = useState(true);

	useEffect(() => {
		setStdata(...mydata.filter((e) => e.id === id));
	}, []);

	return (
		<div>
			<Nav></Nav>
			{/* {mydata[0].name} */}
			{/* <img src={mydata[0].images} alt="" srcset="" /> */}
			<div className="infocontainer">
				<div className="innercol">
					<span className="infotitle">
						Story of {stdata.name}{" "}
						<span style={{ fontSize: "21px" }}>
							({stdata.department} {stdata.year})
						</span>
					</span>
					<div className="infoinner">
						{stdata.images === "" ? (
							""
						) : (
							<div className="infoimgcontainer">
								{imgloading ? <ClipLoader size={75} /> : <div></div>}
								<img
									style={{ display: imgloading ? "none" : "block" }}
									src={stdata.images}
									alt=""
									srcset=""
									onLoad={() => {
										setImgloading(false);
									}}
								/>

								{/* <img src={stdata.images} alt="" srcset="" onLoad={() => { setImgloading(false) }} /> */}
							</div>
						)}

						<div className="innertext">
							<span>{stdata.information}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
