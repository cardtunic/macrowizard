async function saveLuaFile(macros, keyboardHid) {
    const avaiableKeys = await getAvailableKeys();
    let macrosLua = [];

    macros.forEach((macro, index) => {
        const triggerKey = macro.key_to_remap.userKey;
        const modifierKeys = macro.new_keys.modifierKeys
            .join("")
            .replace("Ctrl", "^")
            .replace("Alt", "%")
            .replace("Shift", "+");

        const key = avaiableKeys[macro.new_keys.userKey];

        if (index === 0) {
            macrosLua.push(`
                if (button == ${triggerKey}) then
                    lmc_send_keys('${modifierKeys}${key}', 50)
                    print('Keys pressed: ${modifierKeys}${key}')
            `);
        }

        if (index > 0) {
            macrosLua.push(`
                elseif (button == ${triggerKey}) then
                    lmc_send_keys('${modifierKeys}${key}', 50)
                    print('Keys pressed: ${modifierKeys}${key}')
            `);
        }

        if (macros.length - 1 === index) {
            macrosLua.push("end");
            return;
        }
    });

    const luaFile = `
    data:text/plain;charset=utf-8,${encodeURIComponent(`
        clear()

        local keyboardIdentifier = '${keyboardHid}'
        lmc_device_set_name('macros', keyboardIdentifier)
        
        lmc.minimizeToTray = true
        lmc_minimize()
            
        lmc_set_handler('macros', function(button,direction)	
            if (direction == 1) then return end
            
            ${macrosLua.join("")}
        end)
        `)}
    `;

    const download = document.createElement("a");
    download.style.display = "none";
    download.href = luaFile;
    download.download = "macros.lua";

    document.body.appendChild(download);
    download.click();
    download.remove();
}
