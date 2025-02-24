# Google OAuth 2.0 Authentication Example with Node.js, Express, and Passport

This project demonstrates how to implement Google OAuth 2.0 authentication in a Node.js application using Express and Passport.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **VS Code:** [Download here](https://code.visualstudio.com/)
-   **Node.js (LTS recommended):** [Download here](https://nodejs.org/)

Verify your installations by running the following commands in your terminal:


node -v
npm -v
If you see version numbers, you're ready to proceed.

*********************************************************************************   Setup Instructions  ******************************************************************************
1.Create a Project Folder:


mkdir google-auth-app
cd google-auth-app

Open in VS Code:

2.Open VS Code.
Go to File -> Open Folder and select your google-auth-app folder.
Open the terminal in VS Code (View -> Terminal or Ctrl + ~).

3.Initialize a Node.js Project:


npm init -y
This creates a package.json file in your project directory.

4.Install Dependencies:


npm install express express-session passport passport-google-oauth20 dotenv

express: Web framework.
express-session: Session management.
passport: Authentication middleware.
passport-google-oauth20: Google OAuth strategy.
dotenv: Loads environment variables from .env.

5.Create Project Files:

server.js: Create a file named server.js and paste your application's code into it.

.env: Create a file named .env and add the following environment variables:


SESSION_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Replace your_google_client_id, and your_google_client_secret with your actual values.

6.Obtain Google OAuth Credentials:

Go to the Google Cloud Console.
Create a new project (or select an existing one).   
Enable the "Google+ API" or "OAuth 2.0 API".   
Navigate to Credentials -> Create Credentials -> OAuth client ID.
Select "Web application" as the application type.
Add http://localhost:3000/auth/google/callback to the "Authorized redirect URIs".
Copy the Client ID and Client Secret and paste them into your .env file.

7.Run the Application:

Start the server:

node server.js

Open http://localhost:3000 in your browser.

Click "Login with Google" and follow the authentication flow.

After successful authentication, you will be redirected to your profile page.

Click "Logout" to return to the login page.

Project Structure
google-auth-app/
├── server.js
├── .env
├── package.json
├── package-lock.json
└── node_modules/
