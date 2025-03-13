$(document).ready(function () {
    let score = 0;
    let level = 1; // Начальный уровень
    let mrPotatoesToNextLevel = 4; // Количество мистеров картошек для перехода на следующий уровень
    let mrPotatoesCount = 0; // Счётчик мистеров картошек
    let gameInterval;
    const maxLevel = 15; // Максимальный уровень

    // Окно "Как играть"
    $("#continue-btn").on("click", function () {
        $("#how-to-play").fadeOut(300, function () {
            $("#start-btn").removeClass("hidden"); // Показываем кнопку "Начать игру"
        });
    });

    function createPotato() {
        let randomNum = Math.random();
        let potatoData;

        // Определяем тип картошки (10% золотая, 10% гнилая, 80% обычная)
        if (randomNum < 0.1) {
            potatoData = { src: "img/mrpot.png", points: 50, type: "mr" }; // Золотая мистер картошка
        } else if (randomNum < 0.2) {
            potatoData = { src: "img/badpot.png", points: -30, type: "bad" }; // Гнилая
        } else {
            potatoData = { src: "img/potato.png", points: 10, type: "normal" }; // Обычная
        }

        let $potato = $("<img>")
            .attr("src", potatoData.src)
            .addClass("potato")
            .css({ position: "absolute" });

        let $gameArea = $("#game-area");
        let gameWidth = $gameArea.width();
        let gameHeight = $gameArea.height();

        let x = Math.random() * (gameWidth - 100);
        let y = Math.random() * (gameHeight - 100);

        // Устанавливаем позицию картошки
        $potato.css({ left: `${x}px`, top: `${y}px` });

        $gameArea.append($potato);

        $potato.on("click", function () {
            score += potatoData.points;
            $("#score").text(score);

            // Если это мистер картошка, увеличиваем счётчик мистеров картошек
            if (potatoData.type === "mr") {
                mrPotatoesCount++;
                checkLevelUp(); // Проверка на повышение уровня
            }

            $(this).remove();
        });

        setTimeout(() => {
            $potato.fadeOut(200, function () {
                $(this).remove();
            });
        }, Math.random() * 1500 + 500);
    }

    // Функция для отображения картинки победы после 15 уровня
    function showVictoryImage() {
        clearInterval(gameInterval); // Останавливаем игру
        $("#game-area").html('<img src="img/win.png" class="victory-image">'); // Показываем картинку победы
    }

    // Функция для проверки уровня и увеличения сложности
    function checkLevelUp() {
        if (mrPotatoesCount >= mrPotatoesToNextLevel && level < maxLevel) {
            level++; // Переход на следующий уровень
            mrPotatoesToNextLevel += 3; // Увеличиваем количество мистеров картошек для следующего уровня
            $("#level").text("Уровень: " + level); // Отображаем новый уровень
            mrPotatoesCount = 0; // Сбрасываем счётчик мистеров картошек
            clearInterval(gameInterval); // Останавливаем текущий интервал
            gameInterval = setInterval(createPotato, 800 - level * 50); // Уменьшаем время появления картошек с каждым уровнем
        }

        // Если игрок достиг 15 уровня, показываем картинку победы
        if (level === maxLevel) {
            showVictoryImage();
        }
    }

    // Кнопка "Начать игру"
    $("#start-btn").on("click", function () {
        $(this).addClass("hidden"); // Скрываем кнопку "Начать"
        score = 0;
        level = 1;
        mrPotatoesToNextLevel = 4;
        mrPotatoesCount = 0;
        $("#score").text(score);
        $("#level").text("Уровень: " + level); // Отображаем начальный уровень
        gameInterval = setInterval(createPotato, 800); // Запускаем игру
    });

    // Убедимся, что по умолчанию кнопка "Начать игру" скрыта
    $("#start-btn").addClass("hidden");
});
