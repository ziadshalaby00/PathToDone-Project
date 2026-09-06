# PathToDone

A lightweight, frontend-only task management web app for creating task lists, organizing tasks, and tracking progress — entirely in the browser.

## ✨ Features

* 📝 **Task Lists**

  * Create, rename, and delete task lists.
  * Each list keeps track of its total and completed tasks.

* ✅ **Task Management**

  * Add, edit, and delete tasks.
  * Mark tasks as completed or incomplete.
  * Mark tasks as important/starred.

* 🔍 **Task Search**

  * Search across all task lists from a dedicated search page.
  * Results are updated instantly while typing.
  * Each result shows the task's list for quick navigation.

* ⭐ **Quick Filters**

  * View all starred tasks in one place.
  * View all completed tasks in one place.

* 📊 **Task Filtering**

  * Filter tasks within a list by:

    * **All** — displays all tasks.
    * **Done** — displays completed tasks only.
    * **Not Done** — displays incomplete tasks only.
  * Pagination is calculated **after filtering**, so the number of pages always matches the filtered results.

* 📄 **Pagination**

  * Tasks are displayed in pages of **100 tasks**.
  * Pagination automatically adjusts when tasks are added, deleted, or filtered.

* 🌙 **Dark Mode**

  * Toggle between light and dark themes.
  * The selected theme is saved locally and restored automatically.

* 💾 **Persistent Local Storage**

  * All lists and tasks are stored in the browser using the **LocalStorage API**.
  * Data is shared between all pages through a single `listsInStorage` data source.
  * No account or backend is required.

* 📱 **Progressive Web App**

  * Includes a web app manifest.
  * Supports installation as a standalone application on supported browsers.
  * Uses a Service Worker for offline asset caching.

## 🛠️ Tech Stack

| Technology         | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| HTML5              | Semantic page structure                                  |
| CSS3               | Responsive design, layouts, and themes                   |
| Vanilla JavaScript | Application logic, DOM manipulation, and CRUD operations |
| LocalStorage API   | Client-side data persistence                             |
| Service Worker     | Asset caching and offline support                        |
| Web App Manifest   | PWA installation and configuration                       |
| Cloudflare Workers | Static asset deployment                                  |

## 📂 Project Structure

```text
PathToDone/
├── index.html          # Task lists page
├── index.js            # Task list management and navigation
├── index.css           # Task lists page styling
│
├── secondpage.html     # Tasks inside a selected list
├── secondpage.js       # Task management, filtering, and pagination
├── secondpage.css      # Task page styling
│
├── thirdpage.html      # Search and global task views
├── thirdpage.js        # Search and filtered task results
├── thirdpage.css       # Search/result page styling
│
├── theme.js            # Light/Dark theme toggle
├── material.css        # Material Symbols icon styling
│
├── sw.js               # Service Worker and caching
├── site.webmanifest    # PWA configuration
├── wrangler.toml       # Cloudflare Workers configuration
└── README.md
```

## 💾 Data Storage

PathToDone is completely frontend-only and does not require a database or server.

The application's main data is stored in LocalStorage under:

```text
listsInStorage
```

The data follows a structure similar to:

```javascript
{
    "listId": {
        "title": "My List",
        "date": "...",
        "ID": 123456789,
        "numTasks": 2,
        "ComTask": 1,
        "tasks": {
            "taskId": {
                "title": "My Task",
                "date": "...",
                "ID": 987654321,
                "isDone": false,
                "isStar": true
            }
        }
    }
}
```

Additional LocalStorage keys are used for page navigation and theme preferences.

> **Note:** Since data is stored locally in the browser, clearing the site's LocalStorage will remove the application's saved data.

## 📱 Responsive Design

The interface is designed to work across different screen sizes using CSS media queries.

The layout adapts typography and sidebar dimensions for:

* Very small screens
* Mobile devices
* Tablets
* Desktop screens

## 🚀 Running Locally

No build tools or package installation are required.

Simply serve the project using a local HTTP server.

For example, with Python:

```bash
python -m http.server
```

Then open the application in your browser.

> Using a local HTTP server is recommended because Service Workers require a secure context such as HTTPS or `localhost`.

## ☁️ Deployment

The project can be deployed as a static site using Cloudflare Workers with the included `wrangler.toml` configuration.

The application contains no backend and only requires static file hosting.

## 🔐 Privacy

PathToDone does not require user accounts and does not send task data to a backend server.

Tasks and lists remain stored locally in the user's browser.

## 📄 License

Developed by [Ziad Shalaby](https://github.com/ziadshalaby00).

This project is licensed under the **MIT License**.
