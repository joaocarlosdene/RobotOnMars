
window.onload = function inicio(e) {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d');
    var robo = new Image()
    robo.src = './images/ROBOT.png'
    var background = new Image()
    background.src = './images/mars.png'


    const move = document.querySelector('#mov')
    const gridX = document.querySelector('#gridX')
    const gridY = document.querySelector('#gridY')
    const form = document.querySelector('#form')
    const btn = document.querySelector('#send')
    


    var posicaoRoboX = 0;
    var posicaoRoboY = 0;
    var facing = 1
    var coordenate = "north"
    var x = 1
    var y = 1

    setInterval(jogo, 1000)






    form.addEventListener('change', jogo)
    gridX.addEventListener('change', mudando)
    gridY.addEventListener('change', mudando)




    function jogo() {

        ctx.drawImage(background, 0, 0, 400, 400)

        var movimentacaoY = (400 / gridX.value);
        var movimentacaoX = (400 / gridY.value);
        var tamanhoRoboX = (movimentacaoX < movimentacaoY) ? movimentacaoX : movimentacaoY;
        var tamanhoRoboY = (movimentacaoY < movimentacaoX) ? movimentacaoY : movimentacaoX;
        


        if (posicaoRoboX < 0) {
            posicaoRoboX = 0
        }
        if (posicaoRoboY < 0) {
            posicaoRoboY = 0
        }
        if (posicaoRoboX > (400 - movimentacaoX)) {
            posicaoRoboX = (400 - movimentacaoX)
        }
        if (posicaoRoboY > (400 - movimentacaoY)) {
            posicaoRoboY = (400 - movimentacaoY)
        }


        //ctx.fillStyle = "black";
        //ctx.fillRect(0, 0, 400, 400)


        ctx.drawImage(robo, posicaoRoboX, posicaoRoboY, tamanhoRoboX, tamanhoRoboY)


        //Grid
        for (var i = movimentacaoX; i < 400; i = i + movimentacaoX) {
            ctx.beginPath();

            //vertical lines 
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 400)

            //Horizontal lines
            //ctx.moveTo(0, i);
            //ctx.lineTo(400, i)

            ctx.strokeStyle = "rgba(255, 255, 255, 0.726)";
            ctx.stroke()
        }
        for (var i = movimentacaoY; i < 400; i = i + movimentacaoY) {
            ctx.beginPath();

            //vertical lines 
            //ctx.moveTo(i, 0);
            //ctx.lineTo(i, 400)

            //Horizontal lines
            ctx.moveTo(0, i);
            ctx.lineTo(400, i)

            ctx.strokeStyle = "rgba(255, 255, 255, 0.726)";
            ctx.stroke()
        }


        return { movimentacaoX, movimentacaoY }

    }



    btn.addEventListener("click", (e) => {
        e.preventDefault();
        move.value.split("").filter(andando)
        
        function andando (number)  {
            if (number === 'f' || number === 'F'){
                console.log('f')
                
                switch (facing){
                    case 1: //up
                    posicaoRoboY -= jogo().movimentacaoY
                    coordenate = 'north'
                    if (y < gridX.value){
                        y += 1
                    }
                    move.value=""
                    break;
                    case 2: //right
                    posicaoRoboX += jogo().movimentacaoX
                    coordenate = 'east'
                    
                    if (x < gridY.value){
                        x += 1
                    }
                    move.value=""
                    break;
                    case 3: //down
                    posicaoRoboY += jogo().movimentacaoY
                    coordenate = 'south'
                    y -= 1
                    if (y <= 1){
                        y = 1
                    }
                    
                    move.value=""
                    break;
                    case 4: //left
                    posicaoRoboX -= jogo().movimentacaoX
                    coordenate = 'west'
                    x -= 1
                    if (x <= 1){
                        x = 1
                    }
                    move.value=""
                    break;
                    default:
                    break;
                }
            }
            
            
            if (number === 'r' || number === 'R'){
                facing += 1
                switch (facing){
                    case 1:
                    coordenate = 'north'
                    break;
                    case 2:
                    coordenate = 'east'
                    break;
                    case 3:
                    coordenate = 'south'
                    break;
                    case 4:
                    coordenate = 'west'
                    break;
                    default:
                    break;
                }
                move.value=""
            }
            if (number === 'l' || number === 'L'){
                facing -= 1
                switch (facing){
                    case 1:
                    coordenate = 'north'
                    break;
                    case 2:
                    coordenate = 'east'
                    break;
                    case 3:
                    coordenate = 'south'
                    break;
                    case 4:
                    coordenate = 'west'
                    break;
                    default:
                    break;
                }
                move.value=""
            }
            if (facing < 1){
                facing = 4
                coordenate = 'west'
            }
            if (facing > 4){
                facing = 1
                coordenate = 'north'
            }
            document.querySelector('#x').innerHTML = (x)
            document.querySelector('#y').innerHTML = (y)
            document.querySelector('#coordinate').innerHTML = (coordenate)
            
        }
        
            


        


    })
    
    setTimeout(mudando, 10)
    function mudando() {
        
        if (gridX.value >= 2) {
            posicaoRoboY += Math.pow(jogo().movimentacaoY,gridX.value)
        }

        
    }
        document.addEventListener("keydown", keypush)
        function keypush(event) {
            switch (event.keyCode) {
                case 37://left
                    posicaoRoboX -= jogo().movimentacaoX
                    break;
                case 38://up
                    posicaoRoboY -= jogo().movimentacaoY
                    break;
                case 39://right
                    posicaoRoboX += jogo().movimentacaoX
                    break;
                case 40://down
                    posicaoRoboY += jogo().movimentacaoY
                    break;
                default:
                    break;
            }
        }





        /*var moveSplitted = move.value.split("")
        for(var i = 0; i < moveSplitted.length; i++) {
            if(moveSplitted[i] === 'f' || 'F'){
                posicaoRoboY -= jogo().movimentacaoY
                console.log(posicaoRoboX)
            }
            if(moveSplitted[i] === 'r' || 'R'){
                posicaoRoboX += jogo().movimentacaoX
                console.log(posicaoRoboX)
            }
            if(moveSplitted[i] === 'l' || 'L'){
                posicaoRoboX -= jogo().movimentacaoX
                console.log(posicaoRoboX)
            }
          
        
        }*/
    

}