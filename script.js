async function encrypt(text) {
    const message = await openpgp.createMessage({
        text: text,
        format: "utf8",
    });
    const encrypted = await openpgp.encrypt({
        message: message,
        encryptionKeys: await openpgp.readKey({
            armoredKey: document.getElementById("public_key").value,
        })
    });
    console.log(encrypted);
    document.getElementById("encrypted").value = encrypted;
}

function copy(element) {
    //copy the element's value to clipboard
    element.select();
    element.setSelectionRange(0, 99999);
    try {
        navigator.clipboard.writeText(element.value).then(() => {
            const copy_button = document.getElementById("copy_button");
            //change the text to "copied" with a checkmark unicode
            copy_button.innerHTML = "&#x2713; Copied!";

            setTimeout(() => {
                copy_button.innerHTML = "Copy encrypted message";
            }, 3000);
        }).catch(err => {
            console.error("Could not copy email: ", err);
            alert("Could not copy message: " + err);
        });
    } catch (err) {
        console.error("Could not copy email: ", err);
        alert("Could not copy message: " + err);
    }
}

function makeHttpRequest(url, id) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = processResponse;
    req.open("GET", url);
    req.send();

    function processResponse() {
        if (req.readyState != 4) return;
        document.getElementById(id).value = req.responseText;
    }
}


function insertPublicKey() {
    makeHttpRequest("/pgp_pub.txt", "public_key");
}
