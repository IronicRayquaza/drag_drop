import React, { useState, useEffect } from 'react';
import { usePermawebProvider } from '../providers/PermawebProvider';

interface AtomicAssetProps {
  assetId?: string;
  assetIds?: string[];
  onCreateAsset?: (assetId: string) => void;
  luaCode?: string;
}

export const PermawebAtomicAsset: React.FC<AtomicAssetProps> = ({
  assetId,
  assetIds,
  onCreateAsset,
  luaCode
}) => {
  const { libs } = usePermawebProvider();
  const [asset, setAsset] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    topics: [''],
    creator: '',
    data: '',
    contentType: 'text/plain',
    assetType: '',
    metadata: {
      status: 'Initial Status'
    }
  });

  useEffect(() => {
    if (libs) {
      if (assetId) {
        fetchAsset();
      } else if (assetIds && assetIds.length > 0) {
        fetchAssets();
      }
    }
  }, [libs, assetId, assetIds]);

  const fetchAsset = async () => {
    if (!assetId) return;
    try {
      setLoading(true);
      setError(null);
      const assetData = await libs.getAtomicAsset(assetId);
      setAsset(assetData);
    } catch (err) {
      setError('Failed to fetch asset');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    if (!assetIds || assetIds.length === 0) return;
    try {
      setLoading(true);
      setError(null);
      const assetsData = await libs.getAtomicAssets(assetIds);
      setAssets(assetsData);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!libs) return;

    try {
      setLoading(true);
      setError(null);
      const newAssetId = await libs.createAtomicAsset(formData);
      setAsset(await libs.getAtomicAsset(newAssetId));
      onCreateAsset?.(newAssetId);
    } catch (err) {
      setError('Failed to create asset');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, '']
    });
  };

  const handleRemoveTopic = (index: number) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index)
    });
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...formData.topics];
    newTopics[index] = value;
    setFormData({
      ...formData,
      topics: newTopics
    });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {asset ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{asset.name}</h2>
          <p className="text-gray-700 mb-4">{asset.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {asset.topics.map((topic: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Metadata</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(asset.metadata, null, 2)}
            </pre>
          </div>
        </div>
      ) : assetIds && assetIds.length > 0 ? (
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{asset.name}</h2>
              <p className="text-gray-700 mb-4">{asset.description}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {asset.topics.map((topic: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleCreateAsset} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Create Atomic Asset</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Topics
              </label>
              <div className="space-y-2">
                {formData.topics.map((topic, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => handleTopicChange(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTopic}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Topic
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Creator Address
              </label>
              <input
                type="text"
                value={formData.creator}
                onChange={(e) =>
                  setFormData({ ...formData, creator: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <textarea
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content Type
              </label>
              <input
                type="text"
                value={formData.contentType}
                onChange={(e) =>
                  setFormData({ ...formData, contentType: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Asset Type
              </label>
              <input
                type="text"
                value={formData.assetType}
                onChange={(e) =>
                  setFormData({ ...formData, assetType: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Asset
            </button>
          </div>
        </form>
      )}
    </div>
  );
}; 