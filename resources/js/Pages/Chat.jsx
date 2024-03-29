import React, { useState, useRef, useEffect } from "react";
import Echo from "laravel-echo/dist/echo";
import Pusher from "pusher-js";
import ChatCard from "./components/ChatCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: "3dee6db14d109dbdceb3",
    cluster: "ap2",
    forceTLS: true,
});

export default function Chat({ chats, user, users, reciever,setuser_messages }) {
    let [messages, setmessages] = useState(chats);
    let [messagetosend, setmessagetosend] = useState("");
    const messagesContainerRef = useRef(null);

    let [currentuser, setcurrentuser] = useState(null);

    useEffect(() => {
        // Scroll to the bottom of the container once the messages are updated
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    var reciever_id = reciever ? reciever.id : 0;

    var channel = window.Echo.private(`task-wise360.1.2`);
    // var channel = window.Echo.private(`task-wise360.${user.id}.${reciever_id}`);

    channel.listen("Message", function (data) {
        setmessages(data.message);
        setuser_messages(data.message);
    });

    function sendchat() {
        if (messagetosend != "") {
            const response = axios
                .post("/api/store", {
                    message: messagetosend,
                    sender_id: user.id,
                    receiver_id: reciever.id,
                })
                .then((response) => {
                    // console.log(response.data.result);
                });
            setmessagetosend("");
        }
    }

    return (
        <>
            <div className="col-12 d-flex flex-grow-1">
                <div className="col-4 col-md-3 col-lg-2 d-flex flex-column bg-chats border-left-top-rounded">
                    <div className="p-1">
                        <p className="text-light form-label text-sm ms-3 mt-1">
                            CHATS
                        </p>
                    </div>
                    <div>
                        {users?.map((item) => {
                            if (item.id != user.id) {
                                return (
                                    <ChatCard
                                        user={item}
                                        setcurrentuser={setcurrentuser}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className="col-8 col-md-9 col-lg-10 d-flex  flex-column">
                    {reciever_id== 0 && (
                        <div className="col-12 text-light d-flex flex-column flex-grow-1 align-items-center justify-content-center">
                            <p className="text-light">
                                Send and recieve messages
                            </p>
                        </div>
                    )}
                    {reciever_id!=0 && (
                        <>
                            <div className="d-flex p-2 bg-chats ">
                                <div className="d-flex  justify-content-center align-items-center">
                                    <AccountCircleIcon
                                        className="text-light  "
                                        sx={{ fontSize: "30px" }}
                                    ></AccountCircleIcon>
                                    <label
                                        htmlFor=""
                                        className="  form-label text-light p-0 m-0"
                                    >
                                        {reciever?.name}
                                    </label>
                                </div>
                            </div>

                            <div className="col-12 text-light d-flex flex-column flex-grow-1">
                                <div
                                    class="d-flex flex-grow-1 flex-column p-2 overflow-auto"
                                    style={{
                                        maxHeight: "80vh",
                                        scrollbarWidth: "none",
                                    }}
                                    ref={messagesContainerRef}
                                >
                                    {messages.map((item, index) => {
                                        return (
                                            <>
                                                <div
                                                    class={`d-flex  justify-content-${
                                                        item.sender_id ==
                                                        user.id
                                                            ? "end"
                                                            : "start"
                                                    } mb-2`}
                                                    key={index}
                                                >
                                                    <p
                                                        class={`p-2 px-4 rounded bg-${
                                                            item.sender_id ==
                                                            user.id
                                                                ? "recieved"
                                                                : "sent"
                                                        } rounded-4`}
                                                    >
                                                        {item.message}
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>

                                <div className="d-flex p-2 col-12 ">
                                    <input
                                        onInput={(e) =>
                                            setmessagetosend(e.target.value)
                                        }
                                        value={messagetosend}
                                        autoComplete="false"
                                        type="text"
                                        id="text-chat"
                                        className=" flex-grow-1 bg-transparent border-none rounded"
                                        placeholder="Enter message here..."
                                    ></input>
                                    <button className="px-2" onClick={sendchat}>
                                        <SendIcon className="text-light" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
