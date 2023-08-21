// import React from "react";
// import "./styles/chatitem.css";
// import { FaUser } from "react-icons/fa";
// import { RegularText } from "../../../components/Common";
// import Button from "../../../components/Button";
// import convertDate from "../../../helpers/convertDate";
// export default function ChatItem({ isAdmin = false, message = "", file = "",created='' }) {
//   return (
//     <div className={`item-cont ${isAdmin ? "admin" : null}`}>
//       <FaUser
//         style={{
//           marginTop: "auto",
//         }}
//         size={40}
//       />
//       <div className="main-item-1">
//         <div className="item-txt">
//         <RegularText
//             style={{
//               minWidth: "300px",
//               wordWrap: "break-word",
//               maxWidth: 500,
//               height: 'auto',
//               fontWeight: isAdmin ? 500 : 100,
//               padding: "20px 13px",
//               marginLeft: 10,
//               fontSize: 11,
//               color: isAdmin ? "#000" : "whitesmoke",
//             }}
//             text={message}
//           />
//            {file !== "" && (
//             <p
//               onClick={() => {
//                 let a = document.createElement("a");
//                 a.href = file;
//                 a.download = "rea_document";
//                 a.target = "_blank";
//                 a.click();
//               }}
//               style={{
//                 // width: "30%",
//                 marginTop: 10,
//                 textDecoration: 'underline',
//                 cursor: 'pointer',
//                 textAlign: 'center'
//               }}> Download File </p>
//           )}
//         </div>
//         <span style={{
//             fontWeight:'bolder',
//             fontSize:12,
//             position:'absolute',
//             bottom:0,
//             marginBottom:10,
//             right:0,
//             marginRight:10
            
//           }}>{created !== "" ? convertDate(created) : created}</span>
//       </div>
//     </div>
//   );
// }




import React from "react";
import "./styles/chatitem.css";
import { FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import convertDate from "../../../helpers/convertDate";
import { FaUserTie } from "react-icons/fa6";
import moment from "moment";
export default function ChatItem({
  isAdmin = false,
  message = "",
  file = "",
  created = "",
  user=""
}) {
  return (
    <div className={`item-cont ${isAdmin ? "admin" : null}`}>
      <div className="main-item-1" style={{
        borderRadius: isAdmin ? "10px 10px 0 10px" : "10px 10px 10px 0",
      }}>
        <div className="parent" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <span style={{
            fontWeight:500,
            fontSize:8,
            position:'absolute',
            top: 10,
            marginRight:10,
            color: isAdmin ? "#000" : "#CDCDCD",
            left: 23
            
          }}>{isAdmin ? "Admin" : user}</span>
{created &&
      <span style={{
            fontWeight:'bolder',
            fontSize:8,
            position:'absolute',
            top: 10,
            right:0,
            marginRight:10,
            color: isAdmin ? "#000" : "#CDCDCD",
          }}> {moment(created).calendar()}</span>
}
          </div>
        <div className="item-txt">
          <RegularText
            style={{
              // minWidth: "300px",
              wordWrap: "break-word",
              maxWidth: 500,
              height: 'auto',
              fontWeight: isAdmin ? 500 : 100,
              padding: "20px 13px",
              marginLeft: 10,
              fontSize: 11,
              color: isAdmin ? "#000" : "whitesmoke",
            }}
            text={message}
          />
          {file !== "" && (
            <p
              onClick={() => {
                let a = document.createElement("a");
                a.href = file;
                a.download = "rea_document";
                a.target = "_blank";
                a.click();
              }}
              style={{
                // width: "30%",
                marginTop: 10,
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center'
              }}> Download File </p>
          )}
          
        </div>
        
      </div>
      
    </div>
  );
}
