import * as THREE from 'three'
import { FrontEventName, FrontEvents } from './events/FrontEvents';

export class GameEngine {
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _clock: THREE.Clock;
    // private _stats: Stats;

    constructor() {

        this._clock = new THREE.Clock();

        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.initEvents();

        this.animate();
        
    }

    private initRenderer() {
        debugger;
        let domParent = document.getElementById('game');
        this._renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this._renderer.setSize(innerWidth, innerHeight)
        domParent.appendChild(this._renderer.domElement);
    }

    private initScene() {
        this._scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(1, 1, 1).multiplyScalar(100);
        this._scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

        // objects
        let glowMagenta = new THREE.MeshBasicMaterial({
            color: new THREE.Color(1, 0, 1).multiplyScalar(8),
            toneMapped: false
        });

        let glowAqua = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0, 1, 1).multiplyScalar(8),
            toneMapped: false,
            wireframe: true
        });

        let box1 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            glowMagenta.clone()
        );
        this._scene.add(box1);

        let box2 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            glowAqua
        );
        this._scene.add(box2);

        let box3 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 0.5, 0.1) })
        );
        this._scene.add(box3);

        [box3, box1, box2].forEach((s, i) => {
            let a = (i * Math.PI * 2) / 3;
            s.position
                .set(Math.cos(a), 0, Math.sin(-a))
                .setLength(3);
        });

    }

    private initCamera() {
        const w = innerWidth;
        const h = innerHeight;
        this._camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
        this._camera.position.set(10, 5, 10);
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));
        this._scene.add(this._camera);
    }

    private initEvents() {
        FrontEvents.getInstance().on(FrontEventName.WINDOW_RESIZE, this.onWindowResize, this)
    }

    private onWindowResize() {
        const w = innerWidth;
        const h = innerHeight;
        // camera
        if (this._camera) {
            this._camera.aspect = w / h;
            this._camera.updateProjectionMatrix();
        }
        // renderer
        this._renderer.setSize(w, h);
    }

    /**
     * Main cycle
     */
    private animate() {
        let dt = this._clock.getDelta();

        // this._stats.begin();
        this.update(dt);
        this.render();
        // this._stats.end();

        requestAnimationFrame(() => this.animate());
    }

    private update(dt: number) {
        
    }

    render() {
        if (this._scene && this._camera) {
            this._renderer.render(this._scene, this._camera);
        }
    }

}