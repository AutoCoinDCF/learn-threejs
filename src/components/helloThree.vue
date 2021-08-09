<template>
  <div>
  </div>
</template>

<script>
import JumpOneJump from './jumponejump/index.js';

export default {
	name: 'HelloThreeJS',
	data(){
		return {
			joj: null

		}
	},
	methods:{
		
	},
	mounted(){
		this.joj = new JumpOneJump()
		this.joj.init()
		// const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
		// this.scene.add( ambient );

		
		
		

		

		
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
