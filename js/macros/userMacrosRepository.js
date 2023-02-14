if (localStorage.getItem("macros") === null) {
    localStorage.setItem("macros", "[]")
}

function getMacros(macroId) {
    const macros = localStorage.getItem("macros")

    if (macroId !== undefined) {
        const macro = macros.splice(macroId, 1)

        return JSON.parse(macro);
    }

    return JSON.parse(macros);
}

function addMacro(macro) {
    const macros = getMacros();

    macros.push(macro)

    localStorage.setItem("macros", JSON.stringify(macros))
}

function removeMacro(macroId) {
    const macros = getMacros();

    macros.splice(macroId, 1)

    localStorage.setItem("macros", JSON.stringify(macros))
}