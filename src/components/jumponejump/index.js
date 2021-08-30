import * as THREE from 'three';
// import * as OrbitControls from "three-orbitcontrols";
import TWEEN from '@tweenjs/tween.js'
// import 

import SCR from './SCR';
import Skiper from './skiper';
import Supporter from './supporter'

export default class JumpOneJump{
    constructor(){
        this.light = null
        this.lightHelper = null
        this.raycaster = null
        this.shadowCameraHelper = null
        this.supporter = null
        this.skiper = null
        this.tweenSkipGroup = new TWEEN.Group();
        this.tweenAfterSkipGroup = new TWEEN.Group();
        this.tweenCameraGroup = new TWEEN.Group();
        this.tweenSkip = null;
        this.skiperEvents = {
            skipComplete: this.skipComplete.bind(this)
        };
        this.scr = new SCR(window.innerWidth, window.innerHeight, document.body, this.tweenCameraGroup)
    }

    init(){ 
        let scene = this.scr.getScene()
        // let camera = this.scr.getCamera()
        // let renderer = this.scr.getRenderer()
		this.addHelperLine()
		this.addPlane(scene)
		this.addLight(scene)
        
		this.addEventListener()
		
		
		// const controls = new OrbitControls( camera, renderer.domElement );
		// controls.addEventListener( 'change', () => {
        //     this.scr.render()
        // } );
		// controls.minDistance = 20;
		// controls.maxDistance = 500;
		// controls.enablePan = true;
        
        this.supporter = new Supporter(this.scr)
        this.supporter.init()
        let skiperPosition = this.getSkiperPosition()
        this.skiper = new Skiper(this.scr, skiperPosition, this.skiperEvents, this.tweenSkipGroup);
        this.skiper.init()
        this.animation()
        this.scr.render()
    }

    

    addHelperLine(){
        // let po = new THREE.Vector3( 0, 0, 0 );
        // let px = new THREE.Vector3( 0, 10000, 0 );
        let scene = this.scr.getScene()
        let gx = new THREE.BufferGeometry();
        const arrx = [0,0,0,10000,0,0];
        const verticesx = new Float32Array(arrx);
        gx.setAttribute( 'position', new THREE.BufferAttribute( verticesx, 3 ) );
        var materialx = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        let linex = new THREE.Line( gx, materialx );
        scene.add( linex );

        let gy = new THREE.BufferGeometry();
        const arry = [0,0,0,0,10000,0];
        const verticesy = new Float32Array(arry);
        gy.setAttribute( 'position', new THREE.BufferAttribute( verticesy, 3 ) );
        var materialy = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let liney = new THREE.Line( gy, materialy );
        scene.add( liney );

        let gz = new THREE.BufferGeometry();
        const arrz = [0,0,0,0,0,10000];
        const verticesz = new Float32Array(arrz);
        gz.setAttribute( 'position', new THREE.BufferAttribute( verticesz, 3 ) );
        var materialz = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        let linez = new THREE.Line( gz, materialz );
        scene.add( linez );
    } 

    addPlane(scene){
        const texture = new THREE.TextureLoader().load( require('./texture/mdb.jpg') );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 4;
        texture.repeat.set( 10, 24 );
        texture.encoding = THREE.sRGBEncoding;
		// texture.needsUpdate = true;
        const material = new THREE.MeshStandardMaterial( { map: texture, transparent: false, side: THREE.DoubleSide, shadowSide: THREE.BackSide  }  );
        // let material = new THREE.MeshPhongMaterial( { color: 0x6bddb0, dithering: true } );
        let geometry = new THREE.PlaneGeometry( 2000, 2000 );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 0 );
        mesh.rotation.x = - Math.PI * 0.5;
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    addLight(scene){
        // const spotLight = new THREE.SpotLight( 0xffffff, 1 );
        // spotLight.position.set( 20, 50, 50 );
        // spotLight.angle = Math.PI / 4;
        // spotLight.penumbra = 0.1;
        // spotLight.decay = 2;
        // spotLight.distance = 300;

        // spotLight.castShadow = true;
        // spotLight.shadow.mapSize.width = 512;
        // spotLight.shadow.mapSize.height = 512;
        // spotLight.shadow.camera.near = 10;
        // spotLight.shadow.camera.far = 2000;
        // spotLight.shadow.focus = 1;
        // scene.add( spotLight );
        // this.lightHelper = new THREE.SpotLightHelper( spotLight );
        // scene.add( this.lightHelper );
        // this.shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
        // scene.add( this.shadowCameraHelper );


        var dirLight = new THREE.DirectionalLight( 0xffffff, 1, 10 );
        dirLight.position.set(0, 5000, 5000 ); 			//default; light shining from top
        dirLight.castShadow = true;            // default false

        //Set up shadow properties for the light
        dirLight.shadow.mapSize.width = 512;  // default
        dirLight.shadow.mapSize.height = 512; // default
        dirLight.shadow.camera.top = -50;
        dirLight.shadow.camera.bottom = 100;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 100;
        dirLight.shadow.camera.near = 1000;
        dirLight.shadow.camera.far = 10000;
        dirLight.shadow.bias = 0.0000001

        
        scene.add( dirLight );

        this.scr.render()

        // var helper = new THREE.CameraHelper( dirLight.shadow.camera );
        // scene.add( helper );
    }

    getSkiperPosition(){
        let supporter = this.supporter.getFocusSupporter();
        let topPosition = supporter.getTopPosition();
        return topPosition
    }

    addEventListener(){
        // this.raycaster = new THREE.Raycaster();
        document.addEventListener( 'pointerup', this.onPointerup.bind(this) );
        document.addEventListener( 'pointerdown', this.onPointerDown.bind(this) );
    }

    onPointerDown(){
        this.downTime = new Date().getTime();
        console.log('mouseDown');
        // this.startSkip = true
    }

    onPointerup(){
        if(!this.downTime) return;
        let nowTime = new Date().getTime();
        let time = nowTime - this.downTime;
        let distance = time / 100
        // this.tweenSkip.chain(tweenSupporter)
        this.skiper.skip(distance > 20 ? 20 : distance, this.supporter.supporterList)
        this.scr.render()
        this.downTime = null
    }

    skipComplete(status){
        if(status === 1){
            this.tweenAfterSkipGroup.removeAll()
            let cSupporter = this.supporter.addNextSupporter(this.tweenAfterSkipGroup)
            this.scr.setCameraToSupporter(cSupporter)
        }
        // 
    
        // 
        // this.tweenCameraGroup
        // let tweenSupporter = cSupporter.getTween()
    }

    animation(){
        this.tweenSkipGroup.update()
        this.tweenAfterSkipGroup.update();
        this.tweenCameraGroup.update();
        this.scr.render()
        requestAnimationFrame(this.animation.bind(this))
    }

}