# Boost

Boost is a full-stack productivity web application designed to help users manage their schedules and personal thoughts. It features a scheduling system with associated tasks and a digital diary for recording daily entries.

## 🚀 Features

* **User Authentication:** Secure login and protected routes using AuthGuard.
* **Schedule Management:** Create and view schedules.
* **Task Tracking:** Manage tasks associated with specific schedules.
* **Personal Diary:** Create multiple diaries.
* **Diary Pages:** Write and store individual pages within your diaries.
* **Responsive UI:** Built with Angular and Bootstrap 5.

## 🛠️ Tech Stack

### Frontend

* **Framework:** Angular 18
* **Styling:** Bootstrap 5, SCSS

### Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database/Auth:** Supabase

## 📂 Project Structure

```text
boost/
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── config/    # Supabase configuration
│   │   ├── controllers/
│   │   ├── routes/    # API routes (diary, login, page, schedule, task)
│   │   └── server.js  # Entry point
│   └── package.json
├── frontend/          # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── diary/
│   │   │   ├── home/
│   │   │   ├── schedule/
│   │   │   ├── tasks/
│   │   │   └── user-home/
│   └── package.json
└── README.md