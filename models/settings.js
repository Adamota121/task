import { DataTypes } from "sequelize";
import { getSequelizeInstance } from "../middleware/db.js";

const sequelize = getSequelizeInstance();

export const Settings = sequelize.define("Settings", {
    // Жанр настроек
    genre: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false, // Отключаем автоматические метки времени
    createdAt: false, // Отключаем создание временной метки при создании записи
    updatedAt: false, // Отключаем обновление временной метки при обновлении записи
});

sequelize.afterBulkSync(async () => {
    const data = await Settings.findAll()
    if (data[0] != undefined && data[0].genre != undefined) {

        global.genre = data[0].genre
        return
    }
})