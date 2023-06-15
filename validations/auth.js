import {body} from 'express-validator';

export const registerValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Неверный пароль").isLength({min: 5}),
    body("fullName", "Неверное имя").isLength({min: 3}),
    body("avatarUrl", "Неверная ссылка").optional().isURL(),
]

export const loginValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Неверный пароль").isLength({min: 5}),
]