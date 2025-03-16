<template>

    <div class="ructmain">
        <div>

            <div class="mainpresc">
                <p>
                    Проект представляет собой сервис, который позволит создавать закладки на сайты для быстрого доступа к ним.
                </p>
            </div>
            <div class="">
                <div class="mainpresc">
                    <h5>Категории (группы)</h5>
                    <p>
                        Закладки должны быть разбиты на категории. Категории создает сам юзер.
                    </p>
                </div>
                <div class="mainpresc">
                    <h5>Добавление ссылки</h5>
                    <p>
                        При добавлении ссылки юзер указывает URL и имя ссылки.
                    </p>
                </div>
                <div class="mainpresc ">
                    <h5>Редактирование</h5>
                    <p>
                        Пользователь может редактировать как категории (группы), так и сами ссылки. Менять очередь отображения, удалять и добавлять элементы.
                    </p>
                </div>
                <div class="mainpresc ">
                    <h5>Дополнительное задание</h5>
                    <p>
                        Придумать удобный быстрый доступ ко всем ссылкам. И вообще хорошенько поработать над удобством нашего сервиса.
                    </p>
                </div>
                <div class="mainpresc ">
                    <h5>Хранение данные</h5>
                    <p>
                        Для хранения данных пользователя используется localStorage браузера.
                    </p>
                </div>
            </div>
        </div>


        <footer class="ruct/footer">
            <div class="footer/info">
                Тип задания: персональное задание
                <br>
                Ментор: <a href="https://t.me/trepachev_dmitry">Трепачёв Дмитрий</a>
            </div>
        </footer>

        <div class="mainpresc fst-italic">
            <h6>Реализация проекта</h6>
            <p>
                Проект реализован с помощью фреймворков Vue3 (State manager: Pinia) и Bootstrap 5.3
            </p>
        </div>
    </div>
</template>

<style scoped>
.ructmain {
    background: #f0f0f0;
    /* padding: 4px; */
}

.mainpresc {
    background: white;
    padding: 4px;
    margin: 8px;
}

footer {
    padding: 12px;
}
</style>
