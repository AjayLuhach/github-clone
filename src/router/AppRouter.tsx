import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from '../context/ProfileContext';
import LayoutTopNav from '../components/LayoutTopNav';
import ProfilePage from '../pages/ProfilePage';
import RepositoriesPage from '../pages/RepositoriesPage';
import ProjectsPage from '../pages/ProjectsPage';
import PackagesPage from '../pages/PackagesPage';
import profileConfig from '../config/profileConfig.json';
import StarPage from '../pages/StarPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <LayoutTopNav />
        <div className="">
          <Routes>
          <Route
            path="/"
            element={<Navigate to={`/profile/${profileConfig.defaultUsername}`} replace />}
          />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/profile/:username/repositories" element={<RepositoriesPage />} />
          <Route path="/profile/:username/projects" element={<ProjectsPage />} />
          <Route path="/profile/:username/packages" element={<PackagesPage />} />
          <Route path="/profile/:username/stars" element={<StarPage />} />
          <Route
            path="*"
            element={<Navigate to={`/profile/${profileConfig.defaultUsername}`} replace />}
          />
        </Routes>
        </div>
      </ProfileProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
