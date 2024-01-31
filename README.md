# Job List App

This is a simple job list application built using React and Redux Toolkit.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Gif](#gif)

## Overview

The Job List App is designed to showcase a list of jobs fetched from an json-server and displayed in a clean and organized manner. It uses React for the front end and Redux Toolkit for state management.

## Features

- Fetches job data from an json-server.
- Displays a loading spinner while data is being fetched.
- Handles errors gracefully, allowing users to retry fetching data.
- Provides a filtering option for the displayed jobs.
- Users can add a job from the "Add Job" page.

## Technologies

- **React:** A JavaScript library for building user interfaces.
- **Redux Toolkit:** State management library for React applications.
- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **JSON-Server:** A mock API server for rapid prototyping and development.
- **React Router DOM:** Declarative routing for React.js.
- **React Toastify:** A toast notification library for React applications.
- **Sass:** A popular CSS preprocessor to enhance styling capabilities.
- **UUID:** A library for generating unique identifiers.
- **React-Redux:** Official React bindings for Redux.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abou1205/job-list-app.git
   ```

2. Change into the project directory:

   ```bash
   cd job-list-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Run the development server:

```bash
npm run dev
```

Run the json-server:

```bash
npm run server
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Gif

![](/job.gif)

