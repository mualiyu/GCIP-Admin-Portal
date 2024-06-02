import React from "react";
import "../styles/messages.css";
import Input from "../../components/Input";
import MessageUser from "./components/MessageUser";
import { FaUserTie, FaPaperPlane, FaPaperclip } from "react-icons/fa6";
import {
  FaCartArrowDown,
  FaFile,
  FaUser,
  FaUserAlt,
  FaUserTag,
} from "react-icons/fa";
import { RegularText } from "../../components/Common";
import Loading from "../../components/Loading";
import { useState } from "react";
import ChatItem from "./components/ChatItem";
import { FcFile } from "react-icons/fc";
import { AttachIcon, SendIcon } from "../../assets/Svg/Index";
import { useEffect } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { useRef } from "react";
import nProgress from "nprogress";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import convertDate from "../../helpers/convertDate";
import { setUnread } from "../../redux/user/userSlice";

export default function Messages() {
  const fileRef = useRef();
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState([]);
  const [activeName, setActiveName] = useState("");
  const [typed, setTyped] = useState("");
  const data = useSelector((data) => data);
  const myFormData = new FormData();
  const [loading, setLoading] = useState(false);
  const [attach, setAttach] = useState("");
  const [files, setFiles] = useState(null);
  const [id, setId] = useState("");
  const [alertText, setAlert] = useState("");
  const dispatch = useDispatch();

  const getData = async () => {
    nProgress.start();
    setLoading(true);
    const respone = await query({
      method: "GET",
      url: `/api/admin/messages/${data.program.id}`,
      token: data.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (respone.success) {
      setMessages(respone.data.data.message.reverse());
    } else {
      setMessages([]);
    }
  };
  const readMessage = async (id, unread) => {
    const respone = await query({
      method: "POST",
      url: `/api/admin/messages/read/${data.program.id}/${id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      if (data.user.unread > 0) {
        const newUnread = data.user.unread - unread;
        dispatch(setUnread(newUnread));
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Alert text={alertText} />
      <div className="message-container">
        <div className="chat-list-container">
          <div className="chatlist-main">
            <h2>Messaging</h2>
            <Input
              outlined
              label=""
              className="search"
              placeholder="Search... "
            />
            <h4>Recent</h4>
            <div className="main-chat-lists">
              {messages.length > 0 &&
                messages.map((msg, ind) => (
                  <MessageUser
                    onClick={() => {
                      const newMesg = [...msg.messages];
                      newMesg.reverse();
                      setActiveMessage(newMesg);
                      setActiveName(msg.name);
                      setId(msg.applicantId);
                      if (msg.unread > 0) {
                        readMessage(msg.applicantId, msg.unread);
                      }
                    }}
                    name={msg.name}
                    title={convertDate(msg.lastMessage)}
                    unread={msg.unread}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="main-chats">
          <div className="messaage-head">
            <RegularText
              style={{
                fontWeight: "bold",
              }}
              text={activeName}
            />
          </div>
          <div className="chats">
            {loading && <Loading loading={loading} />}

            {activeMessage.length == 0 && (
              <div className="empty-msg">
                <RegularText text="Select applicant to view messages." />
              </div>
            )}
            {activeMessage.length > 0 && (
              <>
                {activeMessage.map((msg, ind) => (
                  <Fade>
                    <ChatItem
                      message={msg.msg}
                      isAdmin={msg.from !== "Admin"}
                      file={msg.file !== "" ? msg.file : ""}
                      created={msg.created_at}
                      user={data.user.user.name}
                    />
                  </Fade>
                ))}
              </>
            )}
          </div>
          {/* <div className="divider"/> */}

          <div className="chat-input">
            <Input
              value={typed}
              onChange={(e) => {
                setTyped(e.target.value);
              }}
              outlined
              style={{
                width: "45%",
                marginTop: 0,
              }}
              label=""
              placeholder="Enter message...."
            />
            <div
              className="paper_plane"
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}>
              <FaPaperclip
                onClick={() => {
                  fileRef.current.click();
                }}
              />
              <span
                style={{
                  color: "#006438",
                  fontSize: 10,
                  textAlign: "center",
                  position: "absolute",
                  top: -45,
                  transform: "translateY(13px)",
                  width: "100%",
                  marginLeft: 10,
                  backgroundColor: "transparent",
                }}>
                {attach}
              </span>
            </div>

            <input
              onChange={(e) => {
                const files = e.target.files;
                // files?.length && myFormData.append("file", files[0]);
                setFiles(files[0]);
                setAttach(files[0].name);
              }}
              style={{ width: 0, height: 0 }}
              type="file"
              ref={fileRef}
            />
            <FaPaperPlane
              onClick={() => {
                if (typed == "") {
                  setAlert("Message cant be empty!");
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);

                  return;
                }
                myFormData.append("msg", typed);
                myFormData.append("file", files);
                myFormData.append("applicant_id", id);

                nProgress.start();
                fetch(
                  `https://api.grants.amp.gefundp.rea.gov.ng/api/admin/messages/${data.program.id}`,
                  {
                    method: "POST",
                    body: myFormData,
                    headers: {
                      Authorization: "Bearer " + data.user.user.token,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    nProgress.done();
                    if (data.status) {
                      setAlert("Message delivered");
                    } else {
                      setAlert("Unable to send message, please try again");
                    }
                    setTimeout(() => {
                      setAlert("");
                    }, 2000);
                  })
                  .catch(() => {
                    nProgress.done();
                  });
                setActiveMessage((prev) => [
                  ...prev,
                  {
                    msg: typed,
                    from: "Admin",
                    file: "",
                    created_at: "",
                    user: data.user.user.name,
                  },
                ]);
                setTyped("");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
