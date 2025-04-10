import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const InfoInput = ({ content, onRemove, onChange }) => {
  // logic
  const { id, label, text } = content;

  // value를 상태로 관리
  const [value, setValue] = useState(content.value || "");

  const handleRemove = () => {
    onRemove(id); // Info.jsx에서 전달된 handleRemove 호출
    console.log("재료 삭제하기");
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // 상태 업데이트
    console.log("재료 변경하기", newValue);
    onChange(id, newValue); // Info.jsx에서 전달된 onChange 호출
  };

  // view
  return (
    <div className="py-2 first:pt-0 last:pb-0 ">
      <div className="relative">
        <label
          htmlFor={label}
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                      absolute"
        >
          {text}
        </label>
        <input
          type={"text"}
          id={label}
          name={label}
          placeholder={"남은 재료를 입력해주세요"}
          className="border placeholder-gray-400 focus:outline-none
                      focus:border-black w-full pt-4 pr-9 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      border-chef-gray-200 rounded-2xl placeholder:text-chef-gray-200"
          value={value} // 상태를 value로 연결
          onChange={handleChange} // handleChange 함수 연결
        />
        <button
          type="button"
          className="absolute right-3 inset-y-0 flex items-center px-1"
          onClick={handleRemove}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default InfoInput;
