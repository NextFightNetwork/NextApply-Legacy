function createID(length, onlyUpperCase) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if(onlyUpperCase) {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

module.exports = {
    createID
};