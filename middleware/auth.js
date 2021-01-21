const { User } = require('../Models/User');

let auth = (req, res, next) => {

    // 인증처리를하는 곳

    // 클라이언트 쿠키에서 토큰 가져오기 - cookie-parser 이용
    let token = req.cookies.x_auth;// 쿠키넣을 때 x_auth 를 넣엇으니 이렇게하면, 쿠키에서 토큰을 가져오는 것.
    
    // 가져온 토큰을토큰을 복호화한 후 유저를 찾는다. - 유저모데 레서 메서드를 만들어서 한다. - 유저모델 임폴트 - findByToken() 메서드 유저모델에서 만들기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json ({ isAuth : false, err : true });

        req.token = token;
        req.user = user;  // 여기서 req 에 token 과 user 의 정보를 넣어주는 이유는 .... index.js 의 req 에서 req.user 를 햇을때, user정볼르가질 수 있고, req.token 을 하면 토큰을 정보를 가져올 수있도록 하기 위해서 넣어준것이다.

        next(); // 이유는 index.js 의 미들웨어에서 계속 갈 수 있도록함
    })

    // 유저가 있으면 Okay

    // 유저가 없으면 No!
}

// 다른 파일에서 사용할 수있도록 처리
module.exports = { auth };