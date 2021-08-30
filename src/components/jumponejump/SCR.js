import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

export default class SCR {
    constructor(width, height, container, animationGroup){
        this.width = width;
        this.height = height;
        this.container = container;
        this.animationGroup = animationGroup
        this.scene = null
        this.camera = null
        this.renderer = null;
        this.tween = null;
        this.currentCameraFocus = [0, 0, 0]
        this.targetCamerFoucs = [0, 0, 0]
        this.init()
    }

    init(){
        this.initScene();
		this.addCamera(this.scene)
		this.addRenderer(this.scene, this.camera)

        this.tween = new TWEEN.Tween({x: 0}, this.animationGroup).to({x: 10}, 1000)
        this.tween.onUpdate(this.animation.bind(this));
        this.tween.onComplete(this.stopAnimation.bind(this));
        // this.tween.easing(TWEEN.Easing.Quadratic.In);
        // this.tween.start();
    }

    initScene(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        return this.scene
    }

    addCamera(scene){
        this.camera = new THREE.PerspectiveCamera(60, this.width/this.height, 1, 10000);
        this.setCameraPositionAndFocus([0, 0, 0])
        scene.add(this.camera);
    }

    setCameraToSupporter(supporter){
        let position = supporter.getTopPosition();
        this.setCameraPositionAndFocus(position, true)
    }

    setCameraPositionAndFocus(cPosition, isAnimation = false){
        if (isAnimation) {
            this.targetCamerFoucs = cPosition
            this.tween.start()
        } else {
            let {position, focus} = this.getCameraParams(cPosition)
            this.camera.position.set( ...position );
            this.camera.lookAt( ...focus );
            this.currentCameraFocus = cPosition
        }
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

    animation(obj){
        let cPosition = [this.currentCameraFocus[0] + obj.x, this.currentCameraFocus[1], this.currentCameraFocus[2]]
        let {position, focus} = this.getCameraParams(cPosition)
        this.camera.position.set( ...position );
        this.camera.lookAt( ...focus );
        this.render()
    }

    stopAnimation(){
        this.currentCameraFocus = this.targetCamerFoucs
    }
}