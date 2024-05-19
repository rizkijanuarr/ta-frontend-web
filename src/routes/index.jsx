//import react
import React, { lazy, Suspense } from "react";

//import react router dom
import { Routes, Route } from "react-router-dom";

//import loader component
const Loader = lazy(() => import("../components/Loader.jsx"));

//import view Login
const Login = lazy(() => import("../views/Auth/Login.jsx"));

//import view regis
const Register = lazy(() => import("../views/Auth/Register.jsx"));

//import private routes
import PrivateRoutes from "../routes/PrivateRoutes.jsx";

//import view dashboard
const Dashboard = lazy(() => import("../views/Dashboard/Index.jsx"));

//import view permissions index
const PermissionsIndex = lazy(() => import("../views/Permissions/Index.jsx"));

//import view roles index
const RolesIndex = lazy(() => import("../views/Roles/Index.jsx"));

//import view role create
const RoleCreate = lazy(() => import("../views/Roles/Create.jsx"));

//import view role edit
const RoleEdit = lazy(() => import("../views/Roles/Edit.jsx"));

//import view users index
const UsersIndex = lazy(() => import("../views/Users/Index.jsx"));
const UserCreate = lazy(() => import("../views/Users/Create.jsx"));
const UserEdit = lazy(() => import("../views/Users/Edit.jsx"));

const PengaduanCategoriesIndex = lazy(() =>
  import("../views/PengaduanCategories/Index.jsx")
);
const PengaduanCategoriesIndexAll = lazy(() =>
  import("../views/PengaduanCategories/IndexAll.jsx")
);
const PengaduanCategoriesCreate = lazy(() =>
  import("../views/PengaduanCategories/Create.jsx")
);
const PengaduanCategoriesEdit = lazy(() =>
  import("../views/PengaduanCategories/Edit.jsx")
);

const PengaduanStatusIndex = lazy(() =>
  import("../views/PengaduanStatus/Index.jsx")
);
const PengaduanStatusIndexAll = lazy(() =>
  import("../views/PengaduanStatus/IndexAll.jsx")
);
const PengaduanStatusCreate = lazy(() =>
  import("../views/PengaduanStatus/Create.jsx")
);
const PengaduanStatusEdit = lazy(() =>
  import("../views/PengaduanStatus/Edit.jsx")
);

const PengaduanIndex = lazy(() => import("../views/Pengaduan/Index.jsx"));
const PengaduanIndexAll = lazy(() => import("../views/Pengaduan/IndexAll.jsx"));
const PengaduanEdit = lazy(() => import("../views/Pengaduan/Edit.jsx"));
const PengaduanCreate = lazy(() => import("../views/Pengaduan/Create.jsx"));
const PengaduanCreateAll = lazy(() =>
  import("../views/Pengaduan/CreateAll.jsx")
);

const UsersIdentityIndex = lazy(() =>
  import("../views/UsersIdentity/Index.jsx")
);
const UsersIdentityCreate = lazy(() =>
  import("../views/UsersIdentity/Create.jsx")
);
const UsersIdentityEdit = lazy(() => import("../views/UsersIdentity/Edit.jsx"));

// FORBRIDEN
const Forbidden = lazy(() => import("../views/Forbidden/Index.jsx"));

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      {/* route "/register" */}
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        }
      />

      {/* private route "/dashboard" */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/permissions" */}
      <Route
        path="/permissions"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PermissionsIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/roles" */}
      <Route
        path="/roles"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RolesIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/roles/create" */}
      <Route
        path="/roles/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RoleCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/roles/edit/:id" */}
      <Route
        path="/roles/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RoleEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users" */}
      <Route
        path="/users"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users/create" */}
      <Route
        path="/users/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UserCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users/edit/:id" */}
      <Route
        path="/users/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UserEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      <Route
        path="/users/identity"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIdentityIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      <Route
        path="/users/identity/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIdentityCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      <Route
        path="/users/identity/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIdentityEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories" */}
      <Route
        path="pengaduan/categories"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCategoriesIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/* private route "/categories" */}
      <Route
        path="pengaduan/categories/all"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCategoriesIndexAll />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories/create" */}
      <Route
        path="pengaduan/categories/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCategoriesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories/edit" */}
      <Route
        path="pengaduan/categories/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCategoriesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN/STATUS INDEX */}
      <Route
        path="pengaduan/status"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanStatusIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN/STATUS ALL */}
      <Route
        path="pengaduan/status/all"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanStatusIndexAll />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN/STATUS CREATE */}
      <Route
        path="pengaduan/status/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanStatusCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN/STATUS EDIT */}
      <Route
        path="pengaduan/status/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanStatusEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN INDEX */}
      <Route
        path="pengaduan"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN INDEX */}
      <Route
        path="pengaduan/all"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanIndexAll />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN INDEX
      <Route
        path="pengaduan/export"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanExport />
            </PrivateRoutes>
          </Suspense>
        }
      /> */}

      {/* PENGADUAN CREATE */}
      <Route
        path="pengaduan/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN CREATE */}
      <Route
        path="pengaduan/create/all"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanCreateAll />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* PENGADUAN EDIT */}
      <Route
        path="pengaduan/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PengaduanEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* route "/forbidden" */}
      <Route
        path="/forbidden"
        element={
          <Suspense fallback={<Loader />}>
            <Forbidden />
          </Suspense>
        }
      />
    </Routes>
  );
}
