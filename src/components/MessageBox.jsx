import React, { useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";

const MessageBox = ({ messages, isLoading }) => {
  // logic
  const ref = useRef(null);

  useEffect(() => {
    // 자동 스크롤
    if (!messages.length) return;
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  // view
  return (
    <>
      {messages.map((data, index) => (
        <div key={index}>
          {(data.role === "user") ? (
            // user 채팅
            <div className="py-4 max-w-3/4 ml-auto text-right">
              <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-chef-green-500 text-white rounded-tr-none">
                {data.content}
              </span>
            </div>
          ) : (
            // assistant 채팅
            <div className="py-4 max-w-3/4 flex">
              <div className="min-w-10 w-10 max h-10 bg-chef-green-500 rounded-full overflow-hidden">
                <img src={"./images/chef.svg"} alt="chef" />
              </div>
              <div className="pl-3">
                <span className="text-base font-medium">맛있는 쉐프</span>
                <div className="pt-3 pl-2">
                  <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-chef-gray-100 rounded-tl-none whitespace-pre-wrap">
                    {data.content}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="py-4 max-w-3/4 flex">
          <div className="min-w-10 w-10 max h-10 bg-chef-green-500 rounded-full overflow-hidden">
            <img src={"./images/chef.svg"} alt="" />
          </div>
          <div className="pl-3">
            <span className="text-base font-medium">맛있는 쉐프</span>
            <div className="pt-3 pl-2">
              <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-chef-gray-100 rounded-tl-none whitespace-pre-wrap">
                {/* {data.content} */}
                <PulseLoader size={5} color="#46A195" />
              </span>
            </div>
          </div>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default MessageBox;
