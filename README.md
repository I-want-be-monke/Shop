# DildoShop

DildoShop - это веб-приложение для онлайн-магазина, предлагающее пользователям возможность просматривать и добавлять продукты в корзину. Приложение использует ASP.NET Core для серверной части и React для клиентской части. Также интегрировано с Apache Kafka для обработки событий.

## Содержание

- [Требования](#требования)
- [Установка](#установка)
- [Запуск](#запуск)
- [Использование](#использование)
- [API](#api)
- [Технологии](#технологии)

## Требования

- .NET 6.0 или выше
- Node.js (для клиентской части)
- PostgreSQL (или другая база данных, поддерживаемая EF Core)
- Apache Kafka (для обработки событий)

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/I-want-be-monke/Shop.git
   cd Shop
2. Установите зависимости для серверной части:
cd DildoShop.Server
dotnet restore

3. Установите зависимости для клиентской части:
cd DildoShop.Client
npm install

4. Настройте строку подключения к базе данных в appsettings.json:
   
"ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=mydb;Username=myuser;Password=mypassword"
},

5. Настройте параметры Kafka в appsettings.json:
"Kafka": {
    "BootstrapServers": "localhost:9092"
}

Запуск

1. Запустите серверную часть:
cd DildoShop.Server
dotnet run

2. Запустите клиентскую часть в другом терминале:
cd DildoShop.Client
npm start

3.Откройте браузер и перейдите по адресу http://localhost:3000 для доступа к приложению.

Использование
Просматривайте доступные продукты на главной странице.
Добавляйте продукты в корзину.
Перейдите в корзину для оформления заказа.
API
Приложение предоставляет следующие API-эндпоинты:

GET /api/products - Получить список всех продуктов.
GET /api/products/{id} - Получить продукт по ID.
POST /api/products - Создать новый продукт.
Технологии
ASP.NET Core
Entity Framework Core
PostgreSQL
React
Apache Kafka
Swagger (для документирования API)





