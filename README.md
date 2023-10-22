<p>
    <img src="https://storage.googleapis.com/passage-docs/passage-logo-gradient.svg" alt="Passage logo" style="width:150px;"/>
    <img src="https://bookface-images.s3.amazonaws.com/logos/f193d070e480ede387ee00a9006482bee4a6b8dd.png" alt="Women Who Code logo" style="width:150px;"/>
<img width="10593" alt="logo" src="https://github.com/thrive-her/thrive-her-mvp/assets/112290188/1e00aec3-cdcc-4676-8e26-56c593fdf5d8" style="width:150px;">
</p>

# ThriveHer - Women Who Code Hackathon for Social Good 2023

[Hackathon Website](https://hopin.com/events/wwcode-hackathon-for-social-good/registration)

## Overview

Our project addresses the challenge of providing a safe and tailored community forum for women to discuss our unique challenges such as perinatal and postpartum support, parenting, fertility, body image, and mental health. It offers features like user registration, discussion boards, 1-1 therapy access, crisis support, and expert talks, creating a nurturing environment. This solution benefits society by addressing women’s emotional and mental health needs, reducing stigmas, and empowering women to seek support. The chosen tech stacks, including React for an interactive interface, Passage Authentication for enhanced security and user-friendliness, and Express and Node for scalability, play a crucial role in making this platform a secure, accessible, and supportive space for women.

## How does it work?

This guide will walk you through how to use our platform effectively. Our solution is built with React for an interactive interface, Passage Authentication for enhanced security and user-friendliness, and Express and Node for scalability. Once you've logged in, you can access four main pages: Forum, Events, Crisis Text Line, and Therapy. Let's get started!

## Demo: 

### Section 1: Logging In

1.1. Open your web browser and navigate to our platform's URL.

1.2. Click on the "Login" button.

1.3. Enter your registered email address, first name, and last name.

1.4. Set up your profile by either using a passkey or a magic code.

1.5 Click the "Log In" button.

### Section 2: Navigating the Platform

2.0. Dashboard 

Once you log in, you'll land on the home page. Here you can have an overview of who we are and what our platform offers. You will be able to choose to Forum Page, Events Page, Therapy Page, or Text Crisis Line (external). 

2.1. Forum Page:

You'll land on the Forum page. Here, you can join discussions, share experiences, and seek advice from the community.

2.2. Events Page:

The Events page lets you stay updated on upcoming events, expert talks, and webinars.

2.3. Crisis Text Line:

If you require immediate support, click on the "Crisis Text Line" page. 

2.4. Therapy Page:

The Therapy page provides access to tailored 1-on-1 therapy sessions. 

### Section 3: Account Settings

3.1. To access your profile, click on the profile button at the top-right corner.

### Section 4: Logging Out

4.1. To log out, click on the logout button at the top-right corner.

### User Map(Current + Future Roadmap)
![flow diagram Thrive HER](https://github.com/thrive-her/thrive-her-mvp/assets/112290188/548b6f2d-7a7c-494d-aa3b-969babd9433e)


## Technology: 
This project was built utilizing a combination of React, Passage Authentication, Express, Node, and Supabase. 

## Passage

Passage is a authentication as a service platform that allows you to provide passwordless authentication to your users without having to worry about the initial setup and continuous maintenance high quality authentication requires. 

To get started with the boilerplate you'll first need to set up a Passage app. You can do this by visiting [console.passage.id](console.passage.id) or following our [quickstart guide](https://docs.passage.id/getting-started/quickstart#create-an-app-in-the-passage-console). 

You can reach out to the team for support via [Discord](https://discord.com/invite/445QpyEDXh).

![Alt text](<Screenshot 2023-10-02 at 6.46.04 PM.png>)

---

# Installation

1. Clone the product locally
2. On GitHub, navigate to the repo for your cohort’s project (you’re probably there right now), then:
3. Click on the "Code" tab. It may already be selected.
4. Click the green "Code" button to reveal a "Clone" popup.
5. The "HTTPS" tab should be automatically selected. If not, click "HTTPS."
6. Click the copy button to copy the url of this repository to your clipboard. screenshot of "Code" tab on GitHub
7. From your terminal, cd into the directory where you want this project to live. screenshot of how to navigate folders in terminal
8. Once you’re in the directory, type git clone followed by the web URL you just copied to your clipboard from GitHub. Then cd into the directory that is created.

### Configure Your Environment Variables

1. Add a .env file to both the frontend and backend directories
2. Add variables (PASSAGE_APP_ID and PASSAGE_API_KEY) for each .env file with your own Passage App ID and API Key. You can get these from the [Passage Console](https://console.passage.id).

## Install Dependencies & Run Backend/Frontend

```bash
npm run bootstrap
```

Start the express server

```bash
npm run start-backend
```

Start the React application

```bash
npm run start-frontend
```

The application will run on http://localhost:3000, which you can navigate to in your browser.
