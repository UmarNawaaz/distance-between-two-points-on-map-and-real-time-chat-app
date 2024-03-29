import React, { useEffect, useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { Helmet } from "react-helmet";
import nextbillion, { NBMap } from "@nbai/nbmap-gl";
import "@nbai/nbmap-gl/dist/nextbillion.css";

nextbillion.setApiKey("b98e9dd2f9414231bae19340b76feff0");
export default function Map() {
    let [origin, setorigin] = useState("");
    let [destination, setdestination] = useState("");
    let nbmap = null;
    let [oset, setoset] = useState(false);
    let [gmap, setgmap] = useState(false);

    let count = 0;
    useEffect(() => {
        if (!gmap) {
            nbmap = new NBMap({
                container: document.getElementById("map"),
                style: "https://api.nextbillion.io/maps/streets/style.json",
                zoom: 10,
                center: { lat: 34.149502, lng: 73.199501 },
            });
            nbmap?.on("click", (event) => {
                setCoordinates(event);
            });
        }
    }, [gmap]);

    let setCoordinates = (event) => {
        const { lng, lat } = event.lngLat;
        if (count == 0) {
            setorigin(lat + "," + lng);
        } else {
            setdestination(lat + "," + lng);
        }
        setoset(true);
        if (count == 1) {
            count = 0;
        } else {
            count++;
        }
    };

    function getDistance() {
        if (origin != "" && destination != "") {
            setgmap(true);
        } else {
            alert("SET ORIGIN/DESTINATION");
        }
    }

    let resetmap = () => {
        count = 0;
        setorigin("");
        setdestination("");
        if (gmap) {
            setgmap(false);
        }
    };

    return (
        <>
            <div className="h-screen bg-map d-flex flex-column flex-grow-1">
                <div className="col-12 flex-grow-1 d-flex flex-column p-2">
                    <div className=" p-1">
                        <p className="text-light form-label">
                            SELECT ORIGIN AND DESTINATION TO FIND DISTANCE BETWEEN THEM ON
                            MAP
                        </p>
                    </div>
                    <div className="col-12 col-md-8 col-lg-10 flex-wrap d-flex">
                        <div className=" col-12 col-lg-4 d-flex align-items-center">
                            <MyLocationIcon className="text-light" />
                            <input
                                type="text"
                                className="bg-transparent ms-1 flex-grow-1 rounded-2 text-light"
                                placeholder="Origin"
                                onInput={(e) => setorigin(e.target.value)}
                                value={origin}
                            />
                        </div>
                        <div className="col-12 col-lg-4 d-flex align-items-center">
                            <LocationOnIcon className="text-light" />
                            <input
                                type="text"
                                className="bg-transparent ms-1 flex-grow-1 rounded-2 text-light"
                                placeholder="Destination"
                                onInput={(e) => setdestination(e.target.value)}
                                value={destination}
                            />
                        </div>

                        <div className="ms-4  p-1 p-lg-0 ms-lg-0 d-flex">
                            <button
                                className=" ms-0 ms-lg-2 btn btn-primary flex-grow-1"
                                onClick={getDistance}
                            >
                                FIND
                            </button>
                            <button
                                className="ms-2 btn btn-primary flex-grow-1"
                                onClick={() => resetmap()}
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                    {!gmap && (
                        <div
                            id="map"
                            className="d-flex border flex-grow-1 m-2 rounded"
                        ></div>
                    )}
                    {gmap && (
                        <iframe
                            id="map"
                            className="d-flex bg-gray flex-grow-1 m-2 rounded"
                            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBGqLqZOlyGR68cpFNH4QfS_xn4vmlITJc&origin=${origin}&destination=${destination}`}
                        ></iframe>
                    )}
                </div>
            </div>
        </>
    );
}
