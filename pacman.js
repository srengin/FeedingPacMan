
    var posX = 0;
    var posY = 0;
    var pizzaEaten = 0;
    var pizzas = [];
    let mainDiv = document.getElementById('main');
    let img = document.createElement("img");
    mainDiv.appendChild(img);
    let imgWidth = 50;
    let ind =-1;
    var direction = 0;
    var focus = 0;
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    document.getElementById("score").innerHTML=pizzaEaten;

    const pacArray = [
        ['images/PacMan1.png', 'images/PacMan2.png'],
        ['images/PacMan3.png', 'images/PacMan4.png'],
        ['images/PacMan5.png', 'images/PacMan6.png'],
        ['images/PacMan7.png', 'images/PacMan8.png']
    ];
 

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }

    function Run() {
        img.style.position='absolute';
        img.width = imgWidth;
        focus = (focus + 1) % 2;
        direction = checkPageBounds(direction, imgWidth);
        img.src = pacArray[direction][focus];
        switch(direction) {
            case 0:
                posX += 20;
                img.style.left = posX + "px";
              break;
            case 1:
                posX -= 20;
                img.style.left = posX + "px";
              break;
            case 2:
                posY -= 20;
                img.style.top = posY + "px";
              break;
            case 3:
                posY += 20;
                img.style.top = posY + "px";
              break;
          }
       
    }

    function update(){
        setInterval(Run, 400);
    }

    function pizzaOven(){
        pizzas.push(makeAPizza());
        setInterval(checkIfEaten, 100);
    }

    function makeAPizza(){
        let pizza = document.createElement('img');
        ind++;
        pizza.setAttribute('id', `pizzaId${ind}`);
        pizza.src = 'images/Pizza.png';
        pizza.width = 50;
        pizza.style.position = 'absolute';
        let velocity = setToRandom(10); 
        //console.log(velocity);
        let position = setToRandom(200);
        //console.log(position);
        pizza.style.top = position.y +"px";
        let positionY = pizza.style.top;
        //console.log(positionY);
        pizza.style.left = position.x + "px";
        let positionX = pizza.style.left;
        pizza.style.zIndex=1;


        mainDiv.appendChild(pizza);
        
        return {
            positionX,
            positionY,
            velocity,
            pizza,
            ind
            
        }
    }

    function ifEaten(element, index){
        
        let x1 = parseInt(element.positionX)+(element.pizza.width/2);
        let y1 = parseInt(element.positionY)+(element.pizza.width/2);
        let x2 = posX + imgWidth/2;
        let y2 = posY + imgWidth/2;
        let distance = Math.sqrt(Math.pow((x2-x1),2)+ Math.pow((y2-y1),2));
        //console.log(distance);
        //console.log((element.pizza.width + imgWidth)/2)

        if (distance <= ((element.pizza.width+imgWidth)/2)){
            console.log("remove pizza");
            pizzaEaten++;
            document.getElementById("score").innerHTML=pizzaEaten;
            var elem = document.getElementById(`pizzaId${element.ind}`);
            elem.parentElement.removeChild(elem);
            return false;
        }
        else{return true;}
    }

    

    function checkIfEaten(){
        if (pizzas){
    pizzas = pizzas.filter(ifEaten);
    pizzas.forEach((item) => {       
        item.positionX = parseInt(item.velocity.x) + parseInt(item.positionX);
        item.positionY = parseInt(item.velocity.y) + parseInt(item.positionY);
        item.pizza.style.left = item.positionX +'px';
        item.pizza.style.top = item.positionY + 'px';
        if (item.positionX+item.pizza.width > pageWidth) {item.velocity.x = -item.velocity.x;}
        if (item.positionX <0) {item.velocity.x = -item.velocity.x;}
        if (item.positionY <0) {item.velocity.y = -item.velocity.y;}
        if (item.positionY + item.pizza.width > pageHeight) {item.velocity.y = -item.velocity.y;}
        })
        }
    }

    function checkPageBounds(direction, imgWidth) {
        // reverse direction on hitting page bounds
        if (direction === 0 && posX+imgWidth >= pageWidth) direction =1;
        if (direction === 1 && posX<=0) direction =0;
        if (direction === 2 && posY <=0) direction =3;
        if (direction === 3 && posY+imgWidth >= pageHeight) direction =2;
        return direction;
    }

    window.addEventListener("keydown", event => {
        console.log(event.key);
        if (event.key == "ArrowLeft") direction = 1; // left
        if (event.key == "ArrowUp") direction = 2; // up
        if (event.key == "ArrowRight") direction = 0; // right
        if (event.key == "ArrowDown") direction = 3; // down
        Run();
    });   
