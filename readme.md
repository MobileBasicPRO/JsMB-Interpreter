## Интерпретатор JsMobileBasic

### Что это?
Интерпретатор - программа для выполнения программ на языке JsMobileBasic.
Так же может использоваться для тестирования возможностей языка, так как имеет встроенную среду выполнения и консоль ошибок.
При публикации своего приложения используйте **компилятор** для получения запускного файла.

### Как установить?
Интерпретатор представляет из себя среду выполнения NW.JS и программу в формате JsMB, которая отвечает за оболочку интерпретатора.
Готовую сборку можно скачать для Вашей платформы [Здесь](https://github.com/MobileBasicPRO/jsmb_interpreter_releases/releases)
Если же Ваша платформа не поддерживается - скомпилируйте NW.JS и запустите с её помощью файл jsmb.jsmb, который можно скачать по ссылке выше.

### Как запускать программы?
Интерпретатор поддерживает 2 режима:
- Режим песочницы
- Режим выполнения

В сборке для ОС Windows эти режимы разделены по запускным файлам:
- jsmb.exe - режим песочницы
- runtime.exe - режим выполнения

В сборке для Linux:
- При запуске просто jsmb - открывается режим песочницы
- При запуске с аргументами (jsmb . или jsmb MyApp.jsmb) - режим выполнения

Т.е. для запуска программы нужно:
- Windows: перетащить jsmb файл/папку программы на runtime.exe
- Linux, etc: Выполнить в терминале `jsmb ваша_программа.jsmb`

## Нужна помощь с переводом на английский!