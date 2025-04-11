# C3i_Antiragging

## Overview

The Anti-Ragging SOS Web Application is a React-based solution designed to help combat ragging in educational institutions. It is primarily intended for use by UGC (University Grants Commission) officials and Collage, offering real-time SOS monitoring, college data insights, and member management.

## Environment Setup

### Prerequisites

- Node.js (v20.13.1 recommended)
- npm
- React development environment

### Installation

1. Clone the repository

bash
git clone [repository-url]
cd anti-ragging-web

2. Install dependencies

bash
npm install

3. Configure environment variables

bash
cp .env.example .env

Edit the .env file with your configuration details

## Main Commands

bash

# Start the development server

npm start

# Build for production

npm run build

# Run tests

npm test

## Features

### For Colleges

- **Members Access**: View members and invite members also
- **Live SOS Access**: Monitor live SOS alerts in real-time.

### For UGC

- **Showing Colleges**: Browse colleges filtered by state and district.

## File Structure

anti-ragging-web/
├── src/
│ ├── assets/ # Images, fonts, and other static files
│ ├── components/ # Reusable React components
│ ├── context/ # React Context providers
│ ├── hooks/ # Custom React hooks
│ ├── redux/ # Redux state management
│ ├── pages/ # Pages
│ └── utils/ # Helper functions and utilities
├── node_modules/ # Project dependencies
├── .env.development # Environment variables
├── package.json # Project metadata and dependencies

## Support

For support, please contact blockchain@c3ihub.iitk.a
