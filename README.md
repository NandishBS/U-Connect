# U-Connect
'U-Connect' is short for 'UBDTians-Connect'.
It is a networking platform for UBDT College where students, lecturers, and alumni connect with one another. The platform allows users to share their valuable knowledge, stay updated with current developments, and exchange experiences from their academic and professional journeys. It provides an interactive space for meaningful engagement within the UBDT community.

## login credentials
This app is strictly for UBDTians, so no one outside our college can create an account or log in. To allow others to test the app, I have created testing accounts.
```bash
    usn : "testuser001"
    password : "testuser001"
```
```bash
    usn : "testuser002"
    password : "testuser002"
```
```bash
    usn : "testuser003"
    password : "testuser003"
```
using these usn and password anyone can login to this app. but they cannot test create account, forget password and otp verification.

## Web App link  [open website.](https://u-connect-ivory.vercel.app/)
```bash
https://u-connect-ivory.vercel.app/
```

## Problem we tried to solve
- Colleges often lack proper networking platforms.
- Interaction between teachers, students, and alumni typically takes place through WhatsApp, which requires sharing phone numbers.
- There is a need for a dedicated platform to share updates, notifications, experiences, and other important information.
- While a college website exists, it is rarely visited and is mainly used for specific purposes (e.g., paying fees). A more engaging and user-friendly app was needed.

## technologies used
- MongoDB (atlas)
- Mongoose
- Express js
- React js
- Redux (react-redux)
- Tailwind CSS

## libraries
- bcrypt
- cloudinary
- cookie-parser
- cors
- dotenv
- jsonwebtoken
- multer
- nodemailer
- axios
- prettier
- react-icons
- react-otp-input
- react-redux
- react-toastify

## implementations
### Recreation of the real world scenario
  - Two databases have been created to **replicate a real-world scenario**.
  - The College Database contains data of students and teachers and is entirely maintained by the college.
  - The U-Connect Database serves as the database for the "U-Connect" app.
  - The "U-Connect" app has only **read access to the College Database**.

 <div align="center" style="padding:10px">
    <img src="./readmeImages/database interaction.png" style="width:500px" /> 
 </div>

### Strict authentication
  - Every student has a unique USN assigned to them.
  - In college, each student’s email is registered against their respective USN.
  - When a student enters their USN, an **OTP is sent to the email** registered with that USN.
  - This ensures secure authentication, as only the rightful owner of the USN can receive the OTP.
  - Outsiders cannot create accounts, maintaining the exclusivity of the platform.

### Token based authentication, authorization and session Handling
- We use token-based authentication and authorization for secure access.
- Upon login, a new **access token and refresh token are issued and sent via secure cookies**, ensuring they cannot be misused.
- Access Token:
    - Short-lived with a lifespan of 30 minutes.
    - Used for **short-term session handling** and sent with each request.
- Refresh Token:
     - Long-lived with a lifespan of 2 days.
     - Allows users to **stay logged in without repeatedly entering credentials**.
- Refresh Token Rotation:
    - Each time a new access token is issued, the old refresh token is deactivated, and a new one is generated.
    - Enhances security by preventing token reuse.
    - If a user doesn’t use the app for more than 2 days, they need to log in again.
    - This setup ensures **secure and efficient session management** while maintaining a **good user experience**.

### Post Creation
- Users can create two types of posts:
    - Post
    - Project
- Posts:
    - Students:
         - Share achievements, certificates, and pictures (e.g., receiving awards or participating in college fests).
    - Teachers:
        - Post important videos, informational topics, facts, circulars, and notifications.
    - Alumni:
         - Share career experiences, job openings, and insights into industrial trends.
- Projects:
    - Everyone can showcase their projects for others to view and appreciate.
    - Provides a platform for sharing innovative ideas and collaboration opportunities.
- This system encourages sharing knowledge, experiences, and creativity among students, teachers, and alumni.

### Pagination
- Implemented pagination for fetching posts to **enhance performance and user experience**.
- Initially, the app loads the latest 20 posts.
- As users scroll to the end, the next 20 **posts are loaded dynamically.**
 - This approach ensures **faster data retrieval and reduces loading time**.

### Interactions on Posts
- Users can:
    - View posts.
    - Like or unlike posts.
    - View the list of users who liked a post.
    - Comment on posts and reply to comments.
    - Click on a username or USN to navigate to the user's profile.
    - Click on a profile picture to view it in detail.
- Users who uploaded a post can:
    - Edit the post.
    - Delete the post.
- This setup **enhances engagement and provides intuitive navigation and interaction features**.

### Profile
- On the profile page, users can:
    - View all their posts and projects.
    - See details such as profile picture, USN, full name, username, email, and bio.
    - Check their friend list and connect with others if they know them.
    - View friend status with that user:
        - Connected.
        - Not connected.
        - Connection invitation pending.
    - Send invitation to connect
    - accept invitations
    - reject inviations
    - disconnect if they want
    - Navigate to LinkedIn or GitHub profiles (if linked).
- If the profile belongs to the user:
    - They can edit all details in their profile.
    - View invitations they have sent or received.
    - See their list of connections.

### Search Feature
- On the search page, users can:
    - Search for other users by name, username, or USN.
    - Navigate to the user's profile and view their details.

## Schema Diagram
![schema diagram](/readmeImages/Schema%20diagram.png)
