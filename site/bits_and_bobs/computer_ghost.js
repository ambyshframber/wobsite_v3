function ghost() {
    let input = document.getElementById("ghost_input").value;
    hash(input).then((h) => {
        let byte = h[0]
        let val = Math.sin(Math.cos(byte * 12965))
        let answer = val > 0
        document.getElementById("ghost_reply").innerHTML = answer
    })
}

function hash(string) {
    let utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        return Array.from(new Uint8Array(hashBuffer));
    });
}
