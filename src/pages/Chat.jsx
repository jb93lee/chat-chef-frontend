import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import { MoonLoader } from "react-spinners";

const Chat = ({ingredientList}) => {
  // logic
  const [value, setValue] = useState("");

  // .env 파일 호출
  const serverAddr = process.env.REACT_APP_SERVER_ADDRESS;

  // TODO: set함수 추가하기
  const [messages, setMessages] = useState([]); // chatGPT와 사용자의 대화 메시지 배열
  const [isInfoLoading, setIsInfoLoading] = useState(true); // 최초 정보 요청시 로딩
  const [isMessageLoading, setIsMessageLoading] = useState(true); // 사용자와 메시지 주고 받을때 로딩
  const hadleChange = (event) => {
    const { value } = event.target;
    console.log("value==>", value);
    setValue(value);
  };

  const hadleSubmit = (event) => {
    event.preventDefault();
    console.log("메시지 보내기");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: value },
    ]);
    setValue("");
    // setIsMessageLoading(true); // 메시지 전송시 로딩

  };

  const sendInfo = async () => {
    try {
      // 서버에 재료 목록 전송
      const response = await fetch(`${serverAddr}/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientList }),
      });
      const result = await response.json();
      const lastMessage = result.data[result.data.length - 1]; // 예시 구조에 따라 수정 필요
      
      if(!result.data) return;
      
      const removeLastDataList = result.data.slice(0, -1); // 마지막 데이터 제거
      console.log("🚀 ~ sendInfo ~ removeLastDataList:", removeLastDataList);
      
      // setInfoMessages(removeLastDataList); // 메시지 전송

      const newMessage = { role: "assistant", content: lastMessage.content };
      setMessages((prev) => [...prev, newMessage]);
      
      // console.log("🚀 ~ sendInfo ~ new message:", newMessage);
      
    }
    catch (error) { 
      console.error("Error:", error);
    }
    finally {
      setIsInfoLoading(false);
      setIsMessageLoading(false); // 메시지 전송시 로딩
      console.log("로딩 완료"); 
    }     
  }

  useEffect(() => {
    sendInfo();
    console.log("🚀🚀🚀🚀~ ingredientList:", ingredientList);
    console.log("🚀 ~ Chat ~ serverAddr:", serverAddr);
  } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []); 

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {isInfoLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MoonLoader color="#46A195" />
          </div>
        </div>
      )}

      {/* START: 로딩 스피너 */}
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-chef-green-500">
          <span className="block text-xl text-center text-white">
            맛있는 쉐프
          </span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} isLoading={isMessageLoading} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form
            id="sendForm"
            className="w-full px-2 h-full"
            onSubmit={hadleSubmit}
          >
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={hadleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-chef-green-500 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  );
};

export default Chat;
