import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)

const light = new THREE.HemisphereLight(0x000000, 0x272727, 250)
light.position.set(25, 50, 5)
scene.add(light)
const lightHelper = new THREE.HemisphereLightHelper(light, 3);
scene.add(lightHelper)

const mesh = new THREE.MeshStandardMaterial({ color: 0x00aaff })

class GenerateBar {
  constructor(index) {
    this.index = index
    const width = 2
    this.value = data[index]
    const height = this.value * 0.1 || 0.001
    const geometry = new THREE.BoxGeometry(width, height, width)
    this.bar = new THREE.Mesh(geometry, mesh)
    this.bar.position.x += (width + 1) * index - 14
    this.bar.position.y = height / 2 - 10
    scene.add(this.bar)
  }

  update() {
    scene.remove(this.bar)
    const width = 2
    if (this.value < data[this.index]) {
      ++this.value
      if (this.value > data[this.index])
        this.value = data[this.index]
    }
    else if (this.value > data[this.index]) {
      --this.value
      if (this.value < data[this.index])
        this.value = data[this.index]
    }
    const height = this.value * 0.1 || 0.001
    const geometry = new THREE.BoxGeometry(width, height, width)
    this.bar = new THREE.Mesh(geometry, mesh)
    this.bar.position.x += (width + 1) * this.index - 14
    this.bar.position.y = height / 2 - 10
    scene.add(this.bar)
  }
}


const generateData = () => Array.from({ length: 10 }).map(() => Math.floor(Math.random() * 100))
let data = generateData()
setInterval(() => data = generateData(), 3000)
const bars = data.map((_, index) => new GenerateBar(index))

const animate = () => {
  control.update()
  bars.forEach(bar => bar.update())
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
