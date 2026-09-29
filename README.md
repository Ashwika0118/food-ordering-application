# 🍔 BiteDash - Full-Stack Food Ordering Web Application

A full-stack, responsive food ordering web application with an interactive frontend, Node.js + Express REST API backend, and persistent database storage.

---

## 🚀 Features

- **Frontend (Web UI)**
  - Dynamic menu catalog with real-time API sync
  - Category filtering (Burgers, Pizza, Sushi, Bowls, Pasta, Desserts, Drinks)
  - Search bar with instant live filtering
  - Vegetarian mode toggle
  - Interactive shopping cart drawer with quantity stepper
  - Promo code engine (`QUICK20` gives 20% discount)
  - Driver tip selector ($2, $3, $5, or None)
  - Dynamic delivery fee (Free for orders over $35)
  - Checkout modal with delivery address & payment selection
  - Real-time order progress tracker (Confirmed ➔ Preparing ➔ Out for Delivery)

- **Backend (REST API)**
  - Powered by **Node.js & Express**
  - Modular routing and request validation
  - Automatic JSON static file serving
  - CORS enabled for cross-origin client support

- **Database (Persistence)**
  - Persistent JSON database storage engine (`server/data/food_database.json`)
  - Out-of-the-box seed data with high-res dish photos, descriptions, prices, and categories
  - Automatic order creation with transaction receipts and timestamps

---

## 🛠️ Project Structure

```text
food-ordering-app/
├── public/
│   └── index.html          # Interactive Frontend UI (React + Tailwind CSS)
├── server/
│   ├── data/               # Persistent database storage
│   ├── db.js               # Database schema, seed data & queries
│   └── index.js            # Express REST API server & static host
├── .gitignore              # Ignored files (node_modules, logs, env)
├── package.json            # Scripts & dependencies
└── README.md               # Documentation
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
The server will start at:
- **Web Application:** `http://localhost:5000`
- **Backend API:** `http://localhost:5000/api`

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & server status |
| `GET` | `/api/categories` | Retrieve all menu categories |
| `GET` | `/api/dishes` | List all dishes (supports `?category=`, `?veg=true`, `?search=`) |
| `GET` | `/api/dishes/:id` | Get details for a specific dish |
| `POST` | `/api/orders` | Place a new order with items and customer details |
| `GET` | `/api/orders` | List all historical orders |
| `GET` | `/api/orders/:id` | Get order status and tracking details |
| `PATCH` | `/api/orders/:id/status` | Update order delivery status |

---

## 🐙 Pushing to GitHub

To push this codebase to your GitHub account:

1. **Initialize Git** in this directory:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of full-stack food ordering app"
   ```

2. **Create a new repository** on [GitHub](https://github.com/new).

3. **Link your remote repository and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
