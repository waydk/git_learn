console.log("Hello, World!");


function generatePassword({
    length = 16,
    numbers = true,
    symbols = true
} = {}) {

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}";

    let chars = lowercase + uppercase;

    if (numbers) chars += digits;
    if (symbols) chars += special;

    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
}

console.log(generatePassword({
    length: 20,
    numbers: true,
    symbols: true
}));


