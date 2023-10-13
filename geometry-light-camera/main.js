import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

// ring
const ringGeometry = new THREE.RingGeometry(0, 0, 10)
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const ring = new THREE.Mesh( ringGeometry, ringMaterial )
ring.rotation.x = 5
ring.rotation.y = 3.2
scene.add( ring )

// light
const light = new THREE.PointLight(0xffffff, 30, 100_000)
light.position.setX(-5)
light.position.setZ(-3)
ring.add(light)

const pointLightHelper1 = new THREE.PointLightHelper(light, 0.2);
scene.add( pointLightHelper1 )


// cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00aaff })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.x = -3
scene.add(cube)

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffaa })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 0
scene.add(sphere)

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32)
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff0055 })
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.x = 3
scene.add(cylinder)

camera.position.z = 10

function animate() {
    control.update()
	requestAnimationFrame(animate)
    ring.rotation.z += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01
	renderer.render(scene, camera)
}

animate()
