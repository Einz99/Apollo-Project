const back = document.querySelector('.backbtn')


back.addEventListener('click', () => {
    history.back()
})

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});



async function emailSend() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bday = document.getElementById('bday').value;
    const address = document.getElementById('address').value;
    const postal = document.getElementById('postal').value;
    const file = document.querySelector('#fileInput').files[0];
    const base64 = await toBase64(file);
    const gender = document.querySelector(`[name="gender"]:checked`).value



    var message = "Name: " + name +
              "<br>Email: " + email +
              "<br>Phone: " + phone +
              "<br>Birthday: " + bday +
              "<br>Address: " + address +
              "<br>Postal: " + postal +
              "<br>gender: " + gender

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "apolloentertainment@gmail.com",
        Password : "BE5B7856AD1EDCAFCBD2C637928067B1E9E5",
        To : 'apolloentertainment24@gmail.com',
        From : "apolloentertainment24@gmail.com",
        Subject : "Applying",
        Body : message,
	Attachments : [
	{
		name : "CV.pdf",
		data : base64
	}]
    }).then(
        message =>{
            if(message == 'OK'){
                swal("Application Successfully Send", "We will try to response immediately", "success");
            }
            else {
                alert(message)
            }
        }
    );
}

