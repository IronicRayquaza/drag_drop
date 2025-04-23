import React, { useState, useEffect } from 'react';
import { usePermawebProvider } from '../providers/PermawebProvider';

interface ProfileProps {
  profileId?: string;
  walletAddress?: string;
  onCreateProfile?: (profileId: string) => void;
}

export const PermawebProfile: React.FC<ProfileProps> = ({
  profileId,
  walletAddress,
  onCreateProfile
}) => {
  const { libs, isConnected, error: providerError } = usePermawebProvider();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    description: '',
    thumbnail: '',
    banner: ''
  });

  useEffect(() => {
    if (libs && isConnected && (profileId || walletAddress)) {
      fetchProfile();
    }
  }, [libs, isConnected, profileId, walletAddress]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      let profileData;
      
      if (profileId) {
        console.log('Fetching profile by ID:', profileId);
        profileData = await libs.getProfileById(profileId);
      } else if (walletAddress) {
        console.log('Fetching profile by wallet address:', walletAddress);
        profileData = await libs.getProfileByWalletAddress(walletAddress);
      }
      
      console.log('Profile data:', profileData);
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!libs || !isConnected) {
      setError('Not connected to Arweave. Please connect your wallet first.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Creating profile with data:', formData);
      const newProfileId = await libs.createProfile(formData);
      console.log('Profile created with ID:', newProfileId);
      setProfile(await libs.getProfileById(newProfileId));
      onCreateProfile?.(newProfileId);
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!libs || !isConnected) {
      setError('Not connected to Arweave. Please connect your wallet first.');
      return;
    }
    if (!profileId) {
      setError('No profile ID provided for update');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Updating profile with data:', formData);
      await libs.updateProfile(formData, profileId);
      console.log('Profile updated successfully');
      setProfile(await libs.getProfileById(profileId));
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-4 text-center">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {providerError || 'Please connect your Arweave wallet to use this component.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {profile ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {profile.banner && (
            <div className="h-48 bg-gray-200">
              <img
                src={profile.banner}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {profile.thumbnail && (
                <img
                  src={profile.thumbnail}
                  alt={profile.displayName}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">{profile.displayName}</h2>
                <p className="text-gray-600">@{profile.username}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{profile.description}</p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={profileId ? handleUpdateProfile : handleCreateProfile}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">
            {profileId ? 'Update Profile' : 'Create Profile'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail URL
              </label>
              <input
                type="text"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Banner URL
              </label>
              <input
                type="text"
                value={formData.banner}
                onChange={(e) =>
                  setFormData({ ...formData, banner: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {profileId ? 'Update Profile' : 'Create Profile'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}; 