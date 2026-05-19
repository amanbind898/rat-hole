import { Application, Text, Graphics, Ticker } from "pixi.js";
import './style.css'

(async () => {
    const app = new Application();
    const ticker = new Ticker();

    await app.init({
        background: "#579ad8",
        resizeTo: window
    });

    document.body.appendChild(app.canvas);

    const title = new Text({text: "rat hole game",style: {fontSize: 32}});
    title.position.set(550,20);
    app.stage.addChild(title);
    let scoreVal =0;
    const score = new Text({text: "score : 00",style: {fontSize: 32}});
    score.position.set(50,20);
    app.stage.addChild(score);
   
    let x = 500;
    let y = 150;
    let space = 150;

    const holes = [];
//   const ratState:Array<boolean>  = new Array(9).fill(false);

    for (let i = 0; i < 9; i++) {
        let row = Math.floor(i / 3);
        let col = i % 3;
        const hole = new Graphics();
        hole.circle(x+col*space,y+row*space,50).fill("#000000");
        holes.push(hole);
        app.stage.addChild(hole);
      
    }
  
    function spawnRat(X:number,Y:number){
  
    const rat = new Graphics().circle(X,Y,30).fill("#ebc10a");
    app.stage.addChild(rat);


     rat.eventMode="static";
     rat.on("pointerdown", () => {
    console.log("mouse clicked");
    rat.destroy();
scoreVal++;
});


     setTimeout(() => {
            rat.destroy();
    }, 700);
    
    }
     

    //  setInterval(()=>{ 
    //   let random = Math.floor(Math.random() * 9);
    //    let row=Math.floor(random/ 3);
    //     let col=random%3;
    //  let ratx=x+col*space;
    // let raty=y+row*space;
    // spawnRat(ratx,raty);
    // ratState[random] = true; }, 2000);


let spawnTimer = 0;

ticker.add((Ticker)=>{
  spawnTimer += Ticker.deltaTime;
  if(spawnTimer>= 120)
    {spawnTimer=0;
      console.log("spawn")
      let random = Math.floor(Math.random() * 9);
       let row=Math.floor(random/ 3);
        let col=random%3;
     let ratx=x+col*space;
    let raty=y+row*space;
    spawnRat(ratx,raty);
    }
    
    score.text=`score :${scoreVal}`
})

ticker.start();



})();
