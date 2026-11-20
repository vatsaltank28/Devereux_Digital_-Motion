import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Four point concave star ("astroid" family): |x|^(2/e) + |y|^(2/e) = 1 sampled parametrically.
 * e = 3 is the classic astroid; slightly lower values give the fuller, rounder tips seen in the reference.
 */
export function starShape(exponent = 2.7, samples = 240): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = Math.sign(c) * Math.abs(c) ** exponent;
    const y = Math.sign(s) * Math.abs(s) ** exponent;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

/** Thick, heavily bevelled extrusion so the chrome catches broad highlights (smooth creased normals). */
export function createChromeStarGeometry(): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(starShape(2.95, 300), {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.16,
    bevelSegments: 12,
    curveSegments: 1,
    steps: 1,
  });
  geo.center();
  return toCreasedNormals(geo, Math.PI / 4.5);
}

/** Flat star used as the small white billboard at the centre of the particle sphere. */
export function createFlatStarGeometry(): THREE.BufferGeometry {
  return new THREE.ShapeGeometry(starShape(3, 120));
}
