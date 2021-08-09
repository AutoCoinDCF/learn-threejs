import * as THREE from 'three';
// import * as OrbitControls from "three-orbitcontrols";
import TWEEN from '@tweenjs/tween.js'

export default class Supporter1{
    constructor(scr, position, animationGroup = null){
        this.scr = scr;
        this.animationGroup = animationGroup
        this.bottomPosition = position;
        this.downHight = 10
        this.size = {width: 6,length: 6,height: 2};
        this.centerPosition = [this.bottomPosition[0], this.bottomPosition[1] + this.size.height / 2, this.bottomPosition[2]]
        this.topPosition = [this.bottomPosition[0], this.bottomPosition[1] + this.size.height, this.bottomPosition[2]]
        this.geometry = null;
        this.material = null
        this.mesh = null;
        this.textureImage = require('../texture/dls.jpg');
        this.tween = null
        this.animating = false
        this.init()
    }

    init(){
        let scene = this.scr.getScene()
        let isAnimation = this.animationGroup ? true : false;
        if(isAnimation){
            let size = this.size

            let cPosition = [this.centerPosition[0], this.centerPosition[1] + this.downHight, this.centerPosition[2]]
            this.geometry = new THREE.BoxGeometry( size.width, size.height, size.length );
            const texture = new THREE.TextureLoader().load( this.textureImage );
            this.material = new THREE.MeshPhysicalMaterial( { map: texture, transparent: false}  );
            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.mesh.position.set( ...cPosition );
            this.mesh.receiveShadow = true;
            this.mesh.castShadow = true;
            scene.add(this.mesh)
            
            this.tween = new TWEEN.Tween({y: this.downHight}, this.animationGroup).to({y: 0}, 1000)
            this.tween.onUpdate(this.animation.bind(this));
            this.tween.onComplete(this.stopAnimation.bind(this));
            this.tween.easing(TWEEN.Easing.Quadratic.In);
            this.tween.start();

            // this.animation()
        } else {
            let size = this.size
            let cPosition = this.centerPosition
            this.geometry = new THREE.BoxGeometry( size.width, size.height, size.length );
            const texture = new THREE.TextureLoader().load( this.textureImage );
            this.material = new THREE.MeshPhysicalMaterial( { map: texture, transparent: false}  );
            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.mesh.position.set( ...cPosition );
            this.mesh.receiveShadow = true;
            this.mesh.castShadow = true;
            scene.add(this.mesh)
        }
        
    }

    animation(obj){
        this.animating = true
        let newPosition = [this.centerPosition[0], this.centerPosition[1] + obj.y, this.centerPosition[2]]
        this.mesh.position.set( ...newPosition );
        this.scr.render();
    }

    stopAnimation(){
        this.animating = false
    }

    getMesh(){
        return this.mesh
    }

    getCenterPosition(){
        return this.centerPosition
    }

    getBottomPosition(){
        return this.bottomPosition
    }

    getTopPosition(){
        return this.topPosition
    }
}