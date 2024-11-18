# Node.js Backend Server with Prisma ORM

This project is a Node.js backend server integrated with Prisma ORM for database management. It provides a foundation for managing document and serving static files, with SQLite as the default database.

## Table of Contents

- [Node.js Backend Server with Prisma ORM](#nodejs-backend-server-with-prisma-orm)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)

---

## Features

- **Prisma ORM Integration**: Database management using Prisma.
- **Static File Serving**: Serve files from the `files/` directory.
- **REST API**: Basic CRUD operations for the `Post` model.
- **Hot Reloading**: Integrated with `nodemon` for automatic server restarts during development.
- **Database**: SQLite as the default database (can be configured).

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/monhelpierre/e-paper-prisma-backend.git
   cd e-paper-prisma-backend
   ```

2. **Install dependencies**

   ```bash
       npm install
   ```

   Or

   ```bash
       yarn install
   ```

3. **Set up environment**

   ```bash
       DATABASE_URL="file:./dev.db" # For SQLite
   ```

4. **Generate Prisma Client**

   ```bash
       npx prisma generate
   ```

5. **Run Database Migrations**

   ```bash
       npx prisma migrate dev --name init
   ```

6. **Start the Server**
   For development

   ```bash
       npm run dev
   ```

   For development

   ```bash
      npm start
   ```

--
