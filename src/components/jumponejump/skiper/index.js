import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

export default class Skiper{
    constructor(scr, position, events, animationGroup = null){
        this.scr = scr;
        this.bottomPosition = position;
        this.animationGroup = animationGroup ? animationGroup : new TWEEN.Group()
        this.events = events
        this.size = {width: 2, length: 2, height: 4}
        this.centerPosition = [this.bottomPosition[0], this.bottomPosition[1] + this.size.height / 2, this.bottomPosition[2]]
        this.geometry = null;
        this.material = null
        this.mesh = null;
        this.textureImage = require('../texture/dls.jpg');
        this.tween = null
        this.tweenDrop = null
        this.skipHight = 10;
        this.mark = 0
        this.skiperStatus = -1
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
        // this.scr.render()

        
        
    }

    setTween(){
        this.animationGroup.removeAll()
        this.tween = new TWEEN.Tween({r: 0, x: 0, y: 0}, this.animationGroup).to({r: Math.PI * 2, x: this.skipDistance, y: Math.PI}, 1000)
        this.tween.onUpdate(this.animation.bind(this));
        this.tween.onComplete(this.stopAnimation.bind(this));
        this.tween.easing(TWEEN.Easing.Quadratic.In);
    }

    setDropTween(height){
        this.tweenDrop = new TWEEN.Tween({y: height}, this.animationGroup).to({y: 0}, 100)
        this.tweenDrop.onUpdate(this.dropAnimation.bind(this));
        this.tweenDrop.onComplete(this.stopDropAnimation.bind(this));
        this.tweenDrop.easing(TWEEN.Easing.Quadratic.In);
    }

    skip(distance, supporterList){  // 0:失败， 1：成功且积分  2：成功但是不计分
        this.skipDistance = distance
        this.setTween(distance)
        let pointPosition = [this.centerPosition[0] + this.skipDistance, this.centerPosition[1], this.centerPosition[2]]
        this.skiperStatus = this.skipStatus(pointPosition, supporterList)
        if(this.skiperStatus === 0){
            this.setDropTween(2)
            
        }
        this.tween.start();
    }

    skipStatus(pointPosition, supporterList){
        let status = 0
        let length = supporterList.length;
        for(let i = 0; i < length; i++){
            let supporter = supporterList[i];
            let isIn = supporter.isPointIn(pointPosition);
            if(isIn){
                if(i === length - 1){
                    status = 1
                } else {
                    status = 2
                }
                break
            }
        }
        return status
    }

    getTween(){
        return this.tween
    }
    
    animation(obj){
        this.animating = true
        let height = Math.sin(obj.y) * this.skipHight
        let newPosition = [this.centerPosition[0] + obj.x, this.centerPosition[1] + height, this.centerPosition[2]]
        this.mesh.position.set( ...newPosition );
        this.mesh.rotation.z = obj.r
        this.scr.render();
    }

    stopAnimation(){
        this.animating = false;
        this.centerPosition = [this.centerPosition[0] + this.skipDistance, this.centerPosition[1], this.centerPosition[2]]
        if(this.skiperStatus === 0){
            this.tweenDrop.start()
        }
        this.events.skipComplete(this.skiperStatus)
    }

    dropAnimation(obj){
        let position = this.mesh.position
        let newPosition = [position.x, this.size.height / 2 + obj.y, position.z]
        this.mesh.position.set( ...newPosition );
        this.scr.render();
    }

    stopDropAnimation(){}
}
