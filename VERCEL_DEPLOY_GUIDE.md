# 🚀 Vercel Deployment Guide - Frontend

Backend URL: `https://task-manager-backend-2yz5.onrender.com`

---

## Method 1: Vercel Dashboard (Recommended - Easy)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Vercel Dashboard Configuration

1. **Login**: https://vercel.com → Sign in with GitHub

2. **New Project**: 
   - Click "Add New..." → "Project"
   - Select your repository: `Backend Assignment`

3. **Configure Project Settings**:

   **IMPORTANT: Root Directory**
   - Click "Edit" button next to "Root Directory"
   - Set: `frontend`
   - Click "Continue"

   **Framework Preset**: 
   - Auto-detected: `Create React App` ✅

   **Build Settings**:
   - Build Command: `npm run build` (default - don't change)
   - Output Directory: `build` (default - don't change)
   - Install Command: `npm install` (default - don't change)

4. **Environment Variables**:
   Click "Environment Variables" section
   
   Add this variable:
   ```
   Key: REACT_APP_API_URL
   Value: https://task-manager-backend-2yz5.onrender.com/api/v1
   Environment: Production (select checkbox)
   ```

5. **Deploy**:
   - Click "Deploy" button
   - Wait 2-3 minutes
   - Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Method 2: Vercel CLI (Advanced - Fast)

### Installation:
```powershell
npm install -g vercel
```

### Login:
```powershell
vercel login
```

### Deploy:
```powershell
# Navigate to frontend folder
cd frontend

# Deploy to production
vercel --prod
```

### During Setup (First Time):
```
? Set up and deploy "D:\MERN project\Backend Assignment\frontend"? [Y/n] Y
? Which scope do you want to deploy to? [Select your account]
? Link to existing project? [y/N] N
? What's your project's name? [frontend] [Press Enter]
? In which directory is your code located? ./ [Press Enter]
? Want to override the settings? [y/N] Y
? Which settings?
  ◉ Build Command
  ◉ Output Directory
? What's your Build Command? npm run build
? What's your Output Directory? build
```

### Add Environment Variable:
```powershell
vercel env add REACT_APP_API_URL production
# When prompted, paste: https://task-manager-backend-2yz5.onrender.com/api/v1
```

### Redeploy with env:
```powershell
vercel --prod
```

---

## Step 3: Update Backend CORS (IMPORTANT!)

After frontend deploys, you'll get a URL like: `https://your-app.vercel.app`

### Update Render:
1. Go to Render dashboard: https://dashboard.render.com
2. Select your backend service: `task-manager-backend-2yz5`
3. Go to "Environment" tab
4. Find or Add: `CORS_ORIGIN`
5. Set value: `https://your-app.vercel.app`
6. Click "Save Changes"
7. Wait for auto-redeploy (1-2 min)

---

## ✅ Verify Deployment

### 1. Test Frontend:
Open your Vercel URL: `https://your-app.vercel.app`

### 2. Test Registration:
- Click "Register"
- Create a new account
- Should redirect to dashboard

### 3. Check Network Tab:
- Open DevTools (F12)
- Go to Network tab
- API calls should go to: `https://task-manager-backend-2yz5.onrender.com/api/v1`

### 4. Test CRUD Operations:
- Create a task
- Edit a task
- Delete a task

---

## 🚨 Troubleshooting

### Error: "Network Error" or CORS Error
**Solution**: 
- Check CORS_ORIGIN on Render
- Make sure it matches your Vercel URL exactly
- No trailing slash in URL

### Error: API not connecting
**Solution**:
- Check Vercel Environment Variables
- Verify `REACT_APP_API_URL` is set correctly
- Redeploy: `vercel --prod` or redeploy from dashboard

### Error: Build failed
**Solution**:
```bash
# Test build locally first
cd frontend
npm install
npm run build

# If successful, push and redeploy
```

### Error: 404 on page refresh
**Solution**: Already fixed with `vercel.json` rewrites ✅

---

## 📋 Final Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend URL: https://task-manager-backend-2yz5.onrender.com/api/v1
- [ ] Environment variable REACT_APP_API_URL set in Vercel
- [ ] CORS_ORIGIN updated on Render with Vercel URL
- [ ] Registration working
- [ ] Login working
- [ ] Dashboard loading
- [ ] Tasks CRUD working

---

## 🎉 Success!

Your full-stack app is now live:
- **Backend**: https://task-manager-backend-2yz5.onrender.com
- **Frontend**: https://your-app.vercel.app
- **API Docs**: https://task-manager-backend-2yz5.onrender.com/api-docs

---

## 🔄 Future Deployments

### Update Frontend:
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys from GitHub
```

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys from GitHub
```

---

## 💡 Pro Tips

1. **Custom Domain**: 
   - Vercel: Project Settings → Domains → Add
   - Update CORS_ORIGIN on Render

2. **Environment Variables**:
   - Change anytime in Vercel dashboard
   - Need to redeploy after change

3. **Logs**:
   - Vercel: Deployments → Click deployment → View Function Logs
   - Render: Dashboard → Logs tab

4. **Performance**:
   - Vercel: Instant globally (CDN)
   - Render Free: Cold start delay (~30s)

---

**Happy Deploying! 🚀**
