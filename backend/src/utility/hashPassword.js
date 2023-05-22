import bcript from "bcryptjs";

const hashPassword = (password) => {
    const salt = bcript.genSaltSync(10);
    const genHashPassword = bcript.hashSync(password, salt)
    return genHashPassword;
}

export default hashPassword;
