const express = require('express')  // express 모듈을 가져온다.
const app = express()  // 이 함수를 이용해서 새로운 App 을 만든다.
const port = 5000   // 5000 번 포트를 백서버로 둬서 

// Mongooes Module 을 이용하여 MongoDB를 연결하자.
const mongooes = require('mongoose')
mongooes.connect('mongodb+srv://jero:abcd1234@boilerplate.xoybt.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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

app.listen(port, () =>  // port 5000 번을 통해 app 을 실행하겟다... 
{
  console.log(`Example app listening at http://localhost:${port}`)  // 로그를 찍는다.
})


