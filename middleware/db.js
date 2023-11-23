import { Sequelize } from "sequelize";
import  config  from '../config.json' assert { type: 'json' };

let sequelizeInstance;

// Синхронизация базы данных
export function getSequelizeInstance() {
    if (!sequelizeInstance) {
        sequelizeInstance = new Sequelize({
            dialect: config.dialect || 'mysql', // 'mysql' | 'mariadb' | 'postgres' | 'mssql' выбор диалекта
            host: config.host || '127.0.0.1', // ip адрес сервера
            port: config.port || 3306, // порт сервера
            database: config.database || 'user', // имя базы данных
            username: config.username || 'root', // имя пользователя
            password: config.password || '', // пароль
            logging: config.logging || false, // логирование
        });


        sequelizeInstance.sync({
            force: true,
        }).catch((error) => {
            console.error("Error syncing database:", error);
        });
    }

    return sequelizeInstance;
}

