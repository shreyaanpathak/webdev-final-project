// components/UserCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    membership: string;
  };
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-green-500/20 
               hover:border-yellow-500/50"
  >
    <Link to={`/Account/Profile/${user._id}`}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 
                      flex items-center justify-center text-2xl text-white font-bold">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-500">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-yellow-500/80">@{user.username}</p>
          <div className="flex gap-2 mt-1">
            <span className="text-xs px-2 py-1 rounded-full bg-green-900/20 text-green-500">
              {user.role}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-900/20 text-yellow-500">
              {user.membership}
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);
