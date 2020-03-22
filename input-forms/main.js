
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

// Listen for form submit
document.getElementById('shopperForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveShopper(name, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('shopperForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save shopper to firebase
function saveShopper(name, email, phone, message){
  var newShopperRef = shoppersRef.push();
  newShopperRef.set({
    name: name,
    email:email,
    phone:phone,
    message:message
  });
}