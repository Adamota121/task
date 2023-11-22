import express from 'express';
import { Op } from 'sequelize';
import { Books} from '../models/books.js';
import { Settings } from '../models/settings.js';

const router = express.Router();

// Маршрут для получения всех книг
router.get('/getBooks', async (req, res) => {
    const genre = req.query.genre
    const keyword = req.query.keyword
    const name = req.query.name

    if (genre) {
        // Если указан жанр, получаем книги с указанным жанром
        const books = await Books.findAll({
            where: { genre },
            attributes: ['name', 'author']
        });
        res.json(books);
    } else if (keyword) {
        // Если указано ключевое слово, получаем книги, у которых название или автор содержат это ключевое слово
        const books = await Books.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${keyword}%` } },
                    { author: { [Op.like]: `%${keyword}%` } }
                ]
            },
            attributes: ['name', 'author']
        });
        res.json(books);
    } else if(name){
        // Если указано название книги, получаем книги с таким названием
        const books = await Books.findAll({
            where: { name },
            attributes: ['name', 'author']
        });
        res.json(books);
    }
    else {
        // Если не указан жанр и ключевое слово, получаем все книги
        const books = await Books.findAll({
            attributes: ['name', 'author']
        });
        res.json(books);
    }
})

// Маршрут для получения книги по ID
router.get('/getBooks/:id', async (req, res) => {
    const id = req.params.id;
    const book = await Books.findByPk(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
})

// Маршрут для получения списка жанров
router.get('/getGenres', async (req, res) => {
    const genre = await Settings.findAll({attributes: ['genre']});
    res.json(genre);
})

export default router