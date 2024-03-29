import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { router } from "@inertiajs/react";
export default function ChatCard({ user, setcurrentuser }) {
    return (
        <>
            <div
                className="col-12 p-2 d-flex cursor-pointer"
                onClick={() => {
                    setcurrentuser(user);
                    router.get(`/dashboard/${user.id}`);
                }}
            >
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <AccountCircleIcon
                        className="text-light "
                        sx={{ fontSize: "45px" }}
                    ></AccountCircleIcon>
                </div>
                <div className="col-9 d-flex flex-column justify-content-center ms-1">
                    <p
                        className="text-light m-0 mt-2 p-0 align-text-bottom"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                        {user.name}
                    </p>
                    <p
                        className="align-text-top"
                        style={{
                            fontSize: "14px",
                            marginTop: "-5px",
                            color: "#979BA1",
                        }}
                    >
                        conversation
                    </p>
                </div>
            </div>
        </>
    );
}
