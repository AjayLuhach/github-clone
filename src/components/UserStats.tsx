import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { FiBook, FiStar } from 'react-icons/fi';

const UserStats: React.FC = () => {
  const { user } = useProfile();

  if (!user) return null;

  const stats = [
    {
      icon: <FiBook className="w-5 h-5" />,
      label: 'Repositories',
      value: user.public_repos,
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      label: 'Gists',
      value: user.public_gists,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 border border-gray-700"
        >
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            {stat.icon}
            <span className="text-sm">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
