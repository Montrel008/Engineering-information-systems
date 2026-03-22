// Данные группы БСТ-2253 (номер зачётки в поле marks)
var groupmates = [
    {
        "name": "Атабаев А. Р.",
        "group": "БСТ-2253",
        "marks": "3БСТ22107"  // номер зачётки
    },
    {
        "name": "Бегеба В. М.",
        "group": "БСТ-2253",
        "marks": "3БСТ22003"
    },
    {
        "name": "Гуров А. Н.",
        "group": "БСТ-2253",
        "marks": "3БСТ22056"
    },
    {
        "name": "Захарова О. А.",
        "group": "БСТ-2253",
        "marks": "3БСТ22162"
    }
];

// Вывод массива в консоль
console.log("Группа БСТ-2253:");
console.log(groupmates);

// Функция для добавления пробелов справа (аналог ljust в Python)
var rpad = function(str, length) {
    str = str.toString();
    while (str.length < length) {
        str = str + ' ';
    }
    return str;
};

// Функция вывода студентов в виде таблицы
var printStudents = function(students) {
    console.log("\n" + rpad("№", 4),
                rpad("Фамилия И.О.", 25),
                rpad("Группа", 10),
                rpad("Зачётка", 15));
    console.log("-".repeat(60));

    for (var i = 0; i < students.length; i++) {
        console.log(
            rpad(i+1, 4),
            rpad(students[i]['name'], 25),
            rpad(students[i]['group'], 10),
            rpad(students[i]['marks'], 15)  // теперь это номер зачётки
        );
    }
    console.log('\n');
};

printStudents(groupmates);

// Функция поиска студента по номеру зачётки
function findByGradebook(students, gradebook) {
    var result = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['marks'] === gradebook) {
            result.push(students[i]);
        }
    }
    return result;
}

// Пример: поиск по зачётке
var student = findByGradebook(groupmates, "3БСТ22056");
console.log("Поиск по номеру зачётки 3БСТ22056:");
printStudents(student);

// Функция фильтрации по группе (на всякий случай)
function filterByGroup(students, group) {
    var result = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === group) {
            result.push(students[i]);
        }
    }
    return result;
}