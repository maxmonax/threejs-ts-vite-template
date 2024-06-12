import './html/style.css'
import { GameEngine } from './game/GameEngine';
import { FrontEventName, FrontEvents } from './game/events/FrontEvents';

function initGame() {
    let game = new GameEngine();
}

function initEvents() {
    window.addEventListener('resize', () => {
        FrontEvents.getInstance().emit(FrontEventName.WINDOW_RESIZE);
    }, false);
}

function onWindowLoad(e: Event) {
    initGame();
    initEvents();
}

window.addEventListener('load', onWindowLoad)
