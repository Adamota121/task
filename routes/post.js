import express from 'express';
import { Books } from '../models/books.js';
import { Tools } from '../utils/index.js';

const router = express.Router();

// Маршрут для загрузки книги
router.post('/upload', async (req, res) => {
    const data = req.body;
    console.log(data)
    if(data == undefined) return
    const missingField = Tools.checkRequiredFields(['name', 'author', 'description', 'genre'], data);

    if (missingField) {
        return res.status(400).json({ error: `${missingField} обязательно` });
    }

    const isDataIncorrect = Tools.checkDataOnCorrect(data);

    if(isDataIncorrect) {
        return res.status(400).json({ error: `поле ${isDataIncorrect} содержит некорректные данные` });
    }

    try {
        await Books.create(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({message: 'Книга успешно загружена!' })
})

// Маршрут для удаления книги
router.post('/delete', async (req, res) => {
    const data = req.body;

    const missingField = Tools.checkRequiredFields(['id'], data);

    if (missingField) {
        return res.status(400).json({ error: `${missingField} обязательно` });
    }

    const isDataIncorrect = Tools.checkDataOnCorrect(data);

    if(isDataIncorrect) {
        return res.status(400).json({ error: `поле ${isDataIncorrect} содержит некорректные данные` });
    }

    try {
        await Books.destroy({where: { id: data.id }});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({message: 'Книга успешно удалена!' })
})

export default router