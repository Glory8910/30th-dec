console.log('hii')
let express = require("express");
let app = express();
let body = require('body-parser');
const e = require("express");

let quesans = [];

app.use(body.json());


let quesarr = [];
let optarr = [];
let quesansarr = [];

// to add ques
app.post("/ques", (req, res) => {
  let quesno = quesarr.length + 1;
  req.body.ques_no = quesno;

  req.body.options = [];
  if(req.body.ques===undefined || req.body.ques===" "){
    res.json({"message":"please enter valid question"})
  }else{
  quesarr.push(req.body);
  
  console.log(quesarr);
  res.json({ message: "question created" })
  }
});

// to add options
app.put("/option/:quesid", (req, res) => {

  let queind = quesarr.findIndex((ele, ind) => ele.ques_no == req.params.quesid);

  console.log(queind);
  if(req.body.ques_id==undefined || req.body.option_id==undefined || req.body.option==undefined || req.body.score==undefined || req.body.iscorrect==undefined){
 
    res.json({"message":" please enter all the values"})

  }
  else{
  quesarr[queind].options.push(req.body);

  optarr.push(req.body);
  console.log(optarr, quesarr);
  res.json({"message":"options are added"})
  }

})
// to see questions and options  based on question id
app.get("/quesandoptions/:queid",(req,res)=>{
  let findques=quesarr.findIndex((ele,ind)=>ele.ques_no == req.params.queid)
  if(findques===-1){
res.json({"message":"question is not present"})
  }
  else{
  let newarr={};
  newarr[quesarr[findques].ques_no]=quesarr[findques].ques;

  quesarr[findques].options.forEach((e,ind) => {
    console.log(e ,"ele");
    newarr[e.option_id] =e.option;
   
  });
  
  res.send(newarr)
  }
});

// to give answer to question by question id and option id
app.post("/answer/:quesid/:optid",(req,res)=>{
  let findquesid=quesarr.findIndex((ele,ind)=>ele.ques_no==req.params.quesid);
  let findoptid=quesarr[findquesid].options.findIndex((elem,index)=>elem.option_id==req.params.optid);
console.log(findoptid,findquesid);
if(findoptid!==-1 && findquesid!==-1){
if(quesarr[findquesid].options[findoptid].iscorrect===true){
  res.json({
    "message":"answer is checked and correct",
    "score is":quesarr[findquesid].options[findoptid].score
  })
}
else {
res.json({
  "message":"answer is checked and was wrong",
  "score is":quesarr[findquesid].options[findoptid].score

})
}
}
else{
  res.json({"message":"either the question number or the options are not valid"})
}
})
app.listen(3000);