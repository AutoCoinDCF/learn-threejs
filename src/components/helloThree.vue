<template>
  <div>
  </div>
</template>

<script>
import * as THREE from 'three';
import * as OrbitControls from "three-orbitcontrols"

export default {
	name: 'HelloThreeJS',
	data(){
		return {
			height: 0,
			width: 0,
			scene: null,
			camera: null,
			renderer: null,
			light: null,
			lightHelper: null,
			shadowCameraHelper: null
		}
	},
	methods:{
		initScene(){
			this.scene = new THREE.Scene();
			this.scene.background = new THREE.Color(0xf0f0f0);
			return this.scene
		},
		addCamera(scene){
			this.camera = new THREE.PerspectiveCamera(60, this.width/this.height, 1, 10000);
			this.camera.position.set( 500, 800, 1300 );
			this.camera.lookAt( 0, 0, 0 );
			scene.add(this.camera);
		},
		addRenderer(scene, camera){
			this.renderer = new THREE.WebGLRenderer({antialias: true});
			this.renderer.setSize( this.width, this.height );
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			document.body.appendChild( this.renderer.domElement );
			this.renderer.render( scene, camera );
		},
		addPlane(scene){
			let material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
			let geometry = new THREE.PlaneGeometry( 2000, 2000 );
			let mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, - 1, 0 );
			mesh.rotation.x = - Math.PI * 0.5;
			mesh.receiveShadow = true;
			scene.add( mesh );
		},
		addMesh(scene){
			const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
			const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0x808080, dithering: true }  );
			const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
			rollOverMesh.receiveShadow = true;
			rollOverMesh.castShadow = true;
			scene.add( rollOverMesh );
		},
		addLight(scene){
			const spotLight = new THREE.SpotLight( 0xffffff, 1 );
			spotLight.position.set( 100, 100, 100 );
			spotLight.angle = Math.PI / 4;
			spotLight.penumbra = 0.1;
			spotLight.decay = 2;
			spotLight.distance = 300;

			spotLight.castShadow = true;
			spotLight.shadow.mapSize.width = 512;
			spotLight.shadow.mapSize.height = 512;
			spotLight.shadow.camera.near = 10;
			spotLight.shadow.camera.far = 2000;
			spotLight.shadow.focus = 1;
			scene.add( spotLight );
			this.lightHelper = new THREE.SpotLightHelper( spotLight );
			scene.add( this.lightHelper );
			this.shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
			scene.add( this.shadowCameraHelper );
			var light = new THREE.AmbientLight( 0xffffff );

			scene.add( light ); 
		}
	},
	mounted(){
		this.height = window.innerHeight;
		this.width = window.innerWidth;
		this.initScene();
		this.addCamera(this.scene)
		this.addRenderer(this.scene, this.camera)
		this.addPlane(this.scene)
		this.addMesh(this.scene)
		this.addLight(this.scene)
		
		
		const controls = new OrbitControls( this.camera, this.renderer.domElement );
		controls.addEventListener( 'change', render.bind(this) );
		controls.minDistance = 20;
		controls.maxDistance = 500;
		controls.enablePan = false;

		const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
		this.scene.add( ambient );

		
		
		

		

		function render() {

			this.lightHelper.update();

			this.shadowCameraHelper.update();

			this.renderer.render( this.scene, this.camera );

		}
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
