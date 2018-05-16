// 雪花特效
var $window = $(window);
var pixiInit = function () {
    var ww = $window.width();
    var wh = $window.height();

    pixiContainer = new PIXI.Container();
    pixiRender = new PIXI.autoDetectRenderer(ww, wh, {transparent: true});
    $('.pixi').append(pixiRender.view);

    var particle = '../json/snow_small.png';
    var config = '../json/config.json';

    PIXI.loader
        .add("particle", particle)
        .add("config", config)
        .load(function (loader, resources) {
            pixiEmitter = new cloudkid.Emitter(
                pixiContainer,
                [resources.particle.texture],
                resources.config.data
            );

            pixiEmitter.emit = true;
            pixiEmitter.spawnRect.width = ww;
            pixiEmitter.updateSpawnPos(0, wh);
            pixiElapsed = Date.now();
            pixiUpdate();
        });
};
var pixiUpdate = function () {
    var now = Date.now();
    pixiEmitter.update((now - pixiElapsed) * 0.001);
    pixiElapsed = now;
    pixiRender.render(pixiContainer);
    requestAnimationFrame(pixiUpdate);
};
var onPixiResize = function () {
    if ($('.pixi canvas').length <= 0) return;

    var canvas = $('.pixi canvas').get(0);
    canvas.width = ww;
    canvas.height = wh;
    pixiRender.resize(ww, wh);
    pixiEmitter.spawnRect.width = ww;
    pixiEmitter.updateSpawnPos(0, wh);
};
onPixiResize();
pixiInit();