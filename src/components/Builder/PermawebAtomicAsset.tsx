import React from 'react';
import { PermawebAtomicAsset } from '../PermawebAtomicAsset';
import { Component } from '@/types/builder';

interface PermawebAtomicAssetProps {
  component: Component;
  onPropertyChange: (key: string, value: any) => void;
}

export const BuilderPermawebAtomicAsset: React.FC<PermawebAtomicAssetProps> = ({
  component,
  onPropertyChange
}) => {
  return (
    <div className="relative w-full">
      <PermawebAtomicAsset
        assetId={component.props.assetId}
        assetIds={component.props.assetIds}
        onCreateAsset={(assetId) => onPropertyChange('assetId', assetId)}
        luaCode={component.props.luaCode}
      />
    </div>
  );
}; 