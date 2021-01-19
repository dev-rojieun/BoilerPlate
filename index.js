const express = require('express');  // express 모듈을 가져온다.
const app = express();  // 이 함수를 이용해서 새로운 App 을 만든다.
const port = 5000;   // 5000 번 포트를 백서버로 둬서 

// Mongooes Module 을 이용하여 MongoDB를 연결하자.
const mongoose = require('mongoose');

// 회원가입시 필요한 정보를 얻기 위해 User model import
const { User } = require('./Models/User');

// body-parser : client 에서 오는 정보를 Server에서 분석해서 가져올 수있게 해준다.
const bodyPaser = require('body-parser');




mongoose.connect('mongodb+srv://jero:abcd1234@boilerplate.xoybt.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : true     // 이걸 써줘야 에러가 안떠서 써줌!
}).then( () => console.log('MongoDB Connected ... Success') )
  .catch( err => console.log(err) )


// express app을 넣은 후에
app.get
('/', (req, res) => // 루트 디렉토리 / 에 
{
  res.send('Hello World!') // 헬로월드를 출력되게 해준다..
})

app.use(bodyPaser.urlencoded({extended : true}));  // bodyPaser.urlencoded -> Applicaiton/x-www-form-urlencoded 로 된 정보를 분석해서 가져올 수 있게 해준다. 
app.use(bodyPaser.json()); // Application/Json 타입을 분석해서 가져올 수 있게 해줌


app.post ('/register', (req, res) => {

    // 회원가입시 필요한 정보(User.js ) 를 Client 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다. 

    //인스턴스 생성 - 분석한 정보를 데이터베이스에 넣기 위해서 req.body 를 넣어줌
    /*
    req.body 에는 어떤 정보가 있나 -> User.js 에 있는 필드들이 Json 형태 로 저장되어 있는데
    이렇게 저장되어 있을 수 있는 이유가 body-Parser 덕분임
    ==> body-Parser 를 이요해서 req.body 로 클라이언트에서 보내는 정보를 받아준다고 생각하면 됨
    {
        id : "hello",
        password : "dddd"
    }
    */
    const user = new User ( req.body );

    // user 를 이용해서 유저모델의 정보를 저장한다. ..... .save() < 이거는 몽고DB에서 오는 메서드임 
    user.save( (err, userInfo) => {  // 콜백 함수
            // 만약 저장시 에러가 있다면, 클라이언트에 에러 정보를 json 형식으로 전달
        if(err) return res.json({ success : false , err})   

        //성공시  -- res.status(200) 성공했다는 표시 클라이언트에게 출력 
        return res.status(200).json({
            success : True
        })
    });

})


app.listen(port, () =>  // port 5000 번을 통해 app 을 실행하겟다... 
{
  console.log(`Example app listening at http://localhost:${port}`)  // 로그를 찍는다.
})


