    (function () {
        'use strict'
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
        const baseurl = 'https://anisoft.us/gapshup/';
         const baseurl1 = 'https://svc.gapshup.com/';
        const id = urlParams.get('id');
        var onload = (function() {
            var executed = false;
            return function() {
                if (!executed) {
                    executed = true;
                    fetch(baseurl + id, { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', } })
                    .then(response => { return response.json() })
                    .then((data) => {
                        const previewurl = JSON.parse(data.url).length > 0 ? JSON.parse(data.url)[0].previewurl : "No Preview available.";
                        document.getElementById("img").src = previewurl;
                    
                        document.getElementById("name").innerHTML = data.name
                        document.getElementById("desc").innerHTML = data.description
                    });
                }
            };
        })();
        onload();
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {  
                    event.preventDefault();
                    if (!form.checkValidity()) {
                        event.stopPropagation();
                        
                    }
                    form.classList.add('was-validated');
                    (async () => {
                        const rawResponse = await fetch(baseurl + 'api/group/joingroup', {
                            method: 'POST',
                             mode: 'cors',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ "linkId": id, "userId": document.getElementById('validationCustomEmail').value })
                        });
                        const content = await rawResponse.json();
                        if (content === true) {
                            document.getElementById("submitForm").style.display = "none";
                            document.getElementById("alert").style.display = "block";
                        }
                        console.log(content);
                    })();
                }, false);
            });
        var email = document.getElementById('validationCustomEmail');
        email.oninput = () => {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email.value)) {
                email.setCustomValidity("Invalid field.");
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
                email.setCustomValidity("");
            }
        }
    })();
