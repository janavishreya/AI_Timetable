const bcrypt = require("bcryptjs");

async function hashPassword() {
    const hashedPassword = await bcrypt.hash("user123", 10);
    console.log("New Hashed Password:", hashedPassword);
}

hashPassword();
