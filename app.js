const firebaseConfig = {
  apiKey: "AIzaSyAn-s9FPSHV94e2tkyKwJZI_Z6Tm8TZphI",
  authDomain: "cardmaker-7615d.firebaseapp.com",
  projectId: "cardmaker-7615d",
  storageBucket: "cardmaker-7615d.appspot.com",
  messagingSenderId: "445118538397",
  appId: "1:445118538397:web:2d07202d644d0bbb76aa74",
  measurementId: "G-E1VNVFWN6G"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function signUp() {
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Account created successfully with ID: ", user.uid);
      alert("Account created successfully!");
      window.location.href="index.html";

      database.ref('users/' + user.uid).set({
        email : email,
        password : password,
        userId : user.uid,
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error creating account: ", errorMessage);
      alert(errorMessage);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Logged in successfully with ID: ", user.uid);
      alert("Logged in successfully!");
      window.location.href="index.html";
      database.ref('users/' + user.uid).set({
        email : email,
        password : password,
        userId : user.uid,
      })
      

    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging in: ", errorMessage);
      alert(errorMessage);
    });
    
}

function resetpassword()
{
  var forgetemail=document.getElementById("user_email").value
  firebase.auth().sendPasswordResetEmail(forgetemail)
  .then(() => {

      alert("Reset Send To Your Email")
  })
  .catch((error) => {
      alert("Error")
  });
}

function logout() {
  auth.signOut()
    .then(() => {
      console.log("Logged out successfully!");
      alert("Logged out successfully!");

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging out: ", errorMessage);
      alert(errorMessage);
    });
}

var messagesRef = firebase.database().ref('contactMessages');

  // Function to save message to Firebase
  function saveMessage(name, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email: email,
      phone: phone,
      message: message
    })
    .then(function() {
      console.log('Message sent successfully!');
      // Optionally, you can display a success message to the user
      alert('Message sent successfully!');
    })
    .catch(function(error) {
      console.error('Error sending message:', error);
      // Optionally, you can display an error message to the user
      alert('Error sending message:', error);
    });
  }

  // Function to handle form submission
  function submitForm(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;

    // Save message to Firebase
    saveMessage(name, email, phone, message);

    // Reset form fields
    document.getElementById('contact-form').reset();
  }

  // Add event listener to the form
  document.getElementById('contact-form').addEventListener('submit', submitForm);
