"use client";

import { useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import Link from "next/link";

export default function Profile() {
  const { state, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <ProtectedRoute>
      <div className="font-montserrat max-w-lg mx-auto mb-56 mt-10 p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Profile</h2>
        {state.user && (
          <div className="space-y-6">
            {/* Profile Information Section */}
            <div className="flex items-center space-x-4">
              {/* Profile Icon or Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {state.user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Name and Email */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {state.user.name}
                </h3>
                <p className="text-sm text-gray-500">{state.user.email}</p>
              </div>
            </div>
            <Link href="/decks/decklist">decklist</Link>
            <Link href="/stats">stats</Link>
          </div>
          
        )}
      </div>
    </ProtectedRoute>
  );
}
