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

document.getElementById('loginform').addEventListener('submit',registerForm);


function getInputValue(id){
  return document.getElementById(id).value;
}


function registerForm(e){

  e.preventDefault();
  var txtEmail=getInputValue('txtEmail');
  var txtPassword=getInputValue('txtPassword');
  console.log(txtEmail)
  console.log(txtPassword)
  var db = firebase.database();
  db.ref("messages").on("value", function(snap) {
  var value1=snap.val();
  //console.log(snap);
  var result=Object.keys(value1).map(function(key){
    return Number(key),value1[key];
  })

  var icnt1=0;
  var icnt2=0;
  for(var i=0;i<result.length;i++)
  {
    if(txtEmail==result[i].emailid){
      icnt1=1;
      if(txtPassword==result[i].password){
        icnt2=1;
      //console.log("yess");
      sessionStorage.setItem("emailid",txtEmail);
      window.open("DASHBOARD.html")
      break;
    }
    }
    console.log(result[i]);
  }

  if(icnt1==0)
  {
    alert("wrong email id");
  }
  else if(icnt2==0)
  {
    alert("wrong password");
  }

 
  
  //console.log(value1);
  // success method is not called
}, function(err) {
    console.log(err);
  // error callback triggered with PERMISSION_DENIED
});

}






/*var admin = require("firebase-admin");

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("messages");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



(function(){

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

  
  const txtEmail=document.getElementById("txtEmail");
  const txtPassword=document.getElementById("txtPassword");
  const btnLogin=document.getElementById("btnLogin");
  const btnSignUp=document.getElementById("btnSignUp");
  const btnLogOut=document.getElementById("btnLogOut");

  btnLogin.addEventListener('click',e=>{
   // firebase.initializeApp(firebaseConfig);
   // firebase.analytics();
  
      var email=txtEmail.value;
      var pass=txtPassword.value;
     //console.log(firebase);
      var auth=firebase.auth();

       var promise=auth.signInWithEmailAndPassword(email,password);
      //var promise = auth.signInWithCredential(email,password);

      promise.catch(e=>console.log(e.message)); 
  })

}());*/