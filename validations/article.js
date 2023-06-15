import {body} from 'express-validator';

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат статьи (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

export const postUpdateValidation = [
    body('title', 'Введите заголовок статьи').optional().isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').optional().isLength({min: 10}).isString(),
    body('tags', 'Неверный формат статьи (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]