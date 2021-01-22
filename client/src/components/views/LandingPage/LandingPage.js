import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage(props) {

    // 랜딩페이지에 접속하면 useEffect() 를 실행한다.
    useEffect(() => {
        // get request를 서버의 엔드포인트(/api/hello)로 보낸다.
        axios.get('/api/hello')
            .then(response => console.log(response));// 보낸 뒤 서버에서 돌아오는 response를 콘솔창에 보여줄 수 있도록 해줌
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                // console.log(response.data)
                if(response.data.success){
                    props.history.push("/login")
                }else{
                    alert("Failed to logout")
                }
            })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems : 'center', width : '100%' , height : '100vh'}}>
            <h2>시작페이지</h2>
            
            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
    )
}

export default LandingPage