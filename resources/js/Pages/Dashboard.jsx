import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Map from "./Map";
import Chat from "./Chat";
export default function Dashboard({ auth, messages, users, reciever }) {


    let [selected, setselected] = useState("chat");
    let [user_messages, setuser_messages] = useState(messages);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="d-flex h-screen">
                <div className="w-5 p-4">
                    <div
                        className={`d-flex justify-content-center cursor-pointer `}
                        onClick={() => setselected("map")}
                    >
                        <div
                            className={`cursor-pointer rounded-4 p-2 d-flex justify-content-center align-items-center`}
                        >
                            <ShareLocationIcon
                                sx={{ fontSize: "30px" }}
                                className={`color-${
                                    selected == "map" ? "green" : "white"
                                }`}
                            />
                        </div>
                    </div>
                    <div
                        className={`d-flex justify-content-center cursor-pointer `}
                        onClick={() => setselected("chat")}
                    >
                        <div
                            className={`cursor-pointer rounded-4 p-2 d-flex justify-content-center align-items-center`}
                        >
                            <ChatIcon
                                sx={{ fontSize: "30px" }}
                                className={`color-${
                                    selected == "chat" ? "green" : "white"
                                }`}
                            />
                        </div>
                    </div>

                    <Link
                        className={`d-flex justify-content-center cursor-pointer `}
                        href={route("logout")}
                        method="post"
                    >
                        <div
                            className={`cursor-pointer rounded-4 p-2 d-flex justify-content-center align-items-center`}
                        >
                            <PowerSettingsNewIcon
                                sx={{ color: "white", fontSize: "30px" }}
                            />
                        </div>
                    </Link>
                </div>

                <div className="w-95 d-flex align-items-center">
                    <div className="h-c-screen border-left-top-rounded bg-gray d-flex flex-column flex-grow-1">
                        {selected == "map" && <Map></Map>}
                        {selected == "chat" && (
                            <Chat
                                chats={user_messages}
                                user={auth.user}
                                users={users}
                                receiver={reciever}
                                setuser_messages={setuser_messages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
