# Online Voting System

A React.js application for online voting with separate user and admin panels, styled with plain CSS.

## Setup

1. **Install Node.js**: Ensure Node.js is installed (download from [nodejs.org](https://nodejs.org)).
   ```bash
   node -v
   npm -v

Create Project:
bashnpx create-react-app voting-system
cd voting-system

Configure Files:

Replace src/ and public/ files with the provided code.
Update package.json as shown.


Install Dependencies:
bashnpm install

Run the Application:
bashnpm start
Open http://localhost:3000 in your browser.

Usage

User Login:

Username: e.g., 23BCS01
Password: kprcas123
Click a candidate card to vote (once only), then logout.


Admin Login:

Username: admin
Password: admin123
Add candidates with PNG images, remove candidates, view top 3 candidates and vote details, logout.



Features

User Panel: Login, view candidates (name and PNG image), vote by clicking a candidate card (once only).
Admin Panel: Add candidates with PNG file upload, remove candidates, view top 3 candidates and detailed vote report.
Data Persistence: Uses localStorage for candidates and votes.
Design: Black and violet theme with interactive animations (hover effects, transitions, vote animation).

text#### 5. Run the Application
Start the development server:
```bash
npm start
Open http://localhost:3000 in your browser.
6. Test the Application

User Flow:

Login with username: 23BCS01, password: kprcas123.
View candidates (added by admin, with names and PNG images).
Click a candidate card to vote (border turns green with animation, vote is registered).
See “You have already voted!” after voting.
Logout.


Admin Flow:

Login with username: admin, password: admin123.
Add a candidate (e.g., name: “John Doe”, upload a PNG file).
Remove a candidate if needed.
View top 3 candidates (e.g., “John: 5 votes, Jane: 3 votes, Alice: 2 votes”).
View vote details (e.g., “23BCS01 voted for John, 23BCS02 voted for Jane”).
Logout.



Design and Animation Features

Color Scheme:

Black (#1a1a1a): Background for the app and panels, creating a sleek, modern look.
Violet (#6a0dad): Accents for borders, buttons, and highlights, with a lighter shade (#9b59b6) for hover effects.
White (#ffffff): Text for readability.
Green (#00cc00): Success indicators (e.g., vote confirmation, add candidate).
Red (#ff4d4d): Error messages and logout/remove buttons.


Animations:

FadeIn: Panels and the app container fade in on load (opacity: 0 to 1).
SlideIn: Candidate cards slide in from below on render.
Vote Animation: Candidate card scales up briefly when clicked to vote.
Hover Effects: Panels, candidate cards, and buttons scale up and adjust shadows or colors on hover.
Transitions: Smooth transitions for button hover, panel hover, and input focus (border color changes).


Interactivity:

Candidate cards are clickable to vote, with a visual feedback animation (green border, scale effect).
Buttons have hover scaling and color changes for a tactile feel.
File input for PNG uploads is restricted to .png files, with error messages for invalid inputs.



Image Handling

PNG Upload: The admin panel uses a file input (<input type="file" accept="image/png">) to upload PNG images, converted to base64 strings using FileReader for storage in localStorage.
Validation: Only PNG files are accepted; an error message is shown for invalid files or missing name/image.
Storage: Images are stored as base64 strings in candidates array, ensuring persistence without a backend.
Fallback: If no image is available, https://via.placeholder.com/100 is used as a placeholder.

Single Vote Enforcement

The UserPanel checks votes[user.name] to ensure a user can only vote once.
Clicking a candidate card registers the vote immediately (no separate “Vote” button or checkbox).
After voting, the candidate grid is replaced with a “You have already voted!” message.

Notes

Security: This is a client-side app with localStorage and hardcoded credentials, unsuitable for production. For a real-world app, use a backend (e.g., Node.js with MongoDB) with hashed passwords and secure file storage.
Image Size: Base64-encoded images in localStorage can increase storage size significantly. For production, store images on a server or cloud service (e.g., AWS S3).
Report Format: The vote details report is a text block in a <pre> tag. If you need CSV or another format, please specify.
Charts: No charts are included as you didn’t request them. To add a bar chart for vote counts:
bashnpm install chart.js react-chartjs-2
Let me know if you want this integrated.
Browser Compatibility: The app uses FileReader for image uploads, supported in all modern browsers.

Troubleshooting

Styles Not Applying:

Ensure src/App.css is imported in src/App.js.
Check for typos in class names.
Clear browser cache or restart the server: npm start.


Image Upload Issues:

Ensure only PNG files are uploaded.
Check browser console for errors if images don’t display.


Module Not Found:

Run npm install to ensure dependencies are installed.


Port Conflict:

If localhost:3000 is in use, React will prompt to use another port (e.g., 3001).



Clarifications Needed
If you have additional requirements:

Do you want a backend for secure storage or server-side image handling?
Should I add a chart for the admin’s results (e.g., bar chart of votes)?
Do you need features like a voting deadline, input validation (e.g., unique candidate names), or a specific report format (e.g., CSV export)?
Are there specific design tweaks (e.g., different animations, violet shades)?