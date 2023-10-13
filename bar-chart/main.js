import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

const light = new THREE.HemisphereLight(0x333333, 0x000000, 250)
light.position.set(25, 50, 5)
scene.add(light)
const lightHelper = new THREE.HemisphereLightHelper(light, 3);
scene.add(lightHelper)


const addBar = (value, index) => {
  const width = 2
  const height = value * 0.1 || 0.001
  let color
  if (value < 40)
    color = 0x88ddff
  else if (value < 70)
    color = 0x44bbff
  else
    color = 0x00aaff
  const geometry = new THREE.BoxGeometry(width, height, width)
  const mesh = new THREE.MeshStandardMaterial({ color })
  const x = new THREE.Mesh(geometry, mesh)
  x.position.x += (width + 1) * index - 10
  x.position.y = height / 2
  scene.add(x)
}

Array.from({ length: 10 })
  .map(() => Math.round(Math.random() * 100))
  .forEach((value, index) => addBar(value, index))


const animate = () => {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
