"use client";

import { useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function Profile() {
  const { state, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <ProtectedRoute>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        {state.user && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <div className="bg-gray-100 p-3 rounded">{state.user.name}</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="bg-gray-100 p-3 rounded">{state.user.email}</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User ID
              </label>
              <div className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {state.user.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
