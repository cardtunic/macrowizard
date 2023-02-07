async function importUserSettings(file) {
    const userSettings = await (await fetch(URL.createObjectURL(file))).json()
    const objectKeys = Object.keys(userSettings);

    if (objectKeys.includes("hid") && objectKeys.includes("macros")) {
        localStorage.setItem("hid", userSettings.hid)
        localStorage.setItem("macros", JSON.stringify(userSettings.macros))
    
    } else {
        alert("❌ Invalid settings")
    }
}