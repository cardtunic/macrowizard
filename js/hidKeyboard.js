if (location.href.includes("?")) {
    const params = new URLSearchParams(location.search);
    const keyboardHid = params.get("keyboard-hid-input");

    setKeyboardHid(keyboardHid);
}

function setKeyboardHid(hid) {
    localStorage.setItem("hid", `${hid}`)
}

function getKeyboardHid() {
    const hid = localStorage.getItem("hid")
    return hid;
}