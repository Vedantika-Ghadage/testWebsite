
  var firebaseConfig = {
    apiKey: "AIzaSyDCYDJzqPLo0I51CDQQj02PDIIxw_hW5po",
    authDomain: "conatactform.firebaseapp.com",
    databaseURL: "https://conatactform.firebaseio.com",
    projectId: "conatactform",
    storageBucket: "conatactform.appspot.com",
    messagingSenderId: "230075649297",
    appId: "1:230075649297:web:fbd89a94fdb8db2c9c10b0",
    measurementId: "G-8JFYVG5LHX"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();  


  var messagesRef=firebase.database().ref('messages');



document.getElementById('registrationform').addEventListener('submit',registerForm);
document.getElementById('loginform').addEventListener('submit',LoginForm);

function registerForm(e){

  e.preventDefault();
  
  var name=getInputValue('name');
  var emailid=getInputValue('emailid');
  var password=getInputValue('password');
  var cpassword=getInputValue('cpassword');
  var verifired=false;

  var db = firebase.database();
  db.ref("messages").once("value", function (snap) {
    var value1 = snap.val();
    var result = Object.keys(value1).map(function (key) {
                  return Number(key), value1[key];
                  })
    var found = [];
    for (var i = 0; i < result.length; i++) {
      if (emailid == result[i].emailid) {
        found.push(result[i]);
      }
    }
   //console.log(found);
    if (found.length==0) {
      console.log('reg new user')
      saveMessage(name, emailid, password, cpassword,verifired)

      const auth=firebase.auth()

      const promise = auth.createUserWithEmailAndPassword(emailid,password);
      promise.catch(e=>console.log(e.message));
      promise.then(e=>(
        
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          alert("verification send")
        }).catch(function(error) {
          alert("Error "+error.message);
        })
        .then(function(){
          
          console.log("send mail succesfuly")
        })
        ));

      /*Email.send({
        Host: "smtp.elasticemail.com",
        Port: "2525",
        Username : "patriciaaruldas@gmail.com",
        Password : "5DA73E3566A6E2122FEBFB37C0BBDD76E4FD",
        To : emailid,
        From : "patriciaaruldas@gmail.com",
        Subject : "This is the subject",
        Body :"https://vedantika-ghadage.github.io/testWebsite/login_reg_page.html#login_page" + "/?" + emailid
    }).then(
        message => alert(message))*/
    } 
    else {
      alert("emailid is already exist")
      console.log(found)
    }
  }, function (err) {
      console.log(err);
    }); 
}


function getInputValue(id){
    return document.getElementById(id).value;
}


function  saveMessage(name,emailid,password,cpassword,verifired){
  
  var strcnt=password.length;
  if(strcnt>=8){
    if(password==cpassword){
      var newMessageRef=messagesRef.push()
      newMessageRef.set({
        name:name,
        emailid:emailid,
        password:password,
        cpassword:cpassword,
        verifired:verifired
      }).then(function(){
      //loader start  
        $("#form_loader").delay(1000).fadeOut("slow");
        $("#form_loader").addClass('test1');
        $("#form_loader").removeClass('test');
      //loader end
      // var db = firebase.database();
      // db.ref("messages").once("value", function (snap) {
      //   var value1 = snap.val();
      //   var result = Object.keys(value1).map(function (key) {
      //                 return Number(key), value1[key];
      //                 })
                    
      //   console.log(result[4])
        data=sessionStorage.getItem("emailid")
        if(data==null){
          // for(var i=0;i<result.length;i++){
          //   if(result[i].emailid==emailid){
          //     if(result[i].verifired==true){
            $("#reg_form").hide();
            $("#login_page").show();
        //   }
        //   }
        // }
        }
        else{
          window.open("DASHBOARD.html")
        }  
      })
    // })
    }
    else{
      alert("Password does not match")
    }
  }
  else{
    alert("Password require minimum 8 characters")
  }
}


 
function LoginForm(e){
  
  e.preventDefault();
  
  var txtEmail=getInputValue('txtEmail');
  var txtPassword=getInputValue('txtPassword');
  
  //console.log(txtEmail)
  //console.log(txtPassword)
  var db = firebase.database();
  db.ref("messages").on("value", function(snap) {
    var value1=snap.val();
    //console.log(snap);
    var result=Object.keys(value1).map(function(key){
      return Number(key),value1[key];
    })

    var icnt1=0;
    var icnt2=0;
    var icnt3=0;
    for(var i=0;i<result.length;i++)
    {
      if(txtEmail==result[i].emailid){
        icnt1=1;
        if(txtPassword==result[i].password){
          icnt2=1;
          const auth=firebase.auth()
            
       
          const promise = auth.signInWithEmailAndPassword(txtEmail,txtPassword);
          promise.catch(e=>alert(e.message));
          promise.then(function(){
              if(firebase.auth().currentUser.emailVerification==true){
              window.location("DASHBOARD.html");
              break;
            }
          })
          sessionStorage.setItem("emailid",txtEmail);
          // sessionStorage.setItem("emailid",txtEmail);
          // window.open("DASHBOARD.html")
          // break;
        }
        }
      }
      //console.log(result[i]);
    

    if(icnt1==0)
    {
      alert("wrong email id");
    }
    else if(icnt2==0)
    {
      alert("wrong password");
    }
    else if(icnt3==0){
      alert("user is not verified")
    }
  }, function(err) {
      console.log(err);

  });
}


// data=sessionStorage.getItem("emailid")
// $(document).ready(function(){
//   $("#already_reg").click(function(){
//     if(data==null){ 
//       $("#reg_form").hide();
//       $("#login_page").show(); 
//     }
//     else{
//       window.open("DASHBOARD.html")
//     }
//   });
// });


// $(document).ready(function(){
//   $("#register").click(function(){
//     $("#reg_form").show();
//     $("#login_page").hide(); 
//   });
//   });


