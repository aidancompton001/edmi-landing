import { useState, useCallback } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';

export type ARPlacementState = 'scanning' | 'readyToPlace' | 'placed';

interface MicroscopeARSceneProps {
  onStateChange: (state: ARPlacementState) => void;
  onModelLoaded: () => void;
}

const INITIAL_SCALE: [number, number, number] = [0.1, 0.1, 0.1];
const MIN_SCALE = 0.03;
const MAX_SCALE = 0.5;

export default function MicroscopeARScene({
  onStateChange,
  onModelLoaded,
}: MicroscopeARSceneProps) {
  const [placementState, setPlacementState] = useState<ARPlacementState>('scanning');
  const [scale, setScale] = useState<[number, number, number]>(INITIAL_SCALE);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  const handleTrackingUpdated = useCallback(
    (state: number, _reason: number) => {
      if (
        state === ViroTrackingStateConstants.TRACKING_NORMAL &&
        placementState === 'scanning'
      ) {
        setPlacementState('readyToPlace');
        onStateChange('readyToPlace');
      }
    },
    [placementState, onStateChange],
  );

  const handlePlaneSelected = useCallback(() => {
    setPlacementState('placed');
    onStateChange('placed');
  }, [onStateChange]);

  const handleDrag = useCallback((dragToPos: number[]) => {
    setPosition(dragToPos as [number, number, number]);
  }, []);

  const handlePinch = useCallback(
    (pinchState: number, scaleFactor: number) => {
      if (pinchState === 3) {
        // PINCH_END
        setScale((prev) => {
          const newVal = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev[0] * scaleFactor));
          return [newVal, newVal, newVal];
        });
      }
    },
    [],
  );

  const handleRotate = useCallback(
    (rotateState: number, rotationFactor: number) => {
      if (rotateState === 3) {
        // ROTATE_END
        setRotation((prev) => [prev[0], prev[1] - rotationFactor, prev[2]]);
      }
    },
    [],
  );

  const handleModelLoad = useCallback(() => {
    onModelLoaded();
  }, [onModelLoaded]);

  const microscopeModel = (
    <ViroNode
      position={position}
      scale={scale}
      rotation={rotation}
      dragType="FixedToWorld"
      onDrag={handleDrag}
      onPinch={handlePinch}
      onRotate={handleRotate}
    >
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroSpotLight
        position={[0, 5, 0]}
        direction={[0, -1, 0]}
        color="#ffffff"
        intensity={500}
        attenuationStartDistance={5}
        attenuationEndDistance={20}
        castsShadow={true}
        shadowOpacity={0.4}
        shadowMapSize={2048}
        shadowNearZ={0.1}
        shadowFarZ={10}
      />
      <Viro3DObject
        source={require('../../assets/models/Microscope.glb')}
        type="GLB"
        onLoadEnd={handleModelLoad}
      />
    </ViroNode>
  );

  return (
    <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
      <ViroAmbientLight color="#ffffff" intensity={300} />
      {placementState === 'readyToPlace' && (
        <ViroARPlaneSelector onPlaneSelected={handlePlaneSelected}>
          {microscopeModel}
        </ViroARPlaneSelector>
      )}
      {placementState === 'placed' && microscopeModel}
    </ViroARScene>
  );
}
