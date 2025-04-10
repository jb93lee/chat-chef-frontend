import React from 'react'

const Title = ({pageName}) => {
    console.log("🚀 ~ Title ~ pageName:", pageName)
    if(pageName === 'home'){
        return (
            <div className="px-2 pt-6">
                  <h1 className="text-4.5xl font-black text-white">맛있는 쉐프</h1>
                  <span className="block text-sm mt-3 text-white break-keep pr-9">
                    냉장고에 있는 재료로 뭐 해먹을지 고민되시나요? 남은 재료만 넣으면
                    맛있는 레시피가 나옵니다!
                  </span>
            </div>
        )
    // }else if(pageName === 'info'){
    }else{
        return (
            <div className="px-2 pt-6">
                  <h1 className="text-4.5xl font-black text-white">
                    당신의 냉장고를 알려주세요
                  </h1>
                </div>
        ) 
    }
}

export default Title