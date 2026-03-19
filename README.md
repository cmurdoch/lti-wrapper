# lti-wrapper

# LTI 1.1 Wrapper for GitHub Pages

A minimal LTI 1.1 tool provider that validates launches from an LMS
(e.g. Canvas) and redirects users to a static GitHub Pages site.

## How it works

1.  Canvas sends a signed LTI POST request to `/launch`
2.  The serverless function validates the OAuth 1.0 signature
3.  On success, the user is redirected to your GitHub Pages site

## Repo structure

    lti-wrapper/
    ├── api/
    │   └── launch.js      ← The serverless function
    ├── package.json
    ├── vercel.json         ← Route config
    └── README.md

## Setup

### 1. Create the repo

Create a new GitHub repository and add the files with the structure
shown above. Note that `launch.js` must be inside the `api/` folder ---
this is how Vercel identifies serverless functions.

### 2. Deploy to Vercel

1.  Go to [vercel.com](https://vercel.com) and sign in with your GitHub
    account

2.  Click **"Add New Project"** and import this repository

3.  In the project settings, add three **Environment Variables**:

      Variable         Value
      ---------------- -------------------------------
      `LTI_KEY`        Your LTI consumer key
      `LTI_SECRET`     Your LTI shared secret
      `REDIRECT_URL`   `https://cmurdoch.github.io/`

4.  Click **Deploy**

5.  Note your project URL (e.g. `https://lti-wrapper-abc123.vercel.app`)

### 3. Configure Canvas

In your Canvas sandbox:

1.  Go to **Settings → Apps → + App**
2.  Choose **Configuration Type: Manual Entry**
3.  Fill in:
    -   **Name:** Your tool name (e.g. "Search Prompts Workshop")
    -   **Consumer Key:** Same value as your `LTI_KEY`
    -   **Shared Secret:** Same value as your `LTI_SECRET`
    -   **Launch URL:** `https://your-project.vercel.app/launch`
    -   **Privacy:** Set to your preference (Public sends user info)
4.  Save

### 4. Test

Add the external tool to a Canvas module or assignment and launch it.
You should be redirected to your GitHub Pages site.

Check the **Vercel function logs** (in your Vercel dashboard under the
project's "Logs" tab) to see the LTI launch data being logged.

## Notes

-   The `ims-lti` library is Instructure's own Node.js library for LTI
    1.1 validation.
-   For a production deployment you would want to add error handling,
    nonce storage, and consider passing user identity information
    through to your site.
-   Vercel's free tier is more than sufficient for testing and light
    usage.
