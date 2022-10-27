function printNumberOnScreen(id) {
    let number = parseInt(document.getElementById(id).value);
    document.getElementById("screen").value = number;
}