const algorithm = document.getElementById("algorithm");
const input = document.getElementById("input");
const keyField = document.getElementById("key");
const output = document.getElementById("output");

document.getElementById("encryptBtn").addEventListener("click", encrypt);
document.getElementById("decryptBtn").addEventListener("click", decrypt);
document.getElementById("copyBtn").addEventListener("click", copyOutput);

algorithm.addEventListener("change", function(){
    keyField.disabled = this.value !== "aes";
});

function encrypt(){
    let algo = algorithm.value;
    let text = input.value;
    let key = keyField.value;
    let result = "";

    try{
        switch(algo){
            case "aes":
                if(!key){
                    result="Please enter a key.";
                    break;
                }
                result = CryptoJS.AES.encrypt(text, key).toString();
                break;

            case "sha256":
                result = CryptoJS.SHA256(text).toString();
                break;

            case "sha512":
                result = CryptoJS.SHA512(text).toString();
                break;

            case "base64":
                result = btoa(text);
                break;

            case "rot13":
                result = text.replace(/[a-zA-Z]/g,c=>
                    String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)
                );
                break;
        }

        output.innerText = result;

    }catch{
        output.innerText = "Error processing input.";
    }
}

function decrypt(){
    let algo = algorithm.value;
    let text = input.value;
    let key = keyField.value;
    let result = "";

    try{
        switch(algo){
            case "aes":
                result = CryptoJS.AES.decrypt(text,key).toString(CryptoJS.enc.Utf8);
                break;

            case "base64":
                result = atob(text);
                break;

            case "rot13":
                result = text.replace(/[a-zA-Z]/g,c=>
                    String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)
                );
                break;

            default:
                result = "Hash functions cannot be decrypted.";
        }

        output.innerText = result || "Invalid key/input.";

    }catch{
        output.innerText = "Decryption failed.";
    }
}

function copyOutput(){
    navigator.clipboard.writeText(output.innerText);
}
