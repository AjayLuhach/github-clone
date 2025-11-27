import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { FiCalendar } from 'react-icons/fi';

const UserInfoSection: React.FC = () => {
  const { user } = useProfile();

  if (!user) return null;

  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-white font-semibold mb-4">About</h2>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-400" />
          <span>
            Joined on <strong className="text-white">{joinedDate}</strong>
          </span>
        </div>
        {user.bio && (
          <div className="pt-2 border-t border-gray-700">
            <p className="text-gray-300">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoSection;
