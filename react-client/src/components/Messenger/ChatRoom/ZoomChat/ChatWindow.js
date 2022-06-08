import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Avatar from "react-avatar";
import styled from "styled-components";
import { FilePlusFill } from "react-bootstrap-icons";
import { SendMessage } from "../SendMessage/SendMessage";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { MesZoom } from "./MessageZoom";
import { io } from "socket.io-client";

const SidebarStyled = styled.div`
  color: white;
  height: 100vh;
  &&& .text-10 {
    font-size: 10px;
  }
  .message {
    width: 100% !important;
    overflow-y: scroll;
  }
  .text-you {
    margin-right: 10px;
    background-color: blue;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    width: 30% !important;
  }
  .text-other {
    margin-left: 10px;
    background-color: gray;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    width: 30% !important;
  }
  .text-20 {
    font-size: 20px;
  }
  .sendmessage {
  }
`;

export const ChatWindow = () => {
  const guid = useSelector((state) => state.User.ID.id);
  const token = Cookies.get("token");
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const user = useSelector((state) => state.User);
  const uid = user.uid;
  const time = Date.now();
  const instance = axios.create({
    timeout: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const socket = io("http://127.0.0.1:5000");
  useEffect(() => {
    socket.on("client_listening", (mes) => {
      console.log("thangdz", mes);
      setData(mes);
    });
  });
  const handleMessageInput = (e) => {
    setInput(e.target.value);
  };

  const handlePostMessage = async () => {
    const data = {
      message: input,
      guid,
    };
    await instance
      .post(`api/message`, data)
      .then((res) => {
        console.log("luu mes thanh cong");
      })
      .then((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };

  const handleSendMessage = async () => {
    socket.emit("server_listening", {
      message: input,
      guid: guid,
      uid: uid,
      time: time,
    });
    return () => socket.close();
  };
  return (
    <>
      <SidebarStyled>
        <Row className="pt-2 h-100">
          <Col xs={12} className="d-flex justify-content-center">
            <b className="text-20">Room {guid}</b>
          </Col>
          <Col xs={12} className="d-flex justify-content-end">
            <Button className="bg-transparent border-0 text-primary">
              <FilePlusFill />
              <span>Add+</span>
            </Button>
            <div className="py-2">
              <Avatar name="Le Dai Thang " size={40} round={true}></Avatar>
              <Avatar name="Thang Le" size={40} round={true}></Avatar>
              <Avatar name=". . ." size={40} round={true}></Avatar>
            </div>
          </Col>
          <Col xs={12} className="h-75 message">
            {/* {messageChat.map((e) => (
              <>
                {e.uid !== uid ? (
                  <>
                    <Col className="d-block d-flex mb-2">
                      <div>
                        <Avatar
                          name="O t h e r"
                          size={32}
                          round={true}
                          className="d-block"
                        />
                        <span className="text-10">Other</span>
                      </div>
                      <span className="pr-2 text-light text-other">
                        {e.message}
                      </span>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="d-block d-flex justify-content-end mb-2">
                      <span className="pr-2 text-light text-you">
                        {e.message}
                      </span>
                      <div>
                        <Avatar
                          name="Y o u"
                          size={32}
                          round={true}
                          className="d-block"
                        />
                        <span className="text-10 pl-2 ">You</span>
                      </div>
                    </Col>
                  </>
                )}
              </>
            ))} */}
            <MesZoom guid={guid} data={data} uid={uid} />
          </Col>
          <Col xs={12} className="d-flex">
            <Col xs={10}>
              <input
                onChange={handleMessageInput}
                className="w-100 h-100 mb-2 pl-2 bg-transparent text-light rounded"
                placeholder="Send message"
              />
            </Col>
            <Col xs={2}>
              <Button
                onClick={() => {
                  handleSendMessage();
                  handlePostMessage();
                }}
                className="bg-transparent "
              >
                Send
              </Button>
            </Col>
          </Col>
        </Row>
      </SidebarStyled>
    </>
  );
};
