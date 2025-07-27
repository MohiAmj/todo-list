# My Project (Angular + Strapi)

## 📁 Repository Structure
```
your-repo/
├── backend/          # Strapi backend
│   ├── src/          # Strapi core
│   └── config/       # Strapi configs
├── src/              # Angular frontend
├── angular.json      # Angular config
└── package.json      # Frontend dependencies
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js v18+
- npm/yarn
- Strapi CLI (`npm install -g strapi`)

### **Run Backend (Strapi)**
```bash
cd backend
npm install
npm run develop
```
- Access Strapi admin: `http://localhost:1337/admin`

### **Run Frontend (Angular)**
```bash
npm install
npm start
```
- Access Angular app: `http://localhost:4200`

## 🔧 Configuration
- **Strapi ENV**: Edit `backend/.env`  
  ```env
  DATABASE_URL=postgres://user:pass@localhost:5432/strapi
  ```
- **Angular ENV**: Edit `src/environments/environment.ts`  
  ```ts
  export const environment = {
    apiUrl: 'http://localhost:1337',
  };
  ```

## 🛠 Deployment
- **Frontend**: Host on Vercel/Netlify  
- **Backend**: Deploy Strapi to Railway/Heroku  

## 📜 License
MIT
