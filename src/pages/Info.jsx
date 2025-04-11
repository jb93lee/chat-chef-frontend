import React, { useEffect, useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Info = ({sendIngredientList}) => {
  // logic

  // TODO: set함수 추가하기
  const [ingredientList, setIngredientList] = useState([]); // 재료 목록
  
  const addIngredient = () => {
    console.log("재료 추가하기")
    const id = Date.now(); // 현재 시간을 id로 사
    const newItem = {
      id,
      lable : `ingredient_${id}`,
      text : "재료명",
      value : "",
    }
    setIngredientList(([...ingredientList, newItem])); // 재료 목록에 새로운 재료 추가  
  
  };

    const handleChange = (id, newValue) => {
      setIngredientList((prevList) =>
        prevList.map((item) => (item.id === id ? { ...item, value: newValue } : item))
      ); // 재료 목록에서 해당 재료의 value 업데이트
    }

  const handleRemove = (id) => {
    setIngredientList((prevList) => prevList.filter((item) => item.id !== id)); // 재료 목록에서 해당 재료 삭제
  };

  const history = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleNext = () => {
    const filterDataList = ingredientList.filter((item) => item.value.trim() !== '')
    if (filterDataList.length) {
      sendIngredientList(filterDataList); // 재료 목록을 부모 컴포넌트로 전달
      history('/chat');
      return
    }
    alert('재료명을 1개이상 입력해주세요')
  }

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <Title pageName="info"/>
        {/* // TODO:Title 컴포넌트 */}

        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput key={item.id} content={item} onRemove={handleRemove} onChange={handleChange} />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
