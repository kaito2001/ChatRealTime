import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editIdRoom } from "../../../../store/action";

export const JoinZoom = () => {
  const [id, setId] = useState("");
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const handleJoinRoom = () => {
    setRoom(id);
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
  useEffect(async () => {
    dispatch(editIdRoom(room));
    await instance
      .post(`api/join/${room}`)
      .then((response) => {
        console.log("join", response);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }, [room]);
  return (
    <>
      <Col className="d-flex mt-2" xs={12}>
        <Col className="pl-0" xs={8}>
          <input
            className="w-100 h-100 pl-2 bg-transparent text-light rounded"
            onChange={(e) => setId(e.target.value)}
            placeholder="Search ID Room"
          />
        </Col>
        <Col xs={4}>
          <Button
            onClick={() => {
              handleJoinRoom();
            }}
          >
            Join
          </Button>
        </Col>
      </Col>
    </>
  );
};
