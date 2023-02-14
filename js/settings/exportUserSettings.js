function exportUserSettings() {
    const userConfigs = {
        hid: localStorage.getItem("hid"),
        macros: JSON.parse(localStorage.getItem("macros"))
    }

    const userConfigsJsonFile = `
        data:text/json;charset=utf-8,
        ${encodeURIComponent(JSON.stringify(userConfigs, null, 4))}
    `

    const download = document.createElement("a");
    download.style.display = "none";
    download.href = userConfigsJsonFile;
    download.download = "settings.json";

    document.body.appendChild(download);
    download.click();
    download.remove();
}