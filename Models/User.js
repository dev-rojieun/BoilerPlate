const mongoose = require('mongoose'); // 몽구스 가져오기

// 비밀번호 암호화를 위해 bcrypt import
const bcrypt = require('bcrypt');
const saltRounds = 10;

// jsonwebtoken 으로 토큰 만들기
var jwt = require('jsonwebtoken');

// 몽구스를 이용해서 스키마 생성하기
const userSchema = mongoose.Schema({

    // 필드 작성하기
    name : {
        type: String,
        maxlength : 100
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
        maxlength : 100
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


userSchema.pre('save', function( next ){

    var user = this;   // 이건 users 라는 변수가 userSchema 본인이라는 뜻

    if(user.isModified('password')){    // 사용자의 비밀번호가 변경될때만 암호화한다.


        // 비밀번호를 암호하하자.
        // bcrypt 를 가져와서 gensalt > salt 를 만든다. / Salt 를 만들 때, SaltRounds 가 필요하고 
        bcrypt.genSalt( saltRounds, function (err, salt){
            if(err){
                return next(err); //에러가나면 바로 리턴
            }

            // 생성완료되면   >  sers.password (사용자가 쓴 비밀번호) , salt , 콜백함수(err(에러), hash(암호화된 비번)) { ... }
            bcrypt.hash( user.password , salt , function (err, hash) {
                if(err) { return next(err) }

                user.password = hash;  // 사용자가 쓴 비밀번호에 hash된(암호화된) 비번을 넣겟다.
                next()  // 완료되면, next() --> index 에서 user.save () 로 돌아가겠다..
            })
        })


    } else {  // 비밀번호 말고 다른걸 바꾸면 그냥 user.save () 로 넘어가도록지정
		next();
	}

});


  



userSchema.methods.comparePassword = 
    function (plainPassword, cb) {
    //plainPassword 1234567 =두개 같은지 확인 = 디비암호화 비번 :     //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };


  
userSchema.methods.generateToken = function (cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), "secretToken");

    //user._id + 'secretToken' = token
    //->
    //'secretToken' -> user._id

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};



// 토큰을 복호화하기 위한 메서드 findByToken
userSchema.statics.findByToken = function  (token , cb) {

    var user = this;

    // 파라미터로 token 을 가져왓으니 decode 한다.  >> 이 방법은 https://www.npmjs.com/package/jsonwebtoken  >> 사이트에서 verify 를 찾아서 하면된다.
    // verify()의 파라미터 중 >> secretToken 은    user._id + 문자 = token  로 했는데 98번 줄 보면 sign( user._id , "secretToken") 을 썻으므로 써주는거임..
    jwt.verify(token, 'secretToken' , function (err , decoded) {  // decoded -> 디코드된 토큰 .. user._id 가 보관되어 잇다.
        // 유저아이디를 이요해서 유저를 찾은 다음
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인.

        // 몽고dB 메서드 - findOne   // _id 는 콜백함수의 decoded  , token 은 findByToken 의 파라미터 token
        user.findOne({"_id" : decoded , "token" : token },  function (err, user) {
            if(err) return cb(err);
            cb(null, user);
        });

    });

}

const User = mongoose.model('User', userSchema);   // 스키마는 모델에 감싸진다... 이렇게 모델로 감싼다.
             // 몽구스.모델 ( 모델명 , 스키마명 );

// 이 모델을 다른 파일에서도 쓰도록 했다.
module.exports = { User }