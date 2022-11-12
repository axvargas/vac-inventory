import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn';
import SignInAdmin from '../pages/SignInAdmin';
import Layout from '../layout/Layout';
import Information from '../pages/Information';
import Employees from '../pages/Employees';
import NewEmployee from '../pages/NewEmployee';
import Notification from '../pages/Notification';
import EditEmployee from '../pages/EditEmployee';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import Unauthorize from '../pages/Unauthorize';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/admin" element={<SignInAdmin />} />
        <Route path="/unauthorized" element={<Unauthorize />} />
        {/* Private routes */}
        <Route element={<ProtectedRoute allowedRole='admin' />}>
          <Route path="/admin-app" element={<Layout admin={true} />}>
            <Route index element={<Employees />} />
            <Route path="new-employee" element={<NewEmployee />} />
            <Route path="edit-employee/*">
              <Route path=":id" element={<EditEmployee />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole='employee' />}>
          <Route path="/app" element={<Layout />}>
            <Route index element={<Notification />} />
            <Route path="information" element={<Information />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation