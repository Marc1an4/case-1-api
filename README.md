# Product API (Express + TypeScript)

A RESTful CRUD API built with **Express.js** that toggles between PostgreSQL (Sequelize) and in-memory data based on `.env` configuration.

## 🔧 Installation
1. Clone repo:
   ```bash
   git clone https://github.com/your-username/product-api.git
   cd product-api
   ```
2. Install deps:
   ```bash
   npm install
   ```
3. (Optional) Database setup:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

## 🚀 Usage
```bash
npm run dev
```
Server starts at `http://localhost:3000/api/products`

## 🌐 Endpoints
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | /api/products         | Get all products     |
| GET    | /api/products/:id     | Get single product   |
| POST   | /api/products         | Create product       |
| PUT    | /api/products/:id     | Update product       |
| DELETE | /api/products/:id     | Delete product       |

## ⚙️ Configuration
**Without .env**: Uses in-memory mock data  
**With .env**: Connects to PostgreSQL via Sequelize

Required .env variables:
```ini
DB_NAME=your_database
DB_USER=postgres_user
DB_PASSWORD=postgres_password
DB_HOST=localhost
DB_PORT=5432
```

## 🛠️ Tech Stack
- **Backend**: Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Language**: TypeScript
- **Validation**: Zod
- **Environment**: dotenv

## 📝 Example Request
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product X","price":29.99}'
```
