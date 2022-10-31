let soLanNhan = 0;
let toanTuTam = "";
let ketQuaTam = undefined;

function nhanSo(so) {
    let current = document.getElementById("man-hinh").value;

    document.getElementById("man-hinh").value = current + so;
}

function nhanXoa() {
    soLanNhan = 0;
    toanTuTam = "";
    ketQuaTam = undefined;
    _xoaManHinh();
}

function nhanToanTu(toanTu) {
    let soTrenManHinh = parseInt(document.getElementById("man-hinh").value);

    console.log("soLanNhan", soLanNhan);
    if (soLanNhan == 0 || toanTuTam == "") {
        ketQuaTam = soTrenManHinh;
    } else {
        ketQuaTam = _tinhToan(ketQuaTam, soTrenManHinh, toanTu);
    }
    _xoaManHinh();
    document.getElementById("man-hinh").value = toanTu;
    soLanNhan += 1;
    toanTuTam = toanTu;
}

function nhanKetQua() {
    let manHinh = document.getElementById("man-hinh");

    if (ketQuaTam == undefined) {
        manHinh.value = "SYNTAX ERROR !";
        manHinh.style.color = "#4e4c49";
        manHinh.style.fontSize = "1.2em";
    } else {
        let soTrenManHinh = parseInt(manHinh.value);

        ketQuaTam = _tinhToan(ketQuaTam, soTrenManHinh, toanTuTam);
        toanTuTam = "";
        manHinh.value = ketQuaTam;
    }
}

function _tinhToan(soHang1, soHang2, toanTu) {
    let result = 0;

    switch (toanTu) {
        case "+":
            result = soHang1 + soHang2;
            break;
        case "-":
            result = soHang1 - soHang2;
            break;
        case "*":
            result = soHang1 * soHang2;
            break;
        case "/":
            result = soHang1 / soHang2;
            break;
    }

    return result;
}

function _xoaManHinh() {
    document.getElementById("man-hinh").value = "";
}

