
// Webapp's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8sXhNBEyApJLXS2FAemaXYO5aN38JuBM",
  authDomain: "safeway-271821.firebaseapp.com",
  databaseURL: "https://safeway-271821.firebaseio.com",
  projectId: "safeway-271821",
  storageBucket: "safeway-271821.appspot.com",
  messagingSenderId: "1009881777935",
  appId: "1:1009881777935:web:61d38faf9e352dc989e07a",
  measurementId: "G-ZEVFFKFKYG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference shoppers collection
var shoppersRef = firebase.database().ref('shoppers');
var volunteersRef = firebase.database().ref('volunteers');

// Listen for form submit
document.getElementById('shopperForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos){
      var al = document.getElementById('report');
      doAlert(al, "You have been added, wait to recieve an email.", flase);
      // Get values
      var name = getInputVal('name');
      var email = getInputVal('email');
      var phone = getInputVal('phone');
      var message = getInputVal('message');
      var long = pos.coords.longitude;
      var lat = pos.coords.latitude;

      // Save message
      saveShopper(name, email, phone, message, long, lat);

      // Clear form
      document.getElementById('shopperForm').reset();
    }, function(error) {
      var x = document.getElementById('report');
      var msg = "";
      switch(error.code) {
        case error.PERMISSION_DENIED:
          msg = "User denied the request for Geolocation. Try it on a computer instead."
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          msg = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          msg = "An unknown error occurred."
          break;
      }
      doAlert(x, msg, true);
    });
    
  } else { 
    var al = document.getElementById('report');
    doAlert(al, "Location Failed, please try again.", true);
  }
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

//function to do the timed alert with a message
function doAlert(al, msg, f){
  if(!f){
    al.classList.remove('alertF');
    al.classList.add('alert');
    al.innerHTML = msg;
  } else {
    al.classList.add('alertF');
    al.classList.remove('alert');
    al.innerHTML = msg;
  }
  // Show alert
  al.style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    al.style.display = 'none';
  },3000);
}

// Save shopper to firebase
function saveShopper(name, email, phone, message, long, lat){
  if (document.getElementById('radioOne').checked) {
    var newShopperRef = shoppersRef.push();
    newShopperRef.set({
      name: name,
      email:email,
      phone:phone,
      message:message,
      long:long,
      lat:lat

    });
  } else {
    var newVolunteerRef = volunteersRef.push();
    newVolunteerRef.set({
      name: name,
      email:email,
      phone:phone,
      message:message,
      long:long,
      lat:lat

    });
  }
}