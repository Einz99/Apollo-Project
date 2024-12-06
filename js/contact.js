function emailSend() {

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var texts = document.getElementById('texts').value;

    console.log(name + "\n" + email + "\n" + texts)

    var message = "Name: " + name + "<br>Email: " + email + "<br>Message: <br>" + texts;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "apolloentertainment@gmail.com",
        Password : "BE5B7856AD1EDCAFCBD2C637928067B1E9E5",
        To : 'apolloentertainment24@gmail.com',
        From : "apolloentertainment24@gmail.com",
        Subject : "Contacting",
        Body : message
    }).then(
        message =>{
            if(message == 'OK'){
                swal("Message Successfully Send", "We will try to response immediately", "success");
            }
        }
    );
}
