# Game Achievement Tracker for Steam
This project is my semester-long assignment for the Database Systems course. It’s a web application that connects to the Steamworks Web API to display visual insights into game achievements and playtime stats for Steam users. Built with the MERN stack (MongoDB, Express, React, and Node.js), the app lets users track their progress and compare achievements with others. The focus is on creating a user-friendly and visually engaging experience while applying concepts from both database management and full-stack development. This project combines my academic learning with my interest in gaming.

## Features 

### **1. Login Page**  

![Login Page](README_Images/login_page.png "Login Page")

- **Details**:  
  - Enter a valid username and password.  
  - Complete a CAPTCHA for security.  
- **Purpose**: Ensures secure access to your account.  

---

### **2. Sign Up Page**  
![Sign Up Page](README_Images/sign_up_page.png "Sign Up Page")
- **Details**:  
  - Choose a unique username.  
  - Provide a valid Steam ID (validated via an API call).  
  - Password must have a minimum length of 4 characters.  
  - **Note**: Usernames starting with "admin" are not allowed.  


---


### **3. Main Dashboard Page**  
![Main Dashboard Page](README_Images/main_dashboard_page.png "Main Dashboard Page")
- **Overview**: Your hub for all things gaming.  
  - **User Information**:  
    - Displays your profile, reputation, and social handles (Discord, Twitter, Facebook, Steam).  
  - **Chat Box**:  
    - Chat with your friends.  
    - Add new friends by searching for their username.  
  - **Games Overview**:  
    - View all games you own, along with their completion percentages.  
    - Click a game to view its unlocked achievements.  
    - Search for specific games on the dashboard.  


---


### **4. Forum/Reviews Page**  
![Forum/Reviews Page](README_Images/forum_reviews_page.png "Forum/Reviews Page")
- **Details**:  
  - Share your reviews about games and achievements.  
  - Engage with the gaming community by reading and posting reviews.  


---


### **5. Analytics Page**  
![Analytics Page](README_Images/analytics_page.png "Analytics Page")
- **Details**: A detailed breakdown of your gaming stats.  
  - Shows:  
    - Username.  
    - Total achievements.  
    - Average completion percentage.  
    - Total and average playtime.  
    - Reviews posted and scores.  
    - Reputation level.  
    - Lifetime stats:  
      - Total games attempted.  
      - Games supporting achievements.  
      - All games with their individual stats in a tabular format.  


---


### **6. User Settings Page**  
![User Settings Page](README_Images/user_settings_page.png "User Settings Page")
- **Details**:  
  - Update your details like password and profile picture.  
  - Username cannot be edited (ensures uniqueness).  


---


### **7. Admin Page**  
![Admin Page](README_Images/admin_page.png "Admin Page")
- **Details**:  
  - **Admin Privileges**:  
    - Delete user accounts from the platform.  
    - Delete reviews posted by users.  
  - **Admin Limitations**:  
    - Only one admin exists on the platform.  
    - No new admin accounts can be created.  
  - **Username Restriction**:  
    - If a user attempts to sign up with a username starting with "admin," the system will reject the signup attempt.  


---


## **User Journey**  


### **Step 1: Sign Up**  
1. Navigate to the Sign Up page.  
2. Choose a unique username.  
3. Enter your Steam ID (validated automatically).  
4. Set a password with at least 4 characters.  
5. Submit and start your journey!  


### **Step 2: Log In**  
1. Go to the Login page.  
2. Enter your username and password.  
3. Complete the CAPTCHA to verify.  
4. Welcome to the dashboard!  


### **Step 3: Explore the Dashboard**  
- View your game stats and achievements.  
- Chat with friends and add new ones.  
- Search for games and check your progress.  


### **Step 4: Post and Read Reviews**  
- Share your thoughts about games on the Forum/Reviews page.  
- Read reviews from other users.  


### **Step 5: Analyze Your Gaming Stats**  
- Visit the Analytics page for a detailed breakdown of your achievements, playtime, and more.  


### **Step 6: Update Your Profile**  
- Head to the User Settings page to update your password or profile picture anytime.  


### **Step 7: Admin Privileges**  
- The admin can manage the platform efficiently by removing unwanted user accounts and reviews.

## Contributers
*BSCS23109* - **Muhammad Abdullah Amin**  
*BSCS23016* - **Muhamamd Subhan Amir**  
*BSCS23082* - **Bilal Haroon**  







