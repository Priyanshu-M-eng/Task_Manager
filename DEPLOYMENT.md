# 🚀 Deployment Guide - Render & Vercel

## Backend Deployment (Render)

### Pre-requisites:
1. GitHub account aur repository mein code push kiya hua
2. MongoDB Atlas account (free tier)
3. Render account (free tier)

### Steps:

#### 1. MongoDB Atlas Setup
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) par jaayein
2. Free cluster create karein
3. Database User create karein (username & password note kar lein)
4. Network Access mein `0.0.0.0/0` add karein (allow from anywhere)
5. Connection string copy karein (Example: `mongodb+srv://username:password@cluster.mongodb.net/backend_assignment`)

#### 2. Render par Backend Deploy
1. [Render](https://render.com) par login karein
2. "New +" button click karein → "Web Service" select karein
3. GitHub repository connect karein
4. Settings configure karein:
   - **Name**: `backend-assignment` (ya koi bhi naam)
   - **Region**: Singapore (nearest)
   - **Branch**: `main` (ya aapka default branch)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Environment Variables add karein (Environment tab mein):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/backend_assignment
   JWT_SECRET=apni_secret_key_yahan_dalein_bahut_complex_rakhen
   JWT_EXPIRE=7d
   BCRYPT_ROUNDS=10
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. "Create Web Service" button click karein
7. Deployment complete hone tak wait karein (5-10 minutes)
8. Backend URL copy kar lein (Example: `https://backend-assignment.onrender.com`)

#### Important Notes:
- Free tier par backend 15 minutes inactivity ke baad sleep mode mein jaata hai
- Pehli request slow hogi (cold start)
- MongoDB Atlas ka connection string mein special characters (`@`, `:`, `/`) encode karna zaruri hai

---

## Frontend Deployment (Vercel)

### Pre-requisites:
1. GitHub account aur repository mein code push kiya hua
2. Vercel account (free tier)
3. Backend successfully deploy hua ho

### Steps:

#### 1. Frontend Environment Variable Setup
1. `frontend` folder mein `.env` file banayein:
   ```bash
   cd frontend
   echo REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v1 > .env.production
   ```
   
   **Important**: `your-backend-url.onrender.com` ko apne actual Render URL se replace karein

#### 2. Vercel par Frontend Deploy
1. [Vercel](https://vercel.com) par login karein
2. "Add New..." → "Project" click karein
3. GitHub repository import karein
4. Settings configure karein:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (Edit button click karke set karein)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build` (default)

5. Environment Variables add karein:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v1
   ```

6. "Deploy" button click karein
7. Deployment complete hone tak wait karein (2-5 minutes)
8. Frontend URL mil jayega (Example: `https://your-app.vercel.app`)

---

## Backend mein CORS Configuration Update

Deployment ke baad, backend ke CORS settings mein Vercel URL add karna hoga:

1. `backend/src/app.js` file mein CORS configuration update karein:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'https://your-app.vercel.app'  // Apna Vercel URL yahan add karein
     ],
     credentials: true
   };
   ```

2. Changes commit aur push karein:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```

3. Render automatically redeploy kar dega

---

## Testing Deployed Application

### 1. Backend Test:
```bash
# Health check
curl https://your-backend-url.onrender.com/

# API documentation
# Browser mein kholen: https://your-backend-url.onrender.com/api-docs
```

### 2. Frontend Test:
- Browser mein apna Vercel URL kholen
- Register karke naya user banayein
- Login karein
- Tasks create, update, delete try karein

---

## Troubleshooting

### Backend Issues:
1. **Database connection error**: MongoDB Atlas ka connection string check karein
2. **CORS error**: Backend mein frontend URL properly add kiya hai ya nahi
3. **500 errors**: Render logs check karein (Dashboard → Logs)
4. **Slow response**: Free tier cold start hai, thoda wait karein

### Frontend Issues:
1. **API not connecting**: Environment variable `REACT_APP_API_URL` sahi hai ya nahi
2. **Build failed**: Dependencies properly install hui hai ya nahi
3. **404 errors**: Vercel routing configuration check karein

---

## Important Commands

### Local Testing ke liye:
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api/v1 npm start
```

### Git Commands:
```bash
# Code push karna
git add .
git commit -m "deployment ready"
git push origin main

# Status check
git status
```

---

## Cost Estimation

### Free Tier Limits:
- **Render**: 750 hours/month (free), sleep after 15 min inactivity
- **Vercel**: 100 GB bandwidth/month, unlimited deployments
- **MongoDB Atlas**: 512 MB storage, shared clusters

### Upgrade Options (agar zarurat ho):
- **Render**: $7/month (always-on instance)
- **Vercel**: $20/month (Pro plan)
- **MongoDB Atlas**: $9/month (Dedicated cluster)

---

## Security Checklist

✅ Environment variables properly set hai
✅ JWT_SECRET strong aur unique hai
✅ MongoDB Atlas IP whitelist configured hai
✅ CORS properly configured hai
✅ .env files .gitignore mein add hai (secrets expose na ho)
✅ Rate limiting enabled hai
✅ Passwords hashed hai

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **MERN Stack**: https://www.mongodb.com/mern-stack

---

## Next Steps

1. ✅ Backend Render par deploy karein
2. ✅ Frontend Vercel par deploy karein
3. ✅ CORS settings update karein
4. ✅ Testing karein
5. ✅ Custom domain add karein (optional)
6. ✅ Monitoring setup karein (optional)

Deployment successful hone par aapke paas do URLs honge:
- Backend: `https://your-app.onrender.com`
- Frontend: `https://your-app.vercel.app`

**Good Luck! 🚀**
