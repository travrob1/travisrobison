/* global angular, $, createjs, skrollr, document, window, Image */
angular.module('app').controller('homeCtrl', function($scope, $timeout){
  var canvas, stage,brush, bmpList1,bitmap1, bmpList2, bitmap2, txt1,chevron, i = 1, tweenDatShit;
  var heroFontSize = '72px Poiret One';
  var diamondQuantity = 40;

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var content = $('#skrollr-body');
  if(w > 700 && w < 1025){
      diamondQuantity = 30;
  }
  if(w <= 700){
      heroFontSize = '40px Poiret One';
      diamondQuantity = 15;
  }
  $(document).ready(function(){

    canvas = document.getElementById('banner');
    brush = canvas.getContext('2d');

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    canvas.width  = w;
    canvas.height = h;
    content.css('top', h+'px').css('padding-bottom', '-'+h+'px');

    var image1 = new Image();
    image1.src = '../../images/diamond1.png';
    image1.category = 'small';
    image1.onload = createBlocks;

    var image2 = new Image();
    image2.src = '../../images/block3.png';
    image2.category = 'large';
    image2.onload = createBlocks;

    txt1 = new createjs.Text('Web Developer\n\n', heroFontSize, '#fff');
    txt1.textAlign = 'center';
    txt1.x = canvas.width/2;
    txt1.y = canvas.height/2;

    chevron = new createjs.Bitmap('../../images/chevron.png');
    chevron.x = canvas.width/2 - 18;
    chevron.y = canvas.height - 60;


    createjs.Tween.get(txt1, {loop: true})
        .to({ alpha: 0 }, 1500)
        .call(textChange)
        .to({ alpha: 1}, 1500);
    tweenDatShit = function (reset) {
        // if(reset){
        //     createjs.Tween.removeTweens(chevron)
        // }
        createjs.Tween.get(chevron, {loop: true})
            .to({ y: canvas.height - 60 }, 900)
            .to({ y: canvas.height - 40 }, 900, createjs.Ease.bounceOut)
            .to({ y: canvas.height - 60 }, 900);
    };

    tweenDatShit();

    if(w > 700){

        $timeout(function(){
            skrollr.init();
        }, 1000);
    }


  });

   textChange() => {
      var namesNStuff = [
        'Web Developer',
        'Angular',
        'Sass',
        'Movie Enthusiest',
        'Rocket League',
        'Husband',
        'Brazil Traveler',
        'Metal Gear Solid Fan',
        'Father',
        'Audio Book Listener'
    ];
    txt1.text = namesNStuff[i];
    i++;
    if(i == namesNStuff.length){
      i = 0;
    }
  }

  toggleCache(value) => {
    // iterate all the children except the fpsLabel, and set up the cache:
    var l = stage.getNumChildren() - 1;

    for (var i = 0; i < l; i++) {
      var shape = stage.getChildAt(i);
      if (value) {
        shape.cache(0, 0, canvas.width/2, canvas.height/2);
      } else {
        shape.uncache();
      }
    }
  }

  function createBlocks(e){
    if (e.target.category == 'small') {
      var img1 = e.target;

      bmpList1 = [];

      for (var i = 0; i < diamondQuantity; i++) {
        bitmap1 = new createjs.Bitmap(img1);
        stage.addChild(bitmap1);
        bitmap1.name = 'block' + i;
        bitmap1.addEventListener("mouseover", function(e) {
          createjs.Tween.get(e.target).to({x:Math.random()*canvas.width, y:Math.random()*canvas.height}, 550, createjs.Ease.backOut);
        });
        bitmap1.x = Math.random()*canvas.width;
        bitmap1.y = Math.random()*canvas.height;
        bitmap1.speed = (Math.random()*2+1);


        bmpList1.push(bitmap1);
      }

    } else {
      var img2 = e.target;
      bmpList2 = [];

      for (var j = 0; j < diamondQuantity; j++) {
        bitmap2 = new createjs.Bitmap(img2);
        stage.addChild(bitmap2);
        bitmap2.name = 'block2' + j;
        bitmap2.addEventListener("mouseover", function(e) {
          createjs.Tween.get(e.target).to({x:Math.random()*canvas.width, y:Math.random()*canvas.height}, 550, createjs.Ease.backOut);
        });
        bitmap2.x = Math.random()*canvas.width;
        bitmap2.y = Math.random()*canvas.height;
        bitmap2.speed = (Math.random()*2+1);
        bmpList2.push(bitmap2);
      }
    }
    toggleCache(true);
    createjs.Ticker.addEventListener('tick', handleTick);
  }


  function resetBlock(block){
    block.x = Math.random()*canvas.width;
    block.y = canvas.height;
    block.speed = (Math.random()*2+1);
  }
  function handleTick(){
      var l1 = bmpList1.length;
      for (var i = 0; i < l1; i++) {
        var bmp1 = bmpList1[i];
        if (bmp1.y > -101){
          bmp1.y -= bmp1.speed;
          bmp1.x -= 0.5;
        }else {
          resetBlock(bmp1);
        }
      }

    var l2 = bmpList2.length;
    for (var ii = 0; ii < l2; ii++) {
      var bmp2 = bmpList2[ii];
      if (bmp2.y > -150){
        bmp2.y -= bmp2.speed;
        bmp2.x += 0.5;
      }else {
        resetBlock(bmp2);
      }
    }
    stage.addChild(txt1);
    stage.addChild(chevron);
    stage.update();
  }

  window.onresize = function(){

    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    canvas.width  =  w;
    canvas.height = h;
    content.attr('style','margin-top:'+h+'px');
    if(w > 700){
        skrollr.init();
    }

    txt1.x = canvas.width/2;
    txt1.y = canvas.height/3;

    chevron.x = canvas.width/2 - 18;
    chevron.y = canvas.height - 60;
    tweenDatShit(true);

};




});
