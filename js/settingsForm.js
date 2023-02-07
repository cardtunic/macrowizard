const exportSettingsBtn = document.querySelector("#export");
const importSettingsBtn = document.querySelector("#import");

const saveSettingsBtn = document.querySelector("#save-settings");
const cancelSettingsBtn = document.querySelector("#cancel-settings");

const keyboardHid = document.querySelector("#keyboard-hid-input");

const uploadArea = document.querySelector("#upload-area");
const uploadSettingsInput = document.querySelector("#upload-config-input");

keyboardHid.value = getKeyboardHid();

exportSettingsBtn.addEventListener("click", () => {
    exportUserSettings();
});

importSettingsBtn.addEventListener("click", () => {
    const currentDisplayValueUploadArea = uploadArea.style.display;

    if (
        currentDisplayValueUploadArea === "none" ||
        currentDisplayValueUploadArea === ""
    ) {
        uploadArea.style.display = "flex";
        importSettingsBtn.focus();
    } else {
        uploadArea.style.display = "none";
        importSettingsBtn.blur();
    }
});

saveSettingsBtn.addEventListener("click", async () => {
    const file = uploadSettingsInput.files[0];

    if (file !== undefined) {
        importUserSettings(file);
    }

    localStorage.setItem("hid", keyboardHid.value);
    alert("✅ Saved settings");

    if (location.origin.includes("cardtunic.github.io")) {
        location.pathname = "/macrowizard/dashboard.html"
    
    } else {
        location.pathname = "/dashboard.html"
    }
});

cancelSettingsBtn.addEventListener("click", () => {
    if (location.origin.includes("cardtunic.github.io")) {
        location.pathname = "/macrowizard/dashboard.html"
    
    } else {
        location.pathname = "/dashboard.html"
    }
});
