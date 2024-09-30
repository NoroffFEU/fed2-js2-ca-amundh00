# Social Media Web Application

This project is a user-friendly social media web application where users can create, edit, and delete posts, interact with others via comments and reactions, and manage their profiles. Built with JavaScript and powered by the Noroff API, the app supports secure user authentication, real-time data fetching, and a smooth browsing experience across multiple views.

## Features

### User Authentication
- Secure user registration and login.
- Session management through an `authGuard` function, ensuring authenticated access to protected routes.

### Post Management
- Users can create new posts that include titles, body content, tags, and media (images).
- The homepage displays the latest 12 posts in a feed, each as clickable cards that navigate to a full post view.
- Posts can be edited and deleted by their creators with a user-friendly interface.

### Post Interactions
- Each post includes detailed information such as tags, comments, and reactions.
- Users can interact with posts by leaving comments and reacting to the content.

### Profile Management
- Users can view and manage their profiles, including personal information and their list of posts.
- Customizable profile with options to update avatar and other details.

### Dynamic Post Display
- Posts are fetched from the Noroff API and displayed dynamically as users interact with the app.
- Individual posts can be viewed in a detailed page when clicked, and users can return to the main feed.

### Error Handling
- Comprehensive error handling ensures the app remains user-friendly, even when API requests fail or other issues occur.

### Custom Routing
- The app uses a custom routing system, dynamically loading views based on the URL. This ensures efficient performance as only necessary resources are loaded when needed.

## Technologies Used

- **JavaScript**: The primary language for handling logic, API communication, and dynamic content updates.
- **HTML/CSS**: Provides the structure and styling for a responsive and user-friendly interface.
- **Noroff API**: A REST API (`https://v2.api.noroff.dev/`) used to fetch posts, user information, comments, and reactions.

## How to Use

1. **Register/Login**: Users must sign up or log in to access the app’s features.
2. **Create Posts**: After logging in, users can create posts by adding a title, body, tags, and media (image).
3. **View Posts**: The homepage displays the latest posts, where each post is clickable for full details.
4. **Edit/Delete Posts**: Users can edit or delete their own posts using the provided options on each post.
5. **Profile Management**: Users can manage their profiles and view all posts they've created.

## Project Overview

This project is designed to provide an intuitive, real-time social media experience where users can easily navigate through posts, manage their profiles, and interact with other users. It emphasizes ease of use, with a focus on performance through dynamic content loading and efficient API interaction.
