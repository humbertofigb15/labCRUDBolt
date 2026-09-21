# VERA — User Management CRUD

## Project Overview

This is a CRUD (Create, Read, Update, Delete) application for managing users in the **VERA challenge**. It allows administrators to create, view, edit, delete, search, and filter platform users — all within a clean, professional enterprise SaaS interface.

The application simulates a backend using **localStorage** as a persistent data store. No external services (Supabase, Firebase, Stripe, auth providers) are required.

---

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library for building component-based interfaces |
| **TypeScript** | Static typing for safer, more maintainable code |
| **Vite** | Fast dev server and build tool |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Lucide React** | Icon library (lightweight, tree-shakeable) |
| **localStorage API** | Simulated database — persists data across browser refreshes |

No Next.js, no external backend, no paid services.

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx        # Shell: sidebar + topbar + content area
│   ├── ui/                      # Reusable, domain-agnostic UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── EmptyState.tsx
│   └── users/                   # User-specific composite components
│       ├── PageHeader.tsx
│       ├── StatCard.tsx
│       ├── UsersToolbar.tsx
│       ├── UsersTable.tsx
│       ├── UserRow.tsx
│       ├── UserFormModal.tsx
│       ├── UserDetailsModal.tsx
│       ├── DeleteConfirmationModal.tsx
│       ├── StatusBadge.tsx
│       └── RoleBadge.tsx
├── pages/
│   └── UsersPage.tsx            # Main dashboard page — composes everything
├── services/
│   └── userService.ts           # CRUD operations backed by localStorage
├── hooks/
│   └── useUsers.ts              # State management + CRUD orchestration
├── types/
│   └── user.ts                  # User, UserRole, UserStatus, UserFormData
├── utils/
│   ├── validation.ts            # Form validation helpers
│   ├── formatting.ts            # Date + initials formatting helpers
│   └── id.ts                    # ID generation helper
├── data/
│   └── mockUsers.ts             # Seed data — 8 realistic mock users
├── App.tsx                      # Root component
├── main.tsx                     # React DOM entry point
└── index.css                    # Global Tailwind directives + custom styles
```

---

## Architecture

The application follows a **layered separation of concerns**:

```
Pages (composition + state orchestration via hooks)
        ↓ calls
Hooks (business logic + React state)
        ↓ calls
Services (data access — localStorage)
        ↓ reads/writes
localStorage (simulated database)
```

### Layer Responsibilities

| Layer | Responsibility |
|-------|---------------|
| **pages/** | Top-level views that compose components together. Wire hooks to components. No direct data access. |
| **components/layout/** | Structural shell — sidebar, topbar, content container. No business logic. |
| **components/ui/** | Generic, reusable primitives (Button, Input, Modal, Badge). Domain-agnostic — could be reused in any app. |
| **components/users/** | User-specific composite components built from UI primitives. Contain presentation logic for the users domain. |
| **services/** | Data-access layer. `userService.ts` encapsulates all localStorage operations. Components never touch localStorage directly. |
| **hooks/** | Custom React hooks that manage state and orchestrate service calls. The bridge between UI and data. |
| **types/** | Shared TypeScript interfaces and type aliases. Imported across all layers. |
| **utils/** | Pure helper functions — validation, formatting, ID generation. No side effects. |
| **data/** | Seed/mock data used to initialize localStorage on first load. |

---

## Data Model

Defined in `src/types/user.ts`:

```typescript
type UserRole = "Admin" | "Manager" | "User";
type UserStatus = "Active" | "Inactive";

interface User {
  id: string;           // e.g. "USR-001"
  name: string;
  email: string;
  role: UserRole;
  area: string;
  status: UserStatus;
  createdAt: string;    // ISO date "YYYY-MM-DD"
}

interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  area: string;
  status: UserStatus;
}
```

### Example User

```json
{
  "id": "USR-001",
  "name": "Mariana López",
  "email": "mariana.lopez@vera.com",
  "role": "Admin",
  "area": "Compliance",
  "status": "Active",
  "createdAt": "2026-09-21"
}
```

---

## CRUD Flow

| Operation | Trigger | Service Call | Result |
|-----------|---------|-------------|--------|
| **Create** | Click "+ Add User" → fill form → "Create User" | `userService.createUser(data)` | New user added to list + localStorage |
| **Read** | Page load | `userService.getUsers()` | All users loaded into state |
| **Update** | Click "Edit" on a row → modify form → "Save Changes" | `userService.updateUser(id, data)` | User updated in list + localStorage |
| **Delete** | Click "Delete" → confirm in dialog → "Delete User" | `userService.deleteUser(id)` | User removed from list + localStorage |

### Flow Detail

1. `useUsers` hook calls `userService.getUsers()` on mount.
2. Users are stored in React state and rendered by `UsersTable`.
3. **Create**: `UserFormModal` opens → user submits → `userService.createUser()` → hook refreshes state → success toast.
4. **Edit**: `UserFormModal` opens pre-filled → user saves → `userService.updateUser()` → hook refreshes state → success toast.
5. **Delete**: `DeleteConfirmationModal` opens → user confirms → `userService.deleteUser()` → hook refreshes state → success toast.
6. **View**: `UserDetailsModal` opens showing all user fields in a read-only panel.

---

## Data Persistence

The application uses **localStorage** as a simulated database:

- **Storage key**: `vera_users`
- On first load, if no data exists in localStorage, the 8 mock users from `src/data/mockUsers.ts` are seeded automatically.
- Every create/update/delete operation writes the full updated list back to localStorage.
- Data persists across browser refreshes, tab closures, and restarts.
- The service layer is the **only** code that touches localStorage — making it trivial to swap for a real API later.

---

## Validation

Form validation rules enforced in `src/utils/validation.ts`:

| Field | Rule |
|-------|------|
| **Full Name** | Required. Must not be empty. |
| **Email** | Required. Must match a valid email format (`name@domain.tld`). |
| **Role** | Required. Must be one of: Admin, Manager, User. |
| **Area** | Required. Must not be empty. |
| **Status** | Required. Must be one of: Active, Inactive. |

Validation runs on form submit. Errors are displayed inline under each field. The form cannot be submitted until all validations pass.

---

## Component Reusability

### UI Primitives (reusable across any project)

| Component | Reuse |
|-----------|-------|
| `Button` | Variants: primary, secondary, danger, ghost. Sizes: sm, md. |
| `Input` | Text input with label, error display. |
| `Select` | Dropdown with label, options, error display. |
| `Modal` | Overlay dialog with backdrop, ESC close, scroll lock. |
| `Badge` | Colored pill label — used for status and role badges. |
| `EmptyState` | Configurable empty placeholder with icon, title, description, action. |

### User Components (domain-specific, composed from primitives)

| Component | Purpose |
|-----------|---------|
| `AppLayout` | Page shell with sidebar + topbar. |
| `PageHeader` | Title, subtitle, and primary action button. |
| `StatCard` | KPI card with icon, label, value. |
| `UsersToolbar` | Search + role/status/area filters + clear button. |
| `UsersTable` | Table header + rows + responsive container. |
| `UserRow` | Single row with avatar, badges, actions menu. |
| `UserFormModal` | Create/edit form inside a modal. Shared for both operations. |
| `UserDetailsModal` | Read-only user details panel. |
| `DeleteConfirmationModal` | Destructive action confirmation. |
| `StatusBadge` | Colored badge for Active/Inactive. |
| `RoleBadge` | Colored badge for Admin/Manager/User. |

---

## Future Improvements

1. **Replace localStorage with a REST API**: The service layer abstracts data access. Swapping `userService.ts` to call a real backend (e.g. `fetch('/api/users')`) requires no changes to components or hooks.
2. **Add authentication**: Protect the dashboard with a login screen and role-based access control.
3. **Add pagination**: For large datasets, implement server-side or client-side pagination.
4. **Add sorting**: Allow clicking column headers to sort by name, email, date, etc.
5. **Add bulk actions**: Select multiple users for batch delete or status change.
6. **Add export**: Export the user list as CSV or PDF.
7. **Add audit trail**: Track who created/edited/deleted users and when.
8. **Add real-time updates**: Use WebSockets to sync changes across multiple browser tabs.
