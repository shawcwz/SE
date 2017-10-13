function addLead() {

    var clientName = document.getElementById('name').value;
    var clientMobile = document.getElementById('mobile').value;
    var clientEmail = document.getElementById('email').value;
    var clientNote = document.getElementById('note').value;


    var newClientKey = database.ref().child('Users').push().key;
    database.ref('Users/' + newClientKey + '/name').set(clientName);
    database.ref('Users/' + newClientKey + '/mobile').set(clientMobile);
    database.ref('Users/' + newClientKey + '/email').set(clientEmail);
    database.ref('Users/' + newClientKey + '/note').set(clientNote);
}
//document.getElementById('name').value; for clientName
function retrieveLead() {
    var clientName = "Shawty";
    var leadsRef = database.ref('Users');
    leadsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.val().name == clientName) {
                var childData = childSnapshot.val();
                var clientPic = childData.profilepic;
                document.getElementById("output1").innerHTML = 'Name: ' + childData.name;
                document.getElementById("output2").innerHTML = 'Mobile: ' + childData.mobile;
                document.getElementById("output3").innerHTML = 'Email: ' + childData.email;
                document.getElementById("output4").innerHTML = 'Description: ' + childData.note;
                var storageRef = firebase.storage().ref();
                var spaceRef = storageRef.child(clientPic);
                storageRef.child(clientPic).getDownloadURL().then(function (url) {
                    var test = url;
                    document.querySelector("#output").src = test;
                }).catch(function (error) {
                });
            }
        });
    });
}

function updateLead() {
    var clientName = document.getElementById('name').value;
    var clientEmail = document.getElementById('email').value;
    var clientNote = document.getElementById('msg').value;
    if (clientName != "" || clientEmail != "" || clientNote != "") {
        database.ref().child('Users/' + '-KvSUbgsQ9B2JdLfh-dV').update({name: clientName});
        database.ref().child('Users/' + '-KvSUbgsQ9B2JdLfh-dV').update({email: clientEmail});
        database.ref().child('Users/' + '-KvSUbgsQ9B2JdLfh-dV').update({note: clientNote});
    }
}

//For popup form!!
// Validating Empty Field
function check_empty() {
    if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
        alert("Fill All Fields !");
    } else {
        document.getElementById('form').submit();
        alert("Form Submitted Successfully...");
    }
}
//Function To Display Popup
function div_show() {
    document.getElementById('at-login').style.display = "block";
}
//Function to Hide Popup
function div_hide() {
    document.getElementById('at-login').style.display = "none";
}

//Function to upload image file & display & capture filename
var loadFile = function(event) {
    var data = document.getElementById('filetype');
    var path = data.value;
    var filename = "Images/" + path.replace(/^.*\\/, "");
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};
