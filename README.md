Step 1: Install VS Code & Node.js
Make sure you have:

VS Code installed
Node.js installed (check with node -v and npm -v)

Step 2: Open the Project in VS Code
Open VS Code.
Click File > Open Folder and select your project directory.

Step 3: Install Dependencies
In the terminal (Ctrl + ~), run:

npm install

Make sure you have required dependencies like:

npm install express passport passport-google-oauth20 dotenv

Step 4: Set Up the Google OAuth Credentials
Go to Google Cloud Console.
Create a new project.
Navigate to APIs & Services > Credentials.
Click Create Credentials > OAuth Client ID.
Configure OAuth consent screen (add email & app name).
Set redirect URI:
If running locally: http://localhost:3000/auth/google/callback
Copy Client ID and Client Secret.

Step 5: Run the Project
Start the server:

node server.js


Step 6: open 
http://localhost:3000/
in the browser.
