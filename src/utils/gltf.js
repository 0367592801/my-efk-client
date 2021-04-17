import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";

const getObjectFromFileUrl = async function (fileUrl) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      fileUrl,
      function (gltf) {
        const object = gltf.scenes[0].children[0];
        if (object) {
          const matrix = object.matrix;
          const zUpMatrix = new THREE.Matrix4().set(
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            -1,
            0,
            0,
            0,
            0,
            0,
            1
          );
          if (matrix.equals(zUpMatrix)) {
            object.lookAt(0, 0, 1);
            object.updateMatrix();
          }
          let animations = gltf.animations;
          let mixer = null;
          let clock = new THREE.Clock();
          if (animations && animations.length) {
            mixer = new THREE.AnimationMixer(object);
            for (let i = 0; i < animations.length; i++) {
              let animation = animations[i];
              mixer.clipAction(animation).play();
            }
          }
          if (mixer) mixer.update(clock.getDelta());
          resolve(object);
        }
      },
      function (xhr) {},
      function (err) {
        reject(err);
      }
    );
  });
};

export default getObjectFromFileUrl;
