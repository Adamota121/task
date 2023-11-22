export class Tools {

    /**
     * Проверяет наличие обязательных полей в объекте данных.
     * @param fields - массив обязательных полей
     * @param data - объект данных
     * @returns имя первого отсутствующего обязательного поля или null, если все поля присутствуют
     */
    static checkRequiredFields(fields, data) {
        for (const field of fields) {
            if (data[field] === undefined) {
                return field;
            }
        }
        return null
    }

    /**
     * Проверяет корректность данных.
     * @param data - объект данных
     * @returns имя первого некорректного поля или null, если все поля корректны
     */
    static checkDataOnCorrect(data) {
        const forbiddenCharacters = /[!?:@]/;
        const onlySpaces = /^\s+$/;
    
        for (const field in data) {
            if (field === 'id') {
                if (typeof data[field] !== 'number') {
                    return field;
                }
            } else {
                if (typeof data[field] !== 'string' ||
                    forbiddenCharacters.test(data[field]) ||
                    onlySpaces.test(data[field])) {
                    return field;
                }
            }
        }
    
        return null;
    }
}