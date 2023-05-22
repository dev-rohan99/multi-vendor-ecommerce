import bcript from "bcryptjs";


export const isEmail = (email) => {
    const testWith = /^[a-z0-9-_\.]{1,}@[a-z0-9]{1,}\.[a-z\.]{2,}$/;
    return testWith.test(email);
}

export const isPhone = (phone) => {
    const testWith = /^(01|\+8801|8801)[0-9]{9}$/;
    return testWith.test(phone);
}

