function validate(){
    // Get form inputs
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let messageInput = document.getElementById("message");
  
    // Get error messages
    let Error = document.getElementById("error");

    let Name = nameInput.value;
    let email = emailInput.value;
    let message = messageInput.value;


    nameInput.addEventListener('input', () =>{
        Error.style.opacity = '0';
    })
    emailInput.addEventListener('input', () =>{
        Error.style.opacity = '0';
    })
    messageInput.addEventListener('input', () =>{
        Error.style.opacity = '0';
    })
   


    // Validate Name
    if (Name.trim() === "") {
        Error.innerHTML = "Fill in name, email address and message";
        Error.style.opacity = '1';
        Error.style.fontSize = '15px';
        Error.style.color = 'red';
        return false;
    } 

    // Validate Email
    else if (email.trim() === "") {
        Error.style.opacity = '1';
        Error.style.color = 'red';
        Error.style.fontSize = '15px';
        Error.innerHTML = "Fill in name, email address and message";
        return false;
    }

    // Validate Message
    else if (message.trim() === "") {
        Error.style.opacity = '1';
        Error.style.color = 'red';
        Error.style.fontSize = '15px';
        Error.innerHTML = "Fill in name, email address and message";
        return false;
    }
    // If all inputs are valid, submit the form
    else {
        return true
      }
}


function swipe(){
    document.querySelector(".details").style.transform = 'translateX(-1500px)';
    document.querySelector(".donate-form").classList.add("swipe");
    document.querySelector(".details").style.transition = '0.45s';
    document.querySelector(".instruction").innerHTML = "KINDLY FILL OUT THE FORM BELOW";
    document.querySelector(".title").innerHTML = "Confirm Donation";
}
function goBack(){
    document.querySelector(".details").style.transform = 'translateX(10px)';
    document.querySelector(".instruction").innerHTML = "MAKE PAYMENTS USING THE DETAILS BELOW";
    document.querySelector(".title").innerHTML = "Make A Donation";
    document.querySelector(".details").style.transition = '0.45s';
    document.querySelector(".donate-form").classList.remove("swipe");
}

function validateForm() {
    let fields = ["name", "email", "amount", "bank", "account-name", "date"];
    for (let field of fields) {
        let value = document.getElementById(field).value.trim();
        if (value === "") {
            document.getElementById("error-message").innerHTML = "*Make sure you fill out all the fields";
            document.getElementById("error-message").style.color = "red"; 
            return false;
        }
    }
    return true;
}