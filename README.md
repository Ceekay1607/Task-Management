# How to Run

## Backend

### Installation and Configuration
1. Create a new **.env** file in the backend folder and apply configuration based on the provided **.env.example** file
2. Navigate to the `backend` folder:
```
  cd backend
```
2. Install the required dependencies:
```c
npm install
```
3. Apply migrations to set up the database:
```c
npx knex migration:latest
```
4. Seed the database with initial data:
```c
npx knex seed:run
```
### Running the Backend
To start the backend server, run the following command:
```c
npm start
```

## Frontend (if applicable)

### Installation and Configuration

1. Navigate to the `frontend` folder:
```c
cd frontend
```
2. Install the required dependencies:
```c
npm install
```
3. Configure the frontend settings as needed.

### Running the Frontend
```c
npm run dev
```
