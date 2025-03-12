$(document).ready(function () {
    let score = 0;
    let gameInterval;

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
            potatoData = { src: "img/mrpot.png", points: 50 }; // Золотая
        } else if (randomNum < 0.2) {
            potatoData = { src: "img/badpot.png", points: -30 }; // Гнилая
        } else {
            potatoData = { src: "img/potato.png", points: 10 }; // Обычная
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
            $(this).remove();

            // Если игрок набрал 879 очков, показываем картинку
            if (score >= 509) {
                showVictoryImage();
            }
        });

        setTimeout(() => {
            $potato.fadeOut(400, function () {
                $(this).remove();
            });
        }, Math.random() * 1500 + 500);
    }

    // Функция для отображения картинки победы
    function showVictoryImage() {
        clearInterval(gameInterval); // Останавливаем игру
        $("#game-area").html('<img src="img/win.jpg" class="victory-image">'); // Показываем картинку победы
    }
   
    // Кнопка "Начать игру"
    $("#start-btn").on("click", function () {
        $(this).addClass("hidden"); // Скрываем кнопку "Начать"
        score = 0;
        $("#score").text(score);
        gameInterval = setInterval(createPotato, 800); // Запускаем игру
    });

    // Убедимся, что по умолчанию кнопка "Начать игру" скрыта
    $("#start-btn").addClass("hidden");
});



      

           