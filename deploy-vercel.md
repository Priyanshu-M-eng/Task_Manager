# Vercel CLI Deployment

## Install Vercel CLI:
```bash
npm install -g vercel
```

## Login:
```bash
vercel login
```

## Deploy from frontend folder:
```bash
cd frontend
vercel --prod
```

## Configure during deployment:
- Set up and deploy: **Y**
- Which scope: Choose your account
- Link to existing project: **N** (first time)
- Project name: **Enter** (default)
- Directory: **./** (already in frontend folder)
- Override settings: **Y**
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Development Command: `npm start`

## Set Environment Variable:
```bash
vercel env add REACT_APP_API_URL production
# Paste: https://task-manager-backend-2yz5.onrender.com/api/v1
```

## Redeploy:
```bash
vercel --prod
```
