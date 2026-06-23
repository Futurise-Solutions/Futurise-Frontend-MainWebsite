# Google Search Console Indexing Fix: DNS & Vercel Configuration

Your pages (like `/about`, `/contact`, `/portfolio`, and `/service/*`) are currently not indexing on Google because of a mismatch between the Vercel domain routing and your React codebase.

Your React codebase is configured for the **non-www** domain (`https://futurisesolutions.com`), but Vercel currently redirects all traffic to the `www` version because the root domain has a **"DNS Change Recommended"** warning.

---

## How to Fix This (Without Code Changes)

To resolve the indexing issue without editing any website code, you need to point your root domain (`futurisesolutions.com`) to Vercel and make it the primary domain.

### Step 1: Update DNS Records at your Domain Registrar (GoDaddy, Namecheap, Route 53, etc.)
Log in to the dashboard where you bought your domain and update your DNS records:

1. **Delete any existing A records** pointing to other IP addresses for the host `@`.
2. **Add a new A Record** with the following details:
   - **Type**: `A`
   - **Name/Host**: `@` (or leave empty)
   - **Value/Points to**: `76.76.21.21` (Vercel's official IP address)
   - **TTL**: Default (or 3600/1 hour)

---

### Step 2: Configure the Primary Domain in Vercel
Once the DNS change is active (Vercel will show a **green checkmark** and say **"Valid Configuration"** instead of the yellow warning):

1. Go to your **Vercel Dashboard** > **Project Settings** > **Domains**.
2. Find **`futurisesolutions.com`** (the non-www version).
3. Click the **Edit** button next to it.
4. Select **Set as Primary** (or toggle "Redirect to another domain" off and set as main).
5. Locate **`www.futurisesolutions.com`** (the www version).
6. Click **Edit**, select **Redirect to Another Domain**, and set it to redirect to **`futurisesolutions.com`** (using a `308 Permanent Redirect`).

---

### Step 3: Re-submit Sitemap to Google
After Vercel redirects `www` to `non-www` and the root domain is verified:
1. Go to **Google Search Console**.
2. Click **Sitemaps** in the left menu.
3. Submit/Re-submit **`https://futurisesolutions.com/sitemap.xml`**.
4. Google will now successfully index all 28 canonical pages without redirect errors!