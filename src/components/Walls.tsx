import * as THREE from 'three';
import { floorPlanData } from '../data/floorPlanData';

interface WallCreationResult {
  wallGroup: THREE.Group;
  wallMaterial: THREE.MeshStandardMaterial;
}

/**
 * Creates and returns a THREE.Group containing all the wall meshes for the floor plan.
 * This function correctly calculates the position, rotation, and dimensions for each wall
 * using BoxGeometry to provide realistic thickness.
 */
export function createWalls(): WallCreationResult {
  const wallGroup = new THREE.Group();

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x3A3A5A, // User requested wall color
    roughness: 0.8,
    metalness: 0.8,
  });

  const wallThickness = floorPlanData.wallThickness || 0.2;
  const wallHeight = floorPlanData.wallHeight;

  floorPlanData.walls.forEach(wallData => {
    const p1 = new THREE.Vector3(wallData.p1[0], 0, wallData.p1[1]);
    const p2 = new THREE.Vector3(wallData.p2[0], 0, wallData.p2[1]);

    const wallVector = new THREE.Vector3().subVectors(p2, p1);
    const wallLength = wallVector.length();

    const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial.clone());

    // Position wall at the midpoint between p1 and p2
    const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    wall.position.set(midpoint.x, wallHeight / 2, midpoint.z);

    // ✅ Correct rotation
    wall.rotation.y = Math.atan2(wallVector.z, wallVector.x);

    wall.castShadow = true;
    wall.receiveShadow = true;
    wallGroup.add(wall);
  });

  return { wallGroup, wallMaterial };
}
