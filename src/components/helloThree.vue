<template>
  <div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
	name: 'HelloThreeJS',
	data(){
		return {
			scene: null,
			camera: null,
			renderer: null,
			light: null
		}
	},
	mounted(){
		let height = window.innerHeight;
		let width = window.innerWidth;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf0f0f0);
		this.camera = new THREE.PerspectiveCamera(60, width/height, 1, 10000);
		this.camera.position.set( 500, 800, 1300 );
		this.camera.lookAt( 0, 0, 0 );
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize( width, height );
		// const gridHelper = new THREE.GridHelper( 1000, 20 );
		// this.scene.add( gridHelper );
		this.scene.add(this.camera);
		document.body.appendChild( this.renderer.domElement );

		const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
		const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
		const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
		this.scene.add( rollOverMesh );

		this.renderer.render( this.scene, this.camera );
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
