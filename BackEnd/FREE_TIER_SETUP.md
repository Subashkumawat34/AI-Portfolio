# FREE TIER Setup Guide - 100% Free Solution

## 🎉 Great News: Everything is FREE!

Your portfolio website generator uses **100% FREE** Gemini API models. No credit card required!

## 🚀 Quick Setup (Under 5 Minutes)

### Step 1: Get FREE API Keys

1. Visit: https://aistudio.google.com/api-keys
2. Sign in with Google account (free)
3. Click "Get API key" or "Create API key"
4. Copy the generated key
5. Done! No payment info needed ✅

### Step 2: Update .env File

```env
# Just add these two lines:
GEMINI_API_KEY_CHATBOT=paste-your-free-key-here
GEMINI_API_KEY_EXTRACT=paste-your-free-key-here

# Optional: Specify free tier models (defaults already use these)
CHATBOT_MODEL=gemini-2.0-flash
EXTRACTOR_MODEL=gemini-2.0-flash
```

### Step 3: Restart Your Server

```bash
# Stop current server (Ctrl+C)
# Then start again:
npm run dev
```

### Step 4: Test It Works

```bash
# Run the test script:
node test-gemini-2-flash.js
```

**Expected output:**
```
✅ CHATBOT KEY + gemini-2.0-flash: SUCCESS
✅ EXTRACT KEY + gemini-2.0-flash: SUCCESS
```

## ✅ You're Done!

Your chatbot and resume extraction are now working with:
- ✅ **$0 cost** (completely free)
- ✅ **Fast responses** (latest model)
- ✅ **No limits** for development
- ✅ **No credit card** ever needed

## 📊 What You Get on FREE Tier

| Feature | Free Tier | You Need |
|---------|-----------|----------|
| **Daily Requests** | High limit | ✅ More than enough |
| **Input Tokens** | Unlimited | ✅ Perfect |
| **Output Tokens** | Unlimited | ✅ Perfect |
| **Rate Limit** | 15/minute | ✅ Plenty |
| **Cost** | **$0** | ✅ **FREE!** |

## ⚠️ Free Tier Limits (Nothing to Worry About)

- **15 requests per minute** - More than enough for normal usage
  - Your app has automatic retry logic built-in
  - User won't notice any issues
  
- **Content used for improvement** - Google may use to improve models
  - Standard for free tier
  - No sensitive data exposed (just portfolio info)

## 💡 Tips for Best Free Tier Experience

1. **Keep prompts focused** - Clear, concise = faster & better results
2. **Don't spam** - Normal usage is well within limits
3. **Trust the retries** - Error handling is already built-in
4. **No payment needed** - Seriously, it's all free! 🎉

## 🔄 When Do You Need to Pay?

**Never, for this project!** Unless you:
- Get 1000+ users per day using chatbot heavily
- Need enterprise-level SLA guarantees
- Want premium features like dedicated support

**For development, testing, and personal portfolio sites: FREE is perfect!** ✅

## 🆘 Troubleshooting

### "API key invalid"
→ Generate new key from https://aistudio.google.com/api-keys

### "Rate limit exceeded"
→ Wait 1 minute, app auto-retries (built-in)

### "Model not found"
→ Your key is valid! Just need to use free tier models (already configured)

## 📚 Free Tier Models Reference

**Using (FREE):**
- `gemini-2.0-flash` ✅ Your primary model
- `gemini-2.0-flash-lite` ✅ Fallback option
- `gemini-1.5-flash` ✅ Legacy fallback

**Avoiding (Limited Free):**
- `gemini-2.5-flash` ⚠️ Only 20 free requests/day

## ✨ Summary

1. ✅ Get free key: https://aistudio.google.com/api-keys
2. ✅ Add to `.env` file
3. ✅ Restart server
4. ✅ Test with `node test-gemini-2-flash.js`
5. ✅ **Enjoy your free AI-powered portfolio generator!**

**Total Cost: $0** 🎉
**Setup Time: 5 minutes** ⚡
**Credit Card: Not needed** 💳❌

---

*You're all set with a completely FREE solution!*
