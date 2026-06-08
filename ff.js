function generatePassword({
    length = 16,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true
} = {}) {

    const charSets = {
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    const enabledSets = [];

    if (lowercase) enabledSets.push(charSets.lowercase);
    if (uppercase) enabledSets.push(charSets.uppercase);
    if (numbers) enabledSets.push(charSets.numbers);
    if (symbols) enabledSets.push(charSets.symbols);

    if (enabledSets.length === 0) {
        throw new Error("Выберите хотя бы один тип символов");
    }

    if (length < enabledSets.length) {
        throw new Error(
            `Минимальная длина должна быть ${enabledSets.length}`
        );
    }

    const getRandomInt = (max) => {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % max;
    };

    let password = [];

    // Гарантируем хотя бы один символ каждого типа
    for (const set of enabledSets) {
        password.push(set[getRandomInt(set.length)]);
    }

    const allChars = enabledSets.join("");

    while (password.length < length) {
        password.push(allChars[getRandomInt(allChars.length)]);
    }

    // Перемешиваем
    for (let i = password.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
}

console.log(
    generatePassword({
        length: 24,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    })
);