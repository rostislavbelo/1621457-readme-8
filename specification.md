# Инструкции по запуску проекта

## 1. Рабочая директория

Команды далее запускаются из директории "project"

## 2. Переменные окружения

На основании фалов-примеров: 
"account.env-example" -> "account.env"  
"blog.env-example" -> "blog.env" 
"notify.env-example" -> "notify.env" 
"storage.env-example" -> "storage.env"

для ORM Prisma:
"project\libs\blog\models\prisma\.env-example" -> ".env"

## 3. Установка npm пакетов

```bash
npm install
```

## 4. Запуск контейнеров в докере

```bash
npm run all:docker-up
```

(Дополнительные скрипты для микросервисов в файле package.json)

## 5. Миграция БД и генерация Prisma клиента

```bash
npx nx run blog:db:migrate
```

```bash
npx nx run blog:db:generate
```

## 6. Команды запуска микросервисов

```bash
npx nx run account:serve
```

```bash
npx nx run notify:serve
```

```bash
npx nx run blog:serve
```

```bash
npx nx run storage:serve
```

```bash
npx nx run api:serve
```

## 7. Примеры тестовых http запросов

В файле app.http в project/apps/api/src/app

## 8. Дополнительные комментарии

1. Загрузка изображений происходит в сценариях регистрации пользователя, создания и редактирования поста с изображением. 
2. Поиск публикации по тегами и по заголовкам и черновиков текущего пользователся реализован через квери параметры в сценарии получения списка публикаций.
