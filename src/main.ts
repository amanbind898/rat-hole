import { Application, Text, Graphics } from "pixi.js";
import './style.css'

(async () => {
    const app = new Application();

    await app.init({
        background: "#579ad8",
        resizeTo: window
    });

    document.body.appendChild(app.canvas);

    const title = new Text({text: "rat hole game",style: {fontSize: 32}});
    title.position.set(550,20);
    app.stage.addChild(title);
   
    let x = 500;
    let y = 150;
    let space = 150;

    const holes = [];
  const ratState:Array<boolean>  = new Array(9).fill(false);
    for (let i = 0; i < 9; i++) {
        let row = Math.floor(i / 3);
        let col = i % 3;
        const hole = new Graphics();
        hole.circle(x+col*space,y+row*space,50).fill("#000000");
        holes.push(hole);
        app.stage.addChild(hole);
      
    }
    let currRat ;
    function spawnRat(X:number,Y:number){
       if(currRat){
        currRat.destroy();
    }
const rat = new Graphics().circle(X,Y,30).fill("#ebc10a")
     app.stage.addChild(rat);
     currRat=rat;
     rat.eventMode="static";
     rat.on("pointerdown",()=>{
      console.log("mouse clicked")
      rat.destroy();
       setTimeout(() => {
       
            rat.destroy();
            currRat = null;
        
    }, 500);
     }
    );
    }
     

     setInterval(()=>{ 
      let random = Math.floor(Math.random() * 9);
       let row=Math.floor(random/ 3);
        let col=random%3;
     let ratX=x+col*space;
    let ratY=y+row*space;
    spawnRat(ratX,ratY);
    ratState[random] = true;

}, 2000);


})();