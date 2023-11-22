import express from 'express';
import { getSequelizeInstance } from './middleware/db.js';
import { Settings } from './models/settings.js';
import { limitRequestsPerIP } from './middleware/limitRequestsFromIp.js';

import postRouter from './routes/post.js';
import getRouter from './routes/get.js';

const sequelize = getSequelizeInstance();

// Устанавливаем соединение с базой данных
sequelize.afterBulkSync(async () => {

    console.log('[Database] Соединение с базой данных установлено успешно.');

    const app = express();

    app.use((req, res, next) => {
        console.log('Запрос получен:', req.method, req.url);
        next();
      });

    // Используем middleware для ограничения количества запросов от одного IP-адреса
    app.use(limitRequestsPerIP);

    // Разрешаем приложению использовать JSON
    app.use(express.json());

    // Устанавливаем маршруты для обработки POST-запросов
    app.use('/api/', postRouter);

    // Устанавливаем маршруты для обработки GET-запросов
    app.use('/api/', getRouter);

    // Обработчик ошибок
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });

    // Запускаем сервер на порту, указанном в настройках 
    app.listen(5000, () => {
        console.log(`[APIserver] Сервер запущен на порту ${5000}`);
    });
});