import { DataTypes } from "sequelize";
import { getSequelizeInstance } from "../middleware/db.js";

const sequelize = getSequelizeInstance();

export const Books = sequelize.define("Books", {
    // Уникальный идентификатор книги
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Название книги
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Автор книги
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Описание книги
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Жанр книги
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Опции модели Books
    timestamps: true, // Включение временных меток (createdAt, updatedAt)
    createdAt: true, // Включение временной метки создания (createdAt)
    updatedAt: true, // Включение временной метки обновления (updatedAt)
});