// fetch available keys and put into selects as options

async function getAvailableKeys() {
    const availableKeys = await (await fetch("https://raw.githubusercontent.com/cardtunic/macrowizard/master/assets/repos/keys.json")).json(); // return object of keys.json
    return availableKeys;
}