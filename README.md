# Personal Finance Tracker

A full-stack web application to help users manage their personal finances by tracking income, expenses, and transactions. Built with React (Vite, Tailwind CSS) on the frontend and Node.js/Express with MongoDB on the backend.

## Features

- User authentication (login, protected routes)
- Add, view, and delete financial transactions
- Dashboard with summary of income, expenses, and balance
- Responsive UI with reusable components
- RESTful API for transaction and user management

## Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- PostCSS

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)

## Folder Structure

```
client/
  src/
    components/
    lib/
    pages/
  index.html
  package.json
server/
  models/
  routes/
  middlewares/
  index.js
  package.json
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```powershell
   git clone <repo-url>
   cd Personal-finance-tracker
   ```

2. **Install dependencies:**
   ```powershell
   cd client; npm install; cd ../server; npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the `server/` folder with:
     ```env
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret>
     PORT=5000
     ```

4. **Start the backend server:**
   ```powershell
   cd server; node index.js
   ```

5. **Start the frontend dev server:**
   ```powershell
   cd client; npm run dev
   ```

6. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## API Endpoints

- `POST /api/auth/login` — User login
- `POST /api/auth/register` — User registration
- `GET /api/transactions` — Get all transactions
- `POST /api/transactions` — Add a transaction
- `DELETE /api/transactions/:id` — Delete a transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue or contact the maintainer.
