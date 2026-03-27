# 🧩 Data Table System (React + Next.js + TanStack Table)

A reusable, server-driven data table system built with React and Next.js.
Focused on clean architecture, scalability, and real-world API integration.

---

## 🚀 Features

- 🔍 Server-side search (debounced)
- 🔃 Server-side sorting & pagination
- 🎯 Column-based filtering
- 📌 Sticky (pinned) columns
- ⚡ URL query state sync (nuqs)
- 🧱 Modular and reusable architecture
- 🔁 Table helpers for mapping logic
- 🌍 Centralized API & environment config
- ❗ Unified error handling & toast system

---

## 🏗️ Architecture

### UI Components

```txt
/components/data-table/
```

- `DataTable`
- `DataTableHeader`
- `DataTableBody`
- `TableToolbar`
- `TablePagination`
- `TableWrapper`

All components are **fully controlled via props**.

---

### Table Helpers

```txt
/helpers/table.helper.ts
```

Handles mapping between:

- Query → Table state
- Table state → Backend format

---

### API Layer

```txt
/lib/api/fetchJson.ts
```

- Centralized fetch wrapper
- Consistent error handling
- Safe JSON parsing

---

### Environment Config

```txt
/lib/config/env.ts
```

All environment variables are managed centrally.

---

### Feature Module (Users)

```txt
/modules/users-table/
```

- `useUsers` → data fetching hook
- `getUsers` → API logic
- `userColumns` → column definitions
- `userFilters` → filter config

---

## 🔄 Data Flow

```txt
URL (query params)
      ↓
nuqs (state sync)
      ↓
table helpers (mapping)
      ↓
useUsers (API hook)
      ↓
fetchJson (network layer)
      ↓
DataTable (render)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

### 4. Build for production

```bash
npm run build
```

---

### 5. Start production server

```bash
npm run start
```

---

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

Used as the base URL for API requests.

---

## 🧪 Available Scripts

```bash
npm run dev      # start development server
npm run build    # build for production
npm run start    # start production server
npm run lint     # run linter
```

---

## ❗ Error Handling

- API errors handled in `fetchJson`
- UI-safe messages via `getTableErrorMessage`
- Toast notifications via `useErrorToast`

---

## 🧠 Design Decisions

### Why server-side data?

- Better scalability
- Handles large datasets
- Matches real-world backend APIs

---

### Why separate helpers?

- Avoid duplicated logic
- Keep components clean
- Improve maintainability

---

### Why centralized env config?

- Prevent hardcoded values
- Easier environment management
- Safer production setup

---

## 📦 Reusability

This system can be reused for:

- users
- products
- orders
- any API-driven dataset

Only change:

- columns
- filters
- API function

---

## 🛠️ Tech Stack

- React
- Next.js
- TanStack Table
- TypeScript
- Tailwind CSS

---

## 👨‍💻 Author

**Yasin Yılmaz**
Frontend Developer (React & Next.js)

- GitHub: https://github.com/yasin-yilmaz
