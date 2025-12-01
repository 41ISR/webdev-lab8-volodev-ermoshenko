import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ItemsList from './pages/ItemsList';
import ItemDetail from './pages/ItemDetail';
import CreateItem from './pages/CreateItem';
import MyBids from './pages/MyBids';
import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            }
          />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route
            path="/create-item"
            element={
              <ProtectedRoute>
                <CreateItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bids"
            element={
              <ProtectedRoute>
                <MyBids />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
