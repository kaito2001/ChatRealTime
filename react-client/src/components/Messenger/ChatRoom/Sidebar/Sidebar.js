import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Collapsible from "react-collapsible";
import { FilePlusFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { addMessage, editIdRoom } from "../../../../store/action";
import { JoinZoom } from "../JoinRoom";
import { io } from "socket.io-client";
import axios from "axios";

const SidebarStyled = styled.div`
  background: #04040459;
  color: white;
  height: 100vh;
`;

export const Sidebar = () => {
  const [collaps, setCollaps] = useState(false);
  const [status, setStatus] = useState(false);
  const [room, setRoom] = useState([]);
  const [mes, setMesHis] = useState([]);
  const data = useSelector((state) => state.User);
  const name = data.display_name;
  const id = data.uid.toString();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleIdRoom = (e) => {
    dispatch(editIdRoom(e));
    dispatch(addMessage(mes));
  };

  const token = Cookies.get("token");
  const instance = axios.create({
    timeout: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const handleMesHistory = async (e) => {
    instance
      .get(`/api/conversation/${e}`)
      .then((response) => {
        // console.log("res", response.data);
        setMesHis(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
  const handleCreateRoom = async () => {
    await instance
      .post("/api/conversation")
      .then((response) => {
        console.log("a", response);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
  const handleEmitListRoom = () => {
    const socket = io("http://localhost:5000");
    socket.on("logged_in", (response) => {
      console.log("log_in", response);
    });
    socket.emit("logged_in", room);
    return () => socket.close();
  };
  useEffect(async () => {
    await instance
      .get(`/api/list/${id}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }, [status]);
  return (
    <>
      <SidebarStyled>
        <Row className="px-2">
          <Col xs={12} className="d-flex text-center mt-2">
            <Avatar name={name} size={40} round={true} />
            <span className="mx-2 py-2">{name}</span>
            <Button
              onClick={() => {
                Cookies.remove("token");
                history.push("/login");
              }}
              className="ml-5 bg-transparent bd-0"
            >
              Sign Out
            </Button>
          </Col>
          <JoinZoom />
          <Col xs={12} className="pt-4">
            <Button
              onClick={() => {
                setCollaps(!collaps);
                handleEmitListRoom();
              }}
            >
              List room
            </Button>
            <Collapsible open={collaps} className="text-primary">
              {room.map((e) => (
                <Button
                  onClick={() => {
                    handleMesHistory(e.guid);
                    handleIdRoom(e.guid);
                  }}
                  className="bg-transparent d-block border-0 fs-12"
                >
                  Room {e.guid}
                </Button>
              ))}
              <Button
                onClick={() => {
                  setStatus(!status);
                  handleCreateRoom();
                }}
                className="bg-transparent d-block border-0"
              >
                <FilePlusFill />
                <span className="pl-2 ">Create Room</span>
              </Button>
            </Collapsible>
          </Col>
        </Row>
      </SidebarStyled>
    </>
  );
};
