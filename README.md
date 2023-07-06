# Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
node index.js --action="list"

<img src="./printScreen/allContacts.png" alt="">

# Отримуємо контакт по id і виводимо у консоль об'єкт контакту або null, якщо контакту з таким id не існує.
node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6

<img src="./printScreen/getContactById.png" alt="">

# Додаємо контакт та виводимо в консоль об'єкт новоствореного контакту
node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22

<img src="./printScreen/addContact.png" alt="">

# Видаляємо контакт та виводимо в консоль об'єкт видаленого контакту або null, якщо контакту з таким id не існує.
node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH

<img src="./printScreen/removeContact.png" alt="">