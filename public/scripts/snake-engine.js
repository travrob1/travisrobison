/* global $, _ */
$( document ).ready(function() {
    var table = $('table');
    var rowIndex;
    var cellIndex;
    var direction = 'DOWN';
    var hitMark = false;
    var snake = [{x: 7, y: 7, head: true}];
    var timing = 240;
    var stopTimer = false;
    var score = 0;
    var audio = document.getElementById("bg-audio");
    var gameover = false;


    _.forEach(table.children().children(), function (row, index) {
        rowIndex = index;
        $(row).addClass('row-' + rowIndex);
        _.forEach($(row).children(), function (cell, index) {
            $(cell).attr('x', rowIndex);
            $(cell).attr('y', index);

        });
    });
    $('td[x="'+ random()+'"][y="'+ random()+'"]').addClass('mark');

    function random() {
        return Math.floor(Math.random() * 14) + 0;
    }

    function getNextCords(x, y) {
        var xVal = parseInt(x);
        var yVal = parseInt(y);

        switch(direction){
            case 'LEFT':
                yVal -= 1;
            break;
            case 'UP':
                xVal -= 1;
            break;
            case 'RIGHT':
                yVal += 1;
            break;
            case 'DOWN':
                xVal += 1;
            break;
        }

        return {
            x: xVal,
            y: yVal
        };
    }

    function checkIfGameHasEnded(x, y) {
        if( x == -1 || x > 13 ||
            y == -1 || y > 13 ||
            _.findIndex(snake, {x: x, y: y}) > -1){
            stopTimer = true;
            gameover = true;
            $('#game-over').removeClass('hidden');
        }

    }

    function checkIfHitMark(pointerX, pointerY) {
        var xMarkCords = parseInt($('.mark').attr('x'));
        var yMarkCords = parseInt($('.mark').attr('y'));
        var newMark;

        if(pointerX === xMarkCords && pointerY === yMarkCords){
            hitMark = true;
            score += 10;
            $('#score span').text(score);

            $('.mark').removeClass('mark');

            (function getnew() {
                newMark = {
                    x: random(),
                    y: random()
                };

                // if new mark is on existing snake
                if(_.findIndex(snake, {x: newMark.x, y: newMark.y}) > -1) {
                    getnew();
                }
            })();

            $('td[x="'+ newMark.x+'"][y="'+ newMark.y+'"]').addClass('mark');

            if(timing > 99){ // max speed increase is 100
                timing -= 7;
            }
        }
    }


    function moveSnake(currentPos, nextPos) {
        if(hitMark){
            hitMark = false;
            snake[_.findIndex(snake,'head')].head = undefined;
            snake.unshift({x: nextPos.x, y: nextPos.y, head: true});
        }else {
            snake[_.findIndex(snake,'head')].head = undefined;

            snake.unshift({x: nextPos.x, y: nextPos.y, head: true});
            snake.splice(-1,1);
        }
        $('.snake').removeClass('snake');

        _.forEach(snake, function (snakePart) {
            $('td[x="'+ snakePart.x+'"][y="'+ snakePart.y+'"]').addClass('snake');
        });

    }

    function resetGame() {
        snake = [{x: 7, y: 7, head: true}];
        stopTimer = false;
        gameover = false;
        timing = 300;
        score = 0;
        $('#score span').text(score);
        $('#game-over').addClass('hidden');
        move();
    }

    $(document).keydown(function(e) {
        // if(!executredLast) return;
        switch(e.which) {
            case 37:
                if(direction !== 'RIGHT'){
                    direction = 'LEFT';
                }
            break;

            case 38:
                if(direction !== 'DOWN'){
                    direction = 'UP';
                }
            break;

            case 39:
                if(direction !== 'LEFT'){
                    direction = 'RIGHT';
                }
            break;

            case 40:
                if(direction !== 'UP'){
                    direction = 'DOWN';
                }
            break;

            case 80: // p
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            break;

            case 32: // spacebar
                if(gameover){
                    resetGame();
                    break;
                }
                if(stopTimer){
                    stopTimer = false;
                    move();
                }else {
                    stopTimer = true;
                }
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }

            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    function move() {
        if(stopTimer) { return; }

        var currentPos = {
            x: snake[_.findIndex(snake, 'head')].x,
            y: snake[_.findIndex(snake, 'head')].y
        };

        var nextPos = getNextCords(currentPos.x, currentPos.y);
        checkIfGameHasEnded(nextPos.x, nextPos.y);
        checkIfHitMark(nextPos.x, nextPos.y);
        moveSnake(currentPos, nextPos);

        window.setTimeout(move, timing);
    }

    move();

});
