import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {

    // 랜딩페이지에 접속하면 useEffect() 를 실행한다.
    useEffect(() => {
        // get request를 서버의 엔드포인트(/api/hello)로 보낸다.
        axios.get('/api/hello')
            .then(response => console.log(response));// 보낸 뒤 서버에서 돌아오는 response를 콘솔창에 보여줄 수 있도록 해줌
    }, [])

    return (
        <div>
            LadingPage
        </div>
    )
}

export default LandingPage