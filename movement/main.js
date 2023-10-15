import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.HemisphereLight(0x333333, 0x000000, 100)
light.position.set(25, 50, 5)
scene.add(light)
const lightHelper = new THREE.HemisphereLightHelper(light, 3);
scene.add(lightHelper)

const control = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x00aaff })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const animate = () => {
  control.update()
  mesh.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

document.addEventListener('keydown', ({ key }) => {
  switch (key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      mesh.position.y += 0.1
      break
    case 'arrowright':
    case 'd':
      mesh.position.x += 0.1
      break
    case 'arrowdown':
    case 's':
      mesh.position.y -= 0.1
      break
    case 'arrowleft':
    case 'a':
      mesh.position.x -= 0.1
      break
  }
})

animate()
