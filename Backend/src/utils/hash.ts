import crypto from 'crypto'

// Function for hashing password to unknown cipher
export const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex")

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

    return { hash, salt };
}

// Function to verify is this password the correct one
export const verifyPassword = ({candidatePassword, salt, hash}:{candidatePassword: string, salt: string, hash:string} ) => {
    const candidateHash = crypto.pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512").toString("hex")

    return candidateHash === hash
}