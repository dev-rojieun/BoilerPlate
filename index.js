const express = require('express');  // express 모듈을 가져온다.
const app = express();  // 이 함수를 이용해서 새로운 App 을 만든다.
const port = 5000;   // 5000 번 포트를 백서버로 둬서 

// body-parser : client 에서 오는 정보를 Server에서 분석해서 가져올 수있게 해준다.
const bodyPaser = require('body-parser');

// 회원가입시 필요한 정보(아이디, 비번, 이메일 등)를 얻기 위해 User model import
const { User } = require('./Models/User');

// 권한 처리를 위해 import
const { auth } = require('./middleware/auth');

// 몽고DB의 정보를 가져오기 위해!
const config = require('./config/key');

// Mongooes Module 을 이용하여 MongoDB를 연결하자.
const mongoose = require('mongoose');


// 토큰을 쿠키에 저장하기 위해서 cookie-parser 연결
const cookieParser = require('cookie-parser');



mongoose.connect(config.mogoURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false     // 이걸 써줘야 에러가 안떠서 써줌!
}).then( () => console.log('MongoDB Connected ... Success') )
  .catch( err => console.log(err) )



// express app을 넣은 후에
app.get('/', (req, res) => // 루트 디렉토리 / 에 
  res.send('Hello World! Greeting!') // 헬로월드를 출력되게 해준다..
)


app.use(bodyPaser.urlencoded({extended : true}));  // bodyPaser.urlencoded -> Applicaiton/x-www-form-urlencoded 로 된 정보를 분석해서 가져올 수 있게 해준다. 
app.use(bodyPaser.json()); // Application/Json 타입을 분석해서 가져올 수 있게 해줌

app.use(cookieParser());   // 쿠키파서 쓰기


app.post ('/api/users/register', (req, res) => {

    // 회원가입시 필요한 정보(User.js ) 를 Client 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다. 
    const user = new User ( req.body );

    // 
    user.save( function (err, UserInfo)  {  
        if(err) return res.json({ success : false , err})   

        return res.status(200).json({
            success : true
        })
    });

})



// 로그인 라우트 만들기
app.post('/api/users/login', (req,res) => {
  
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾아보자.
  // User 모델(user colleciton)에서 .findOne (몽고DB제공 메소드)  ({ 찾고자하는 요청된 이메일을 넣고 , 콜백함수 (err, userInfo) {} })
  
  User.findOne ({ email : req.body.email } , function (err, user) {

    // 만약, user Colleciton 안에 이메일을 가진 유저가 없다면,, userInfo 가 없으니까 그냥 리턴을 할떄, res.json로 로그인 실패, 메세지 출력
    if(!user) {
      return res.json ({ loginSuccess : false, message : "제공된 이메일에 해당하는 유저가 없습니다." });
    }

    // 2. 요청한 이메일이 있다면, 비밀번호가 맞는지 확인한다.
    // user 의 비밀번호가맞는지 비교하는 메서드를 쓸건데, 이건 User.js 에서 만들것.
    // req.body.password 사용자의 비밀번호! ( 로그인에서 친 비밀번호 )
    // 콜백함수 (에러, 비밀번호를 비교 후 로그인에서 친 비번과 디비의 비번이 맞다면 isMatch 로 비번 가져옴)
    user.comparePassword( req.body.password, function (err, isMatch)  {

      // User.js 에서 comparePassword() 로 비번을 비교한다음
      if(!isMatch) {
        return res.json ({loginSuccess : false , message : "비밀번호가 틀렸습니다."})
      }


      // 3. 비밀번호까지 맞다면, 해당 유저를 위한 Token 을 생성하자.
      // ====> 그러기 위해서 JSONWEBTOKEN 라이브러리를 다운로드한다.   >> npm install jsonwebtoken --save   ( https://www.npmjs.com/package/jsonwebtoken )
      // User.js 에서 generateToken 메서드 생성 (토큰을 생성해야하므로)
      user.generateToken( function (err, user) {

        if(err) {
          return res.status(400).send(err)
        }

        // 토큰을 저장한다 -> 어디에? 쿠키나 로컬스토리지, 세션 등 여러군데에 저장할 수 있다. (개발자모드 f12 에서  applicaiton 에 보면 있다.)
        // 토큰을 저장하는 곳은 여러곳인데, 우리는 쿠키에 저장한다. -> 쿠키에 저장하기 위해서 라이브러리 설치한다.   express 에서 제공하는 cookie-parser 를 설치한다.    npm install cookie-parser --save
        // 라이브러리 설치 완료시 cookie-parser 임폴트
        // 이렇게 해주면 F12 Cookie 에 x_auth 라는 이름으로 쿠키저장
        res.cookie("x_auth", user.token )    
        .status(200)
        .json ({loginSuccess : true , userId : user._id});

      });

    });

  });

});


/*
Route 를 나중에 정리할껀데,
user / product / comment 등 여러가지로 분류될껀데
이걸 한군데로 정리하면 길어질거라서
Router <- Express 에서 제공하는 Router 정리기능을 사용할것이야... 나중에는
 */


// Auth 를 위한 라우터
// auth 라는 미들웨어 > 이 엔드포인트의 리퀘스트를 받고, 콜백 전에 중간에서 뭘 해주는데 이걸 위해서 우리는  middleware 폴더 > auth.js 를 만들어서 인증처리를하는 하기 위한 auth 를 정리할 것. 
// auth 를 import 해주자.
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과해 왔다는 것은 -> Authentication 이 True 라는 것이다. >> True 라는 것을 client 에 전달하기 위해서 코드기입
  req.status(200).json({
    _id : req.user.id, // 이렇게 할 수 있는건 auth.js 에서 req.user : user 로 했기 때문..
    isAdmin : req.user.role == 0 ? false : true ,     // 지금은   role 이 0이면 일반유저 , 0 이 아니면 관리자 라는 뜻으로함
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    rol : req.user.role,
    image : req.user.image
  });

});



// 로그아웃 Route 
app.get('/api/users/logout' , auth , (req , res ) => {

  // user 모델을 가져와서 user를 찾아서 데이터를 업데이트 시켜주는 메서드
  User.findOneAndUpdate ( 
    {_id : req.user._id}, // 유저는 아이디로 찾는다. (auth 미들웨어에서  req.user = user 로 넣어줫으니까!)
    { token : "" },    // token 을 지워준다.
    (err, user ) => {  
      if(err) return res.json({success : false , err}); // 에러가 낫다면..
      return res.status(200).send({success : true});   // 성공했다면...
    }
  );

});



app.listen(port, () =>  // port 5000 번을 통해 app 을 실행하겟다... 
{
  console.log(`Example app listening at http://localhost:${port}`)  // 로그를 찍는다.
})


