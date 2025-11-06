# ⚡ Quick Deployment Reference

## 📋 Checklist (Deploy karne se pehle)

- [ ] Code GitHub par push kiya hua ho
- [ ] MongoDB Atlas account ready ho
- [ ] Render account banaya ho
- [ ] Vercel account banaya ho

---

## 🎯 Step-by-Step (Short Version)

### 1️⃣ MongoDB Atlas (2 minutes)
```
1. mongodb.com/cloud/atlas → Sign Up/Login
2. Create Free Cluster
3. Create Database User (username + password save karein)
4. Network Access → Add IP: 0.0.0.0/0
5. Connect → Copy connection string
```

### 2️⃣ Backend - Render (5 minutes)
```
1. render.com → New Web Service
2. Connect GitHub repo
3. Settings:
   - Root Directory: backend
   - Build: npm install
   - Start: npm start
4. Environment Variables add karein:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/backend_assignment
   JWT_SECRET=koi_bhi_complex_random_string
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=*
5. Deploy button → Wait 5-10 min
6. URL copy karein: https://xxx.onrender.com
```

### 3️⃣ Frontend - Vercel (3 minutes)
```
1. vercel.com → New Project
2. Import GitHub repo
3. Settings:
   - Root Directory: frontend
   - Framework: Create React App
4. Environment Variables:
   REACT_APP_API_URL=https://xxx.onrender.com/api/v1
5. Deploy → Wait 2-5 min
6. URL mil jayega: https://xxx.vercel.app
```

### 4️⃣ CORS Update (2 minutes)
```
1. Render dashboard → Environment tab
2. CORS_ORIGIN update karein:
   CORS_ORIGIN=https://xxx.vercel.app
3. Save → Auto redeploy hoga
```

---

## 🔑 Environment Variables (Copy-Paste Ready)

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/backend_assignment
JWT_SECRET=apni_strong_random_secret_key_123456
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=*
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api/v1
```

---

## ✅ Verify Deployment

### Backend Check:
```bash
# Browser mein kholen
https://your-backend.onrender.com/health

# Expected Response:
{"success":true,"message":"Server is running","timestamp":"..."}
```

### Frontend Check:
```bash
# Browser mein kholen
https://your-app.vercel.app

# Register/Login test karein
```

---

## 🚨 Common Issues & Quick Fixes

| Problem | Solution |
|---------|----------|
| **Backend sleeping** | Free tier hai, first request slow hogi (15-30s) |
| **CORS error** | Backend mein CORS_ORIGIN update kiya hai? |
| **MongoDB connection fail** | Connection string mein username/password sahi hai? |
| **API not found** | Frontend mein REACT_APP_API_URL sahi hai? |
| **Build failed** | package.json mein dependencies check karein |

---

## 📱 Links

- **MongoDB Atlas**: https://mongodb.com/cloud/atlas
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **Full Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 💡 Pro Tips

1. **JWT_SECRET**: Generate strong secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **MongoDB Password**: Special characters encode karein:
   - `@` → `%40`
   - `:` → `%3A`
   - `/` → `%2F`

3. **Free Tier Limits**:
   - Render: 750 hours/month
   - Vercel: Unlimited builds
   - MongoDB: 512 MB storage

4. **Logs Check**:
   - Render: Dashboard → Logs tab
   - Vercel: Deployment → Function logs

---

## 🎉 Done!

Deployment successful hone ke baad:
- ✅ Backend: `https://xxx.onrender.com`
- ✅ Frontend: `https://xxx.vercel.app`
- ✅ API Docs: `https://xxx.onrender.com/api-docs`

**Happy Deploying! 🚀**
