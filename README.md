Login and Signup Application with Chat Integration
This project is a React-based application that demonstrates user authentication and chat functionality using Supabase and WebRTC technologies. It includes components for login, signup, chat, and navigation. The app is styled using Material-UI.

Features
Authentication
Users can sign up and log in using their email and password.

Password validation and error handling for authentication are integrated.

WebRTC Chat
The chat functionality is implemented using WebRTC.

The app supports initiator and responder roles for peer-to-peer communication.

State Management
Zustand is used for managing signaling and message states.

Project Structure
src
├── components
│   ├── Login.js
│   ├── Signup.js
│   ├── Navbar.js
│   ├── Chat.js
│   ├── ConnectionManager.js
│   ├── ChatHistory.js
│   ├── MessageInput.js
│   ├── Profile.js
├── SupabaseClient.js
├── stores
│   ├── signalingStore.js
│   ├── messageStore.js

Component Breakdown

Login Component (Login.js)

Description: Handles user login.

Key Features:

Login with email and password using Supabase.

Signup Component (Signup.js)

Description: Handles user registration.

Key Features:

Sign up users and send confirmation emails using Supabase.

Navbar Component (Navbar.js)

Description: Provides navigation links for the app.

Key Features:

Supports both desktop and mobile navigation.

Chat Component (Chat.js)

Description: Implements WebRTC-based chat functionality.

Key Features:

Manage initiator and responder roles.

Send and receive messages using WebRTC.

Connection Manager (ConnectionManager.js)

Description: Manages WebRTC connections and signaling data.

Key Features:

Create initiator and responder peers.

Debugging utilities for WebRTC connections.

State Management

Signaling Store (signalingStore.js)

Purpose: Stores and manages WebRTC signaling data.

Key Functions:

setSignalData(data): Updates signaling data.

setPeerId(id): Sets the peer ID.

Message Store (messageStore.js)

Purpose: Manages chat messages.

Key Functions:

addMessage(message): Adds a new message to the store.

Known Issues

WebRTC requires a stable network connection and may not work in restricted environments.
signup confirmation always for some reason yet unknown during development 
some pages are yet to be develop.