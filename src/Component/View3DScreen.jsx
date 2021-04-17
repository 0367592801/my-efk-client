import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import * as THREE from "three";
import OrbitControls from "../utils/OrbitControls";
import "../utils/three";
import GLTFLoaer from "three-gltf-loader";
import getObjectFromBitData from "../utils/gltf";
import { withRouter } from "react-router-dom";

const View3DScreen = ({ sourceModel }, props) => {
  let [scene] = useState(new THREE.Scene());
  const sceneRef = useRef();

  const getCamera = (width, height) => {
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 2000);
    camera.position.set(200, 200, 200);
    return camera;
  };
  const initScene = () => {
    const width = sceneRef.current.offsetWidth;
    const height = sceneRef.current.offsetHeight;
    const camera = getCamera(width, height);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.3;

    // scene lights, background
    scene.background = new THREE.Color(0xf1f3f4);
    console.log("scene", scene);
    const ambientLight = new THREE.AmbientLight("#999");
    const pointLight = new THREE.PointLight("white", 0.5);
    pointLight.position.set(100, 100, 100);
    scene.add(ambientLight, pointLight, camera);
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(100, 100, 100).normalize();
    // scene.add(light);
    var light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light2);
    var light3 = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light3);
    // renderer
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);
    controls.update();
    // animate function

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    function onMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();

      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      var rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const object3D = scene.children.find(
        (child) => child.type === "Object3D"
      );
      let meshes = [];
      if (object3D) {
        object3D.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            meshes.push(object);
          }
        });
        // console.log(meshes);
        var intersects = raycaster.intersectObjects(meshes, true);
        if (intersects.length > 0) {
          var intersect = intersects[0];
          console.log(intersect);
        }
      }
    }

    window.addEventListener("mousedown", onMouseDown, false);
  };

  const initGLTF = () => {
    console.log(sourceModel);
    getObjectFromBitData(sourceModel)
      .then((obj) => {
        if (obj) {
          // obj.material = matObj;
          scene.add(obj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!scene || scene.children.length === 0) {
      initScene();
      initGLTF();
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="b3-scene"
        style={{ width: "100%", height: "calc(100vh)", overflow: "hidden" }}
        ref={sceneRef}
      ></div>
    </div>
  );
};

export default withRouter(View3DScreen);
