import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

export default class Skiper{
    constructor(scr, position, animationGroup = null){
        this.scr = scr;
        this.bottomPosition = position;
        this.animationGroup = animationGroup
        this.size = {width: 2, length: 2, height: 4}
        this.centerPosition = [this.bottomPosition[0], this.bottomPosition[1] + this.size.height / 2, this.bottomPosition[2]]
        this.geometry = null;
        this.material = null
        this.mesh = null;
        this.textureImage = require('../texture/dls.jpg');
        this.tween = null
        this.skipHight = 10
        // this.init()
    }

    init(){
        let scene = this.scr.getScene()
        const texture = new THREE.TextureLoader().load( this.textureImage );
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
		texture.needsUpdate = true;
        let size = this.size
        this.geometry = new THREE.BoxGeometry( size.width, size.height, size.length )
        // const geometry = new THREE.SphereGeometry(size.width,128,128);
        this.material = new THREE.MeshStandardMaterial( { map:texture, side: THREE.DoubleSide}  );//new THREE.MeshBasicMaterial( { color: 0xff0000, dithering: true }  );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.mesh.position.set( ...this.centerPosition );
        scene.add( this.mesh );

        this.tween = new TWEEN.Tween({r: 0, x: 0, y: 0}, this.animationGroup).to({r: Math.PI * 2, x: 10, y: Math.PI}, 1000)
        this.tween.onUpdate(this.animation.bind(this));
        this.tween.onComplete(this.stopAnimation.bind(this));
        this.tween.easing(TWEEN.Easing.Quadratic.In);
        
    }

    skip(){
        this.tween.start();
    }
    
    animation(obj){
        this.animating = true
        let height = Math.sin(obj.y) * this.skipHight
        let newPosition = [this.centerPosition[0] + obj.x, this.centerPosition[1] + height, this.centerPosition[2]]
        this.mesh.position.set( ...newPosition );
        this.mesh.rotation.z = obj.r
        // this.scr.render();
    }

    stopAnimation(){
        this.animating = false
    }
}
