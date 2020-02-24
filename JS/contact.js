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


  var messagesRef=firebase.database().ref('Comments');



document.getElementById('contact_form').addEventListener('submit',registerForm);

function registerForm(e){

    e.preventDefault();
    //console.log("hello")
  
    var name=getInputValue('name');
    var emailid=getInputValue('emailid');
    var comment=getInputValue('comment');
    // var cpassword=getInputValue('cpassword');

    console.log(name);

    saveMessage(name,emailid,comment)
//     if(password==cpassword){
    
//     window.open("Login.html")
// }

}


function getInputValue(id){
    return document.getElementById(id).value;
}

function  saveMessage(name,emailid,comment){



    var newMessageRef=messagesRef.push()
    newMessageRef.set({
        name:name,
        emailid:emailid,
        comment:comment,
    });

    console.log("data saveds")

}

