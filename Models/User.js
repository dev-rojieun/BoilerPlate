const mongoose = require('mongoose'); // 몽구스 가져오기

// 몽구스를 이용해서 스키마 생성하기
const userSchema = mongoose.Schema({

    // 필드 작성하기
    name : {
        type: String,
        maxlength : 50
    },
    email : {
        type: String,
        trim : true, // trim 이 뭐냐면, 혹시 모를 사용자의 실수로 스페이스가 있다면 없애주는 역할 
        unique : 1 // 유일값
    },
    password : {
        type: String,
        minlength : 5
    },
    lastname : {
        type: String,
        maxlength : 50
    },
    role : { // 권한
        type : Number,
        default : 0 // 기본권한 0
    },
    image : {
        type: String,
    },
    token : {  // 유효성관리
        type: String,
    },
    tokenExp : { // 토큰 유효기간
        type : Number
    }

});



const User = mongoose.model('User', userSchema);   // 스키마는 모델에 감싸진다... 이렇게 모델로 감싼다.
             // 몽구스.모델 ( 모델명 , 스키마명 );

// 이 모델을 다른 파일에서도 쓰도록 했다.
module.exports = { User }