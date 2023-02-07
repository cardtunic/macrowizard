const createMacroBtn = document.querySelector("#create-new-macro");
const selects = document.querySelectorAll("#macro-form-wrapper form fieldset div select");

getAvailableKeys()
    .then(keys => {
        selects.forEach((select) => { // loop for each select element
            Object.keys(keys).forEach((key) => { // loop for each key of avaiable keys
                select.insertAdjacentHTML( // add an option relative to the key
                    "beforeend",
                    `<option value="${key}">${keys[key]
                        .toUpperCase()
                        .replaceAll("{", "")
                        .replaceAll("}", "")}</option>`
                );
            });
        });
    })

createMacroBtn.addEventListener("click", () => {
    createMacro(); // execute createMacro when button create new macro is clicked
});

// get every data provided by user in macro form and create a new macro objetct

async function createMacro() {
    const macro = {
        key_to_remap: {
            userKey: "",
        },
        new_keys: {
            modifierKeys: [],
            userKey: "",
        },
    };

    selects.forEach((select) => { // loop for each select element
        const selectFieldset = select // get fieldset attribute
            .getAttribute("data-fieldset")
            .replaceAll("-", "_");

        const selectedOption = select.options[select.selectedIndex]; // get the current selected option (user key)

        if (selectedOption.value === "") { // fires when user don't select any key
            alert("Selecione uma tecla");
            return;
        }

        macro[selectFieldset].userKey = selectedOption.value; // set userKey to selected option
    });

    const inputs = document.querySelectorAll("#macro-form-wrapper form fieldset div input"); // return all input elements

    inputs.forEach((input) => { // loop for each input element
        const inputFieldset = input // get fieldset attribute
            .getAttribute("data-fieldset")
            .replaceAll("-", "_");

        const inputKey = input.getAttribute("data-key") // get the modifier key that this input is relative to

        if (input.type === "checkbox" && input.checked === true) { // fires when input is checked
            macro[inputFieldset].modifierKeys.push(inputKey) // push checked modifier keys to array
        }
    });

    addMacro(macro); // add new macro to user macros
    
    const macros = getMacros(); // return user macros
    listMacros(macros); // list user macros with updates
}
