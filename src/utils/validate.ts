export const errorsText: any = {
    login: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
    password: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    email: "латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.",
    first_name: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
    second_name: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
    phone: "от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
    repeatPassword: "Пароли не совпадают"
};



function isNameValid(value: string): boolean {
    return /^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яёЁ-]+$/.test(value);
}

function isLoginValid(value: string): boolean {
    if (value.length < 3 || value.length > 20) return false;

    return /^\d*[a-zA-Z_-][\w-]*$/.test(value);
}

function isEmail(value: string): boolean {
    return /^[\w-$!%*#?&]+@[a-zA-z]+\.[a-zA-z]+$/.test(value);
}

function isPasswordValid(value: string): boolean {
    if (value.length < 8 || value.length > 40) return false;

    return /^(?=.*[A-Z])(?=.*\d).*$/.test(value);
}

function isOldPasswordValid(value: string): boolean {
    return !!value;
}

function isRepeatPasswordValid(value: string, passwordValue: string): boolean {
    if (!passwordValue) return !!value;
    return value === passwordValue;
}

function isPhoneValid(value: string): boolean {
    if (value.length < 10 || value.length > 15) return false;

    return /^[+]?\d+$/.test(value);
}

function isMessageValid(value: string): boolean {
    return !!value;
}

export default function isValid(fieldName: string, value: string, originPassword = '') {
    switch (fieldName) {
        case 'email':
            return isEmail(value);
        case 'oldPassword':
            return isOldPasswordValid(value);
        case 'password':
        case 'newPassword':
            return isPasswordValid(value);
        case 'first_name':
        case 'second_name':
            return isNameValid(value);
        case 'login':
            return isLoginValid(value);
        case 'repeatPassword':
            return isRepeatPasswordValid(value, originPassword);
        case 'phone':
            return isPhoneValid(value);
        case 'message':
            return isMessageValid(value);
        default:
            return true;
    }
}