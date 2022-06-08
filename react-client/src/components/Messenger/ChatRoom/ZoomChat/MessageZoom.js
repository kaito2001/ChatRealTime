import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Avatar from "react-avatar";
import axios from "axios";
import Cookies from "js-cookie";

const messageChat = [];
export const MesZoom = (props) => {
  const { guid, data, uid } = props;
  const [mes, setMes] = useState([]);
  const [check, setCheck] = useState(false);
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
    await instance.get(`api/conversation/${guid}`).then((res) => {
      console.log("res", res);
      setMes(res);
    });
  }, []);
  if (mes.length !== 0) {
    setCheck(true);
  }
  useEffect(() => {
    for (let i = 0; i < mes.length; i++) {
      messageChat.push(mes[i]);
    }
    console.log("meshis", messageChat);
  }, [check]);

  useEffect(() => {
    const sizeMes = messageChat.length - 1;
    if (JSON.stringify(data) !== JSON.stringify(messageChat[sizeMes])) {
      messageChat.push(data);
    }
  });
  return (
    <>
      <div className="w-100">
        {messageChat.map((e) => (
          <>
            {e.guid !== undefined && e.guid === guid ? (
              <>
                {e.uid !== undefined && e.uid !== uid ? (
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
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </>
  );
};
