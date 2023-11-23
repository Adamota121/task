Для запуска необходима - node js (https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi)
База данных, либо Open Server (Open Panel Server)

Далее необходимо заполнить config.json
{
    {
        "dialect": "mysql", Ваша база данных
        "host": "127.0.0.1", Ip базы
        "port": 3306, Порт для подключения
        "database": "user", Название базы
        "username": "root", Ваш юзернейм
        "password": "", Пароль
        "forceSync": true
        "logging": false, Логирование
        "mainPort": 5000 Порт для запуска локального сервера, по стандарту, 5000
        }
}

При первом запуске нужно оставить forceSync = true, в остальные запуски forceSync = false, это нужно для корректной сборки базы данных.

Для того, чтобы запустить в cmd, нужно перейти в папку через команду cd
Для запуска в терминале или cmd прописываем node . 

Для создания книги, необходимо прописать get запрос по адресу (по стандарту) post http://localhost:5000/api/upload с body {
    name: "Название книги",
    author: "Автор",
    description: "Описание",
    genre: "Жанр"
    }

Для удаления post http://localhost:5000/api/delete с body{
    id: "id книги"
    }


Для получения всех книг пропишите get http://localhost:5000/api/getBooks 


Для получения книг по автору get http://localhost:5000/api/getBooks c params{
    author: "автор"
}


Для получения книг по названию get http://localhostL5000/api/getBooks с params{
    name: "название"
    }

Для получения книг по жанру get http://localhostL5000/api/getBooks с params{
    genre: "жанр"
    }


Для получения книг по названию и жанру get http://localhostL5000/api/getBooks с params{
    name: "название",
    genre: "Жанр"
}


Для получения всех жанров напишите get http://localhostL5000/api/getGenres