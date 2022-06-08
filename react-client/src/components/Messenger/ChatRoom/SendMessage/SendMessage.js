// import { useEffect, useState } from "react";
// import { Col, Button } from "react-bootstrap";
// import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { addMessage } from "../../../../store/action";

// const Send = styled.div`
//   display: flex;
//   &&& .sendmessage {
//     height: 40px;
//     background-color: #b4b4d59e;
//     border-radius: 10px;
//     border: none;
//     padding-left: 10px;
//   }
// `;

// export const SendMessage = (id) => {
//   const guid = id.guid;
//   const user = useSelector((state) => state.User);
//   const uid = user.uid;
//   const time = Date.now();
//   const [input, setInput] = useState("");
//   const [message, setMessage] = useState("");
//   const [data, setData] = useState();
//   const socket = io("http://localhost:5000");
//   // useEffect(() => {
//   //   socket.on("client_listening", (mes) => {
//   //     console.log("room", mes);
//   //   });
//   // }, [message]);
//   const handleMessageInput = (e) => {
//     setInput(e.target.value);
//   };
//   const handleSendMessage = () => {
//     setMessage(input);
//     socket.emit("server_listening", {
//       message: input,
//       guid: guid,
//       uid: uid,
//       time: time,
//     });
//     return () => socket.close();
//   };
//   return (
//     <div>
//       <Send>
//         <Col xs={10}>
//           <input
//             onChange={handleMessageInput}
//             className="w-100 sendmessage"
//             placeholder="Send message"
//           />
//         </Col>
//         <Col xs={2}>
//           <Button onClick={handleSendMessage} className="bg-transparent ">
//             Send
//           </Button>
//         </Col>
//       </Send>
//     </div>
//   );
// };
