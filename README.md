#  Mini LinkedIn Community Platform

A minimal LinkedIn-style social community platform built with the **MERN stack**, allowing users to register, post updates, and explore others' profiles — all in a simple, clean interface.

##  Features Implemented

###  1. User Authentication
- Register and Login using **Email & Password**
- Secure authentication using **JWT**
- Each user has a **profile** with Name, Email, and Bio

### 2. Public Post Feed
- Users can **create text-only posts**
- Posts display on the **Home Feed**
- Each post shows the **author’s name** and **timestamp**

###  3. Profile Page
- View **your own profile**
- View **other users’ profiles**
- See all posts made by a specific user

###  4. Search (Bonus)
- Live **search bar** for users and posts
- Instant suggestions and clickable results

---

##  Tech Stack

 Frontend    - React + Bootstrap             
 Backend     - Node.js + Express.js          
 Database    - MongoDB (Mongoose ODM)        
 Authentication - JWT + bcrypt                
  Deployment  - Render 

---

## Live Demo
>https://linkedin-client.onrender.com 


## 📁 Folder Structure

```
client/               # React frontend
  └── src/
      ├── components/
      ├── context/
      └── pages/

backend/               # Express backend
  ├── routes/
  ├── models/
  └── middleware/
```

---

##  Installation Guide (for local testing)

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd client
npm install
npm start
```


##  Credits
I developed this project as an assignment submission for CIAAN CYBER TECH PRIVATE LIMITED internship.
