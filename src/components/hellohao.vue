<template>
  <div id="grid3d"></div>
</template>
<script>
var THREE = require("three");
export default {
  name: "hellohao",
  data() {
    return {
      testdata: "test"
    };
  },
  //    var geometry = new THREE.SphereGeometry(
  //         12,
  //         200,
  //         200,
  //         0,
  //         Math.PI * 2,
  //         0,
  //         Math.PI * 2
  //       );
  //       var material = new THREE.MeshBasicMaterial({color:0x097bdb});
  //       var ball = new THREE.Mesh(geometry, material);
  //       scene.add(ball);
  methods: {
    liziInit() {
      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;

      var SEPARATION = 90;
      var AMOUNTX = 50;
      var AMOUNTY = 50;

      var container;

      var particles, particle;
      var count;

      var camera;
      var scene;
      var renderer;

      var mouseX = 0;
      var mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      init();
      this.interval = setInterval(loop, 1000 / 60);
      //loop();

      function init() {
        container = document.createElement("div");
        container.style.position = "relative";
        container.style.top = "0px";
        document.getElementById("grid3d").appendChild(container);

        camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 5;

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        particles = new Array();

        var i = 0;
        //var material = new THREE.ParticleCircleMaterial(0x097bdb, 1);

        var geometry = new THREE.SphereGeometry(
          1,
          32,
          32,
          0,
          Math.PI * 2,
          0,
          Math.PI * 2
        );
        var material2 = new THREE.MeshBasicMaterial({color:0x097bdb});
        //var ball = new THREE.Mesh(geometry, material2);
        //scene.add(ball);

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            //particle = particles[i++] = new THREE.Particle(material);
            particle = particles[i++] = new THREE.Mesh(geometry, material2);
            particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
            particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
            scene.add(particle);
          }
        }
        count = 0;

        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);
        //document.addEventListener("mousemove", onDocumentMouseMove, false);
        //                    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      }

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
          event.preventDefault();

          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function loop() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        //                    camera.position.y += ( - mouseY - camera.position.y ) * .05;
        camera.position.y = 364;

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++];
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 2 +
              (Math.sin((iy + count) * 0.5) + 1) * 2;
          }
        }

        renderer.render(scene, camera);

        count += 0.1;
      }
    }
  },
  mounted() {
    this.liziInit();
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
};
</script>
<style lang="less">
//
body {
  width: 100vw;
  height: 100vh;
}
</style>

