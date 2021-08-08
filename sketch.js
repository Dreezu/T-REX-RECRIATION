//Cria as variáveis (espaço na memória do computador para guardar as informações)

var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trexRunning, edges, ground, imageGround, soloInvisivel,
 rand,nuvem,nuvemImage,cactu1,cactu2,cactu3,cactu4,cactu5,cactu6,
 cactus,pontos,grupoC,grupoN,trexInxock,gameOver,gameOverImage,
 restart,restartImage,pulo,morte,checkpoint;

//Faz o carregamento das imagens
function preload(){
  
  //Coloca animação de correr do trex
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");  
  
  nuvemImage = loadImage("cloud.png");
  
  //Coloca imagem no ground
  imageGround = loadImage("ground2.png");
  
  cactu1 = loadImage("obstacle1.png");
  cactu2 = loadImage("obstacle2.png");
  cactu3 = loadImage("obstacle3.png");
  cactu4 = loadImage("obstacle4.png");
  cactu5 = loadImage("obstacle5.png");
  cactu6 = loadImage("obstacle6.png");
  
  trexInxock = loadAnimation("trex_collided.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
  pulo = loadSound("jump.mp3");
  
  morte = loadSound("die.mp3");
  
  checkpoint = loadSound("checkPoint.mp3");
}

//Faz as configurações
function setup(){
  
  //Cria a Tela
  createCanvas(600,200); 
  
  //Da posição e tamnho pro trex
  trex = createSprite(50,60,20,50);
  //Coloca animação no trex
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("colide", trexInxock);
  //Da o tamanho do trex
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,100);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  //Diz que as edges vão ser as bordas da tela
  edges = createEdgeSprites();

  //Da posição e tamnho pro ground(chão)
  ground = createSprite(200,180,400,20);
  //Coloca imagem no ground
  ground.addImage("ground", imageGround);
  //Define que o ground deve começar do meio da imagem.
  ground.x = ground.width/2;
  
  //Da posição e tamanho pro chão invisível
  soloInvisivel = createSprite(300,190,600,10);
  soloInvisivel.visible = false;
  
  grupoC = new Group();
  grupoN = new Group();

}

//Faz os desenhos na tela atualizarem
function draw(){

  //Limpa a tela
  background("white");
  
  //console.log("isto é: ",estadoJogo);
  
  text("pontos: " + pontos,500,20);
  
  if(estadoJogo === JOGAR){
    
    pontos = Math.round(frameCount/10);
    
    ground.velocityX = -(10 + pontos / 100);
    
    if(pontos > 0 && pontos %100 === 0){
      checkpoint.play();
    }
    
     if(keyDown("space") && trex.y>160){
      trex.velocityY = -10; 
       pulo.play();
       } 
    
    gerarNuvens();
    cactu();
    
    if(grupoC.isTouching(trex)){
      estadoJogo = ENCERRAR;
      morte.play();
    }
  }
  else if(estadoJogo === ENCERRAR){
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    trex.changeAnimation("colide",trexInxock);
    grupoC.setLifetimeEach(-1);
    grupoN.setLifetimeEach(-1);
    
    grupoC.setVelocityXEach(0);
    grupoN.setVelocityXEach(0);
    
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      reset();
    }
  }
  

  //Condição SE a imagem do ground sair a esquerda da tela
  if(ground.x < 0){

    //Faz o ground voltar a posição inicial
    ground.x = ground.width/2;
  }

  //Da velocidade ao trex (Gravidade)
  trex.velocityY = trex.velocityY + 0.5;

  //Impede o trex de cair do ground
  trex.collide (soloInvisivel);
  
  
  //Desenha todos os sprites na tela
  drawSprites();
  
  //Mostra a informação no console do tempo que o programa demorou pra executar até aqui
  //console.timeEnd();
}

//Faz a criação das núvens de forma aleatória
function gerarNuvens(){
  if(frameCount % 70 === 0){
    
    // > Escreva o código Aqui para gerar as núvens 
  nuvem = createSprite (600,100,40,10);
  nuvem.velocityX = -3;
  nuvem.addImage("cloud", nuvemImage);
  nuvem.y = Math.round(random (10,80));
  nuvem.scale = 0.5;
  nuvem.depth = trex.depth;
  trex.depth = trex.depth +1;
  nuvem.lifetime = 300;
  //console.log(nuvem.depth);
   //console.log(trex.depth);
    grupoN.add(nuvem);
  }

}

function cactu(){
  if(frameCount % 70 === 0){
  cactus = createSprite(600,165,10,40);
  cactus.velocityX = -(10 + pontos / 100);
    
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:cactus.addImage(cactu1);
        break;
        case 2:cactus.addImage(cactu2);
        break;
        case 3:cactus.addImage(cactu3);
        break;
        case 4:cactus.addImage(cactu4);
        break;
        case 5:cactus.addImage(cactu5);
        break;
        case 6:cactus.addImage(cactu6);
        break;

    }
    cactus.scale = 0.6;
    cactus.lifetime = 300;
    
    grupoC.add(cactus);
  }
}

function reset(){
  estadoJogo = JOGAR;
  frameCount = 0;
  trex.changeAnimation("running", trexRunning);
  grupoC.destroyEach();
  grupoN.destroyEach();
  gameOver.visible = false;
    restart.visible = false;
}

