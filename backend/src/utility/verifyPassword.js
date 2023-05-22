import bcript from "bcryptjs";


const verifyPassword = (password, hashPassword) => {
    const verify = bcript.compare(password, hashPassword);
    return verify;
}

export default verifyPassword;
