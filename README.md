# RSLANG
- [описание задания](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/rslang.md)
- [IDEAS](https://docs.google.com/spreadsheets/d/1Nv4CIGc43wxeTlf6oUhloaSTQxHIIT91cYOd1v-nwvU/edit#gid=0)
- [JIRA](https://team-1592125956305.atlassian.net/secure/RapidBoard.jspa)
- [retro](https://reetro-io.herokuapp.com/board/5eec6aae4e337f00168f25d4/5eec6afe4e337f00168f25eb)
- созвон в **18:30**
## Ветки
Ветка `develop` – основная ветка разработки. В `master` ничего не добавляем.

Все ведут разработку в своих собственных ветках. Название - в соответствии с таском в JIRA, например `RL-11-statistics`.
Ветки создаются от актуальной `develop`. Все мержи в ветку `develop` происходят только через PR.
## Струтура проекта
```
src/
    assets/                       // общие на проект медиафайлы
              images/ ...
    sass/
              abstract/ ...       // constants, mixins, placeholders
              base/ ...           // base, icons ...
              components/ ...     // dictionary, navigation ...
              layouts/ ...        // header, footer ...
              pages/ ...          // сюда складываем стили для игр в т.ч. (1 игра = 1 файл)
              style.scss          // здесь импортим свои стили
    js/
              utils/ ...          // утилиты для всех
              shared/
                     constants.js // общие переменные на проект
                     Tags.json    // json доступных тегов. импортим себе и используем, чтобы не было magic string
                     Text.js      // текст для элементов, типа кнопок
              taskFolder/ ...     // ваш js таск
    app.js                        // основной js
    index.html                    // основной html
.babelrc
.editorconfig                     // обеспечивает одинаковое форматирование в проекте, в VScode alt + shift + f
.eslintignore
.eslintrc.js
.gitignore
README.md
package.json
postcss.config.js
webpack.config.js
```
## Git
Прежде чем создавать новую ветку, находясь в develop обновите ее командой
`git pull origin develop`

далее создавайте ветку
`git checkout -b branch-name`

после окончания работы над задачей, отправляем изменения на GitHub
`git push origin branch-name`

если на этом этапе появилось предупреждение ESLINT и коммита не было, исправляйте ошибки и коммитайте снова

создаем PR в `develop`, указав всех участников команды в Reviewers и описывая в PR, что это за фича или таск, чтобы было понятно, что вы сделали (понятно тем, кто над этой задачей не работал)
