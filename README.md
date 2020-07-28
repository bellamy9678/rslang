# RSLANG
Помимо стандартных Babel, Eslint, Sass, Webpack и необходимых модулей для их совместной работы, в проекте используются:
- [chart.js](https://www.chartjs.org/) - построение графика статистики

плюсы | минусы
------------ | -------------
бесплатно | сложно настроить кастомный tooltip
отлично подходит для диаграмм | нельзя строить точные графики с указанием масштаба оси Х, т.е. будет пересчитан масштаб, исходя из переданных данных

- [husky](https://www.npmjs.com/package/husky) - прехуки для проекта

плюсы | минусы
------------ | -------------
много настроек | -

- [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin) - favicon для проекта

плюсы | минусы
------------ | -------------
из 1 картинки формирует все возможные иконки для разных устройств | -

# Presentation

## Результат командной работы:

https://rslang-team20-bellamy9678.netlify.app/
логин | пароль
------------------ | ------------------
presentation | стандартный

- все страницы приложения
  - главная - ссылки на все игры, настройки, тренировку, приветственный экран
  - 6 мини-игр - режим игры, схожий дизайн всех игр, статистика
  - тренировка - настройки, интервальное, статистика
  - о нас - гит, описание вклада каждого участника
  - промо - видео и описание интервального повторения
  - статистика - график, игры
  - настройки - все настройки для карточек и словаря
- дополнительные фичи
  - авторизация по логину, без почты

## Организация командной работы
- Вклад каждого участника команды:
  - по 2 игры на Сашу, Андрея и Таню;
  - Андрей дополнительно стартовые экраны и окно статистики для игр;
  - Лиза - дизайн, словарь, авторизация;
  - Миша - организация проекта, тренировка, сеттинги и статистика;

таск | Миша | Лиза | Андрей | Таня | Саша | Денис (ментор)
--- | --- | --- | --- | --- | --- | ---
дизайн | C | RA | --- | --- | --- | I
настройки | RA | RA | --- | --- | --- | IС
статистика | RA | IС | RA | IС | IС | I
словарь | IС | RA | --- | --- | --- | IС
авторизация | I | RA | --- | --- | --- | I
получение слов | RA | СI | I | I | I | I
тренировка | RA | СI | --- | --- | --- | I
SpeakIt игра | I | --- | --- | RA | --- | I
Своя игра | I | --- | --- | RA | --- | I
Саванна игра | I | --- | --- | --- | RA | I
Аудиовызов игра | I | --- | --- | --- | RA | I
English puzzle игра | I | --- | RA | --- | --- | I
Спринт игра | I | --- | RA | --- | --- | I
Тестирование | RA | RA | RA | RA | RA | IС
промо | RA | RA | --- | --- | --- | I
о команде | RA | I | I | I | I | I

- координировали деятельность команды:
  - список задач в [JIRA](https://team-1592125956305.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=RL&selectedIssue=RL-7);
  - ежедневные созвоны со всеми участниками команды и ментором о результатах работы за день и о планах на следующий;
  - последняя неделя проходила в формате индивидуальных звонков ментора с каждым участником команды, в т.ч. общие звонки по некторым вопросам;
  - ретроспектива по результатам работы в первую неделю в [Reetro](https://reetro-io.herokuapp.com/board/5eec6aae4e337f00168f25d4/5eec6afe4e337f00168f25eb);
  - командный подготовительный файл с идеями, предложениями, вопросами в [Google Docs](https://docs.google.com/spreadsheets/d/1Nv4CIGc43wxeTlf6oUhloaSTQxHIIT91cYOd1v-nwvU/edit#gid=0);

Основная сложность была по итогам первой недели, когда уже появились первые результаты. У многих была своя организация файлов, разные форматы отступов, где-то нарушены правила eslint, у участников добавились новые модули и т.п. Решением были установка прехуков, добавление editorconfig и создание в Readme всей будущей иерархии проекта с описанием каждой папки. В дальнейшем к этой проблеме не возвращались, после того как был произведен рефакторинг всего проекта и у всех участников были актуальный develop.

На второй и последующих неделях возникали сложности при сборке отдельных компонентов. Решали это по-разному, в основном небольшим переписыванием модулей каждым участником своих файлов и проверкой, чтобы после работы каждого модуля не оставалось его данных, обработчиков событий и т.д.

Для ускорения и удобства были написаны один на весь проект стартовый экран и статистика каждой игры, генератор DOM-элементов, а также файл с общими константами для JS и Sass.

## Особенности технической реализации проекта и его репозиторий

[Репозиторий и readme.md](https://github.com/bellamy9678/rslang)

[История коммитов](https://github.com/bellamy9678/rslang/commits/master)

Каждый участик команды работал в своей ветке, позже было дабавлено правило названия ветки - в соответствии с таском в JIRA. Ветки создавались от актуальной на тот момент `develop`. Все мержи в ветку `develop` происходили только через PR.

При PR участники указавали всю команды в Reviewers и описывали в PR, что было сделано.

Кодревью и качество кода оценивалось в первую очередь ментором. Также тимлид ревьюил каждый PR и оставлял свои комментарии. 

[пример PR 1](https://github.com/bellamy9678/rslang/pull/13)

Хороший PR, все описано, т.к. один из первых, то быыли типичные небольшие ошибки, которые легко можно было подправить.

[пример PR 2](https://github.com/bellamy9678/rslang/pull/14)

Вероятно, самый "проблемный" PR, после него были добавлены прехуки и editorconfig. Почти все участники команды были задействованы в ревью, т.к. не все проблемные места были оценены тимлидом.

Из самых часто встречающихся проблем в коде проекта можно отметить:
- magic string & magic numbers,
- попытки переопределить базовые стили,
- отступы и eslint (до husky),
- нейминг,
- this, import-export, bad practises (innerHTML, верстка в строке, timeout),
- Git: объединение веткок, история, резолв конфликтов.

В ходе code review ментор указывал на проблемные места, рассказывал на звонках в т.ч. про best practices и возможные проблемные места, если участники не могли разобраться в причинах самостоятельно. Все возникающие вопросы в итоге разрешались, исходя из ответов на них в ходе общих звонков или в личных сообщениях. 

В конце разработки проводилось общее тестирование приложение, как и при интеграции составных частей. Также каждый участник команды тестировал свой код самостоятельно, как правило, на moca данных. Исправление ошибок осуществлялось также в отдельных ветках.
