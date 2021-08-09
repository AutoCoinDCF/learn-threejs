import * as THREE from 'three';

export default class SCR {
    constructor(width, height, container){
        this.width = width;
        this.height = height;
        this.container = container
        this.scene = null
        this.camera = null
        this.renderer = null;
        this.init()
    }

    init(){
        this.initScene();
		this.addCamera(this.scene)
		this.addRenderer(this.scene, this.camera)
    }

    initScene(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        return this.scene
    }

    addCamera(scene){
        this.camera = new THREE.PerspectiveCamera(60, this.width/this.height, 1, 10000);
        this.setCameraPositionAndFocus(this.camera)
        scene.add(this.camera);
    }

    setCameraPositionAndFocus(camera){
        let {position, focus} = this.getCameraParams([0, 0, 0])
        camera.position.set( ...position );
        camera.lookAt( ...focus );
    }

    getCameraParams(meshPosition){
        let position = [meshPosition[0] - 10, meshPosition[1] + 10, meshPosition[2] + 10];
        let focus = meshPosition;
        return {position, focus}

    }

    addRenderer(scene, camera){
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize( this.width, this.height );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.antialias = true;
        this.container.appendChild( this.renderer.domElement );
        this.renderer.render( scene, camera );
    }

    render(){
        this.renderer.render( this.scene, this.camera );
    }

    getScene(){
        return this.scene
    }

    getCamera(){
        return this.camera
    }

    getRenderer(){
        return this.renderer
    }
}