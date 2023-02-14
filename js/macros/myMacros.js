const macrosList = document.querySelector("#macros-list");
const macros = getMacros(); // return user macros;

listMacros(macros); // list user macros when page loads

// list user macros in html

async function listMacros(macros) {
    if (macros.length === 0) {
        // fires when user don't have macros

        macrosList.innerHTML = "<p>You don't have macros.</p>";
        return;
    }

    const avaiableKeys = await getAvailableKeys(); // return available keys

    macrosList.innerHTML = ""; // clean macros list children

    macros.forEach((macro, index) => {
        // loop for each user macro
        let macroKeys = [];

        const keyToRemap = avaiableKeys[macro.key_to_remap.userKey]
            .toUpperCase()
            .replaceAll("{", "")
            .replaceAll("}", "");

        const newKey = avaiableKeys[macro.new_keys.userKey]
            .toUpperCase()
            .replaceAll("{", "")
            .replaceAll("}", "");

        const modifierKeys = macro.new_keys.modifierKeys.join(" + "); // return a string of modifier keys

        macrosList.insertAdjacentHTML(
            // insert macro elements to macro list
            "beforeend",
            `
            <div class="macro">
                <div class="macro-keys">
                    <img
                        src="./assets/icons/concetor.svg"
                        alt="Icon of a line, look like a conector."
                    />
                
                    <div>
                        <p><span>${keyToRemap}</span></p>
                        <p>${modifierKeys} <span>+ ${newKey}</span></p>
                    </div>
                </div>

                <span
                    class="material-symbols-outlined"
                    onclick="removeMacroHandler(${index})"
                >
                delete
                </span>
            </div>
            `
        );
    });
}

function removeMacroHandler(macroId) {
    removeMacro(macroId);

    const macros = getMacros();

    console.log(macros);

    listMacros(macros);
}

const saveBtn = document.querySelector("#save-btn")

saveBtn.addEventListener("click", () => {
    const macros = getMacros();
    const keyboardHid = localStorage.getItem("hid");

    saveLuaFile(macros, keyboardHid);
})