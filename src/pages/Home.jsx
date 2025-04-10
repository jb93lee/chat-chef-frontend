import React from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // logic
  const pageName = "home"; // 페이지 이름

  const history = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const handleStart = () => {
    history("/info"); // info 페이지로 이동

    // console.log("레시피 요청 시작");
    // try {
    //   // API 요청
    //   const res = await fetch("http://localhost:8080/recipe", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ ingredientList: ["계란", "양파", "두부"] })
    //   });
  
    //   const result = await res.json();
    //   console.log("🍳 레시피 응답:", result);
    // } catch (e) {
    //   console.error("❌ 요청 실패:", e);
  //   // }
  //   console.log("info페이지로 이동");
  //   try{
  //     // API 요청
  //     const res = await fetch("http://localhost:8080/message", {
  //       method: "POST",
  //       headers: {"Content-Type": "application/json"},
  //       body: JSON.stringify({userMessage: "안녕하세요"})});
      
  //     const result = await res.json();
  //     console.log(result);

  //   }catch(e){
  //     console.error(e);
  //   } 
  }; 

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-96"></i>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/3 -z-10">
        <img src="./images/hero.svg" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <Title pageName={pageName}/>
        {/* START:Button 영역 */}
        <Button
          text="Get started"
          color="bg-chef-green-500"
          onClick={handleStart}
        />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Home;
