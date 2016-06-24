/**
 * Quantum active
     _____     _   _   _        _____         
    | __  |_ _| |_| |_| |___   |  _  |___ ___ 
    | __ -| | | . | . | | -_|  |   __| . | . |
    |_____|___|___|___|_|___|  |__|  |___|  _|
                                         |_|  
                                            
**/

//u and t for timing of animations
var u = millis();
var t;
var fade;
var fadeCheck = 0;
var fadeSpeed = 15;
var scene = "menu";
var bubbleDelay = 5;
var timer = 0;
var lives = 3;
var paused = false;
var abovePause = false;
var pauseButton = function(x, y) {
    noStroke();
    fill(255, 255, 255);
    if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 35) {
        fill(128, 172, 252);
        abovePause = true;
    } else {
        abovePause = false;
    }
    rect(x, y, 10, 30);
    rect(x + 15, y, 10, 30);
    
    if (keyIsPressed && keyCode === "P") {
        paused = true;
    }
};
textAlign(CENTER);
var circle = function(Color, s) {
    noStroke();
    fill(Color);
    if (t < s * 1.5) {
        ellipse(300, 600, t, t);
    } else {
        ellipse(300, 600, s * 1.5, s * 1.5);
    }
};
var fish = function() {
    cursor("none");
    
    noStroke();
    fill(113, 130, 194);
    ellipse(mouseX, mouseY, 39, 22);
    triangle(mouseX + 15, mouseY, mouseX + 27, mouseY - 10, mouseX + 27, mouseY + 10);
    
    fill(75, 95, 207);
    triangle(mouseX - 6, mouseY, mouseX + 7, mouseY + 6, mouseX + 7, mouseY - 6);
    
    fill(250, 250, 250);
    ellipse(mouseX - 12, mouseY, 8, 8);
    fill(0, 0, 0);
    ellipse(mouseX - 12, mouseY, 3, 3);
    
    stroke(26, 8, 8);
    strokeWeight(2);
    line(mouseX - 10, mouseY + 7, mouseX - 15, mouseY + 5.6);
};
var portal = function(portalSize) {
    ellipse(285, 508, 53 * portalSize, 32 * portalSize);
    triangle(300 + 25 * portalSize, 508 - 15 * portalSize, 300 + 25 * portalSize, 507 + 15 * portalSize, 285 + 10 * portalSize, 507);
};
var coral = function(x, y, color) {
    fill(color);
    
    ellipse(x, y, 11, 42);
    ellipse(x - 8, y - 17, 9, 32);
    ellipse(x + 8, y - 12, 8, 28);
    ellipse(x + 13, y - 23, 6, 20);
    ellipse(x, y + 12, 13, 23);
    ellipse(x - 5, y, 11, 16);
};

var bubble1s = [];
var bubble2s = [];

var Obstacle = function(x, y, delay, speed, hit, direction) {
    this.x = x;
    this.y = y;
    this.delay = delay;
    this.speed = speed;
    this.hit = hit;
    this.direction = direction;
};
Obstacle.prototype.flow = function() {
    
};
var Bubble = function(x, y, delay, speed, hit) {
    Obstacle.call(this, x, y, delay, speed, hit);
};
Bubble.prototype = Object.create(Obstacle.prototype);
Bubble.prototype.drawtype1 = function() {
    if (this.hit === false) {
        strokeWeight(2);
        stroke(237, 238, 247, 100);
        fill(198, 202, 242, 100);
        ellipse(this.x, this.y, 27, 27);
    } else {
        noStroke();
        fill(135, 175, 250, 150);
        ellipse(this.x, this.y, 15, 15);
    }
};
Bubble.prototype.drawtype2 = function() {
    if (this.hit === false) {
        strokeWeight(2);
        stroke(237, 238, 247, 120);
        fill(227, 185, 235, 120);
        ellipse(this.x, this.y, 27, 27);
    } else {
        noStroke();
        fill(227, 185, 235, 150);
        ellipse(this.x, this.y, 15, 15);
    }
};

var fadeIn = function(r, g, b) {
    if (fadeCheck === 0) {
        fade = 255;
        fadeCheck = 1;
    }
    if (fadeCheck !== 2) {
        fade -= fadeSpeed;
    }
    noStroke();
    if (b === undefined) {
        fill(125, 130, 190, fade);
    } else {
        fill(r, g, b, fade);
    }
    rect(0, 0, width, height);
    
};
var fadeOut = function(newScene) {
    if (fadeCheck === 1) {
        fade = 0;
        fadeCheck = 2;
    }
    noStroke();
    fill(125, 130, 190, fade);
    rect(0, 0, width, height);
    fade += fadeSpeed;
    if (fade >= 300) {
        scene = newScene;
        fadeCheck = 0;
    }
};

//font stuff
{
var letter = function(which, x, y, sz){
    noFill();
    pushMatrix();
    translate(x, y);
    scale(sz/50);
    switch(which.toUpperCase()){
        case 'A':
            line(0, -50, -40, 50);
            line(0, -50, 40, 50);
            line(-26, 20, 26, 20);
            break;
        case 'B':
            line(-40, -50, -40, 50);
            line(-40, -50, -10, -50);
            line(-40, 0, 5, 0);
            line(-40, 50, 5, 50);
            arc(-10, -25, 50, 50, -90, 90);
            arc(5, 25, 50, 50, -90, 90);
            break;
        case 'C':
            arc(0, -15, 80, 70, -180, 0);
            arc(0, 15, 80, 70, 0, 180);
            line(-40, 13, -40, -13);
            break;
        case 'D':
            arc(0, -15, 80, 70, -90, 0);
            arc(0, 15, 80, 70, 0, 90);
            line(-40, 50, -40, -50);
            line(-40, 50, 0, 50);
            line(-40, -50, 0, -50);
            line(40, -15, 40, 15);
            break;
        case 'E':
            line(-40, -50, -40, 50);
            line(-40, -50, 40, -50);
            line(-40, 10, 30, 10);
            line(-40, 50, 40, 50);
            break;
        case 'F':
            line(-40, -50, -40, 50);
            line(-40, -50, 40, -50);
            line(-40, 10, 30, 10);
            break;
        case 'G':
            arc(0, -15, 80, 70, -180, 0);
            arc(0, 15, 80, 70, 0, 180);
            line(-40, 13, -40, -13);
            line(-10, 15, 40, 15);
            break;
        case 'H':
            line(-40, -50, -40, 50);
            line(-40, 10, 40, 10);
            line(40, -50, 40, 50);
            break;
        case 'I':
            line(0, -50, 0, 50);
            line(-40, -50, 40, -50);
            line(-40, 50, 40, 50);
            break;
        case 'J':
            arc(-30, 15, 80, 70, 0, 90);
            line(-40, 50, -30, 50);
            line(10, -50, 10, 15);
            break;
        case 'K':
            line(-40, -50, -40, 50);
            line(-40, 15, 40, -50);
            line(-20, 0, 40, 50);
            break;
        case 'L':
            line(-40, -50, -40, 50);
            line(-40, 50, 40, 50);
            break;
        case 'M':
            line(-40, -50, -40, 50);
            line(0, 20, -40, -50);
            line(0, 20, 40, -50);
            line(40, -50, 40, 50);
            break;
        case 'N':
            line(-40, -50, -40, 50);
            line(40, 50, -40, -50);
            line(40, -50, 40, 50);
            break;
        case 'O':
            ellipse(-7, 0, 80, 100);
            break;
        case 'P':
            line(-40, -50, -40, 50);
            line(-40, -50, 5, -50);
            line(-40, 0, 5, 0);
            arc(5, -25, 50, 50, -90, 90);
            break;
        case 'Q':
            arc(0, -15, 80, 70, -180, 0);
            arc(0, 15, 80, 70, 0, 180);
            line(-40, 13, -40, -13);
            line(40, 13, 40, -13);
            arc(5, 45, 30, 30, -180, 0);
            arc(30, 40, 20, 20, 0, 180);
            break;
        case 'R':
            line(-40, -50, -40, 50);
            line(-40, -50, 5, -50);
            line(-40, 0, 5, 0);
            arc(5, -25, 50, 50, -90, 90);
            line(0, 0, 40, 50);
            break;
        case 'S':
            line(-20, -50, 15, -50);
            line(-15, 0, 15, 0);
            line(-15, 50, 15, 50);
            arc(-15, -25, 50, 50, -270, -90);
            arc(15, 25, 50, 50, -90, 90);
            arc(15, -25, 50, 50, -100, -30);
            arc(-15, 25, 50, 50, 90, 150);
            break;
        case 'T':
            line(0, -50, 0, 50);
            line(-40, -50, 40, -50);
            break;
        case 'U':
            line(-40, -50, -40, 10);
            line(40, -50, 40, 10);
            arc(0, 10, 80, 80, 0, 180);
            break;
        case 'V':
            line(-40, -50, 0, 50);
            line(40, -50, 0, 50);
            break;
        case 'W':
            line(-40, -50, -25, 50);
            line(40, -50, 25, 50);
            line(0, 5, -25, 50);
            line(0, 5, 25, 50);
            break;
        case 'X':
            line(-40, -50, 40, 50);
            line(-40, 50, 40, -50);
            break;
        case 'Y':
            line(-40, -50, 0, 0);
            line(0, 0, 40, -50);
            line(0, 0, 0, 50);
            break;
        case 'Z':
            line(-40, -50, 40, -50);
            line(40, -50, -40, 50);
            line(-40, 50, 40, 50);
            break;
        case '.':
           ellipse(0, 42, 15, 15);
            break;
        case '\'':
            line(0, -20, 10, -50);
            break;
        case '?':
            arc(0, -30, 50, 50, 220, 440);
            line(0, 20, 0, 0);
            ellipse(0, 50, 10, 10);
            break;
        case '!':
            line(0, 10, 0, -50);
            ellipse(0, 50, 10, 10);
            break;
    }
    popMatrix();
};
var word = function(which, x, y, sz){
    var theWord = which.split("");
    
    
    for(var i in theWord){
        pushMatrix();
        translate(x - ((theWord.length - 1)*sz), y);
        if((theWord[i] === '\'' || theWord[i-1] === '\'') || (theWord[i] === '.' || theWord[i-1] === '.')){
            letter(theWord[i], i*(sz*1.9), 0, sz);
        } else {
            letter(theWord[i], i*(sz*2), 0, sz);
        }
        popMatrix();
    }
};
var word2 = function(which, x, y, sz){
    strokeWeight(30);
    word(which, x, y + 3, sz);
    for(var i = 25; i > 0; i -= 3){
        stroke(255, 255, 255, 20);
        strokeWeight(i);
        word(which, x, y, sz);
    }
};
}

var draw = function() {
    if (scene === "menu") {
        cursor("");
        background(182, 179, 242);
        t = millis() - u;
        
        circle(color(215, 218, 247), 900);
        circle(color(220, 223, 250), 850);
        circle(color(211, 216, 252), 800);
        circle(color(205, 209, 252), 750);
        circle(color(192, 198, 252), 700);
        circle(color(182, 189, 252), 650);
        circle(color(172, 180, 247), 600);
        circle(color(166, 174, 247), 550);
        circle(color(167, 174, 232), 500);
        circle(color(161, 168, 237), 450);
        circle(color(160, 167, 232), 400);
        circle(color(150, 160, 220), 350);
        circle(color(145, 155, 222), 300);
        circle(color(145, 152, 214), 250);
        circle(color(133, 140, 200), 200);
        circle(color(125, 130, 190), 150);
        circle(color(116, 122, 176), 100);
        
        timer ++;
        if (timer > bubbleDelay) {
            bubble1s.push(new Bubble(random(30, 570), 700, bubbleDelay, 5, false));
            timer = 0;
        }
        for (var i in bubble1s) {
            bubble1s[i].drawtype1();
            bubble1s[i].y -= bubble1s[i].speed;
            if ((mouseX - bubble1s[i].x) * (mouseX - bubble1s[i].x) + (mouseY - bubble1s[i].y) * (mouseY - bubble1s[i].y) <= 841) {
                bubble1s[i].hit = true;
                bubble1s[i].speed = 10;
            }
        }
        
        noStroke();
        fill(255, 255, 255);
        textFont(createFont("cursive"), 60);
        
        if (t < 3700) {
            stroke(115, 125, 180);
            strokeWeight(4);
            fill(130, 140, 220);
            ellipse(t / 7 - 230, sin(t / 4 - 30) * 50 + 350, 150, 150);
            strokeWeight(2);
            stroke(100, 115, 180);
            fill(138, 145, 212);
            triangle(t / 7 - 255, sin(t / 4 - 30) * 50 + 310, t / 7 - 190, sin(t / 4 - 30) * 50 + 350, t / 7 - 255, sin(t / 4 - 30) * 50 + 390);
            noStroke();
            fill(130, 170, 255, 150);
            ellipse(t / 7 - 230, sin(t / 4 - 34) * 50 + 350, 180, 180);
        } else {
            fill(130, 170, 255);
            ellipse((t - 2200) / 4, 1 / 30 * ((t - 2200) / 4 - 380) * ((t - 2200) / 4 - 380) + 300, 20, 20);
            ellipse(620 - (t - 2200) / 4, 1 / 30 * ((t - 2200) / 4 - 380) * ((t - 2200) / 4 - 380) + 370, 20, 20);
            
            stroke(115, 125, 180);
            strokeWeight(4);
            fill(130, 140, 220);
            if ((300 - mouseX) * (300 - mouseX) + (355 - mouseY) * (355 - mouseY) <= 6889) {
                cursor("pointer");
                fill(145, 150, 215);
            }
            ellipse(300, 355, 150, 150);
            strokeWeight(2);
            stroke(100, 115, 180);
            fill(138, 145, 212);
            if ((300 - mouseX) * (300 - mouseX) + (355 - mouseY) * (355 - mouseY) <= 6889) {
                fill(130, 140, 220);
            }
            triangle(275, 315, 340, 355, 275, 395);
        }
        
        noFill();
        strokeWeight(2);
        stroke(82, 62, 214);
        if (t * 2 - 1800 < 200) {
            word2("Bubble Pop!", t * 2 - 1800, 150, 25);
        } else {
            word2("Bubble Pop!", 300, 150, 25);
        }
        fadeIn(255, 255, 255);
        if (fadeCheck === 2) {
            fadeOut("room1");
        }
    }
    if (scene === "room1") {
        background(207, 206, 240);

        noStroke();
        
        fill(215, 218, 247);
        ellipse(200, 400, 900, 900);
        
        fill(220, 223, 250);
        ellipse(200, 400, 850, 850);
        
        fill(211, 216, 252);
        ellipse(200, 400, 800, 800);
        
        fill(205, 209, 252);
        ellipse(200, 400, 750, 750);
        
        fill(192, 198, 252);
        ellipse(200, 400, 700, 700);
        
        fill(182, 189, 252);
        ellipse(200, 400, 650, 650);
        
        fill(172, 180, 247);
        ellipse(200, 400, 600, 600);
        
        fill(166, 174, 247);
        ellipse(200,400,550,550);
        
        fill(167, 174, 232);
        ellipse(200,400,500,500);
        
        fill(161, 168, 237);
        ellipse(200,400,450,450);
        
        fill(160, 167, 232);
        ellipse(200,400,400,400);
        
        fill(153, 159, 219);
        ellipse(200,400,350,350);
        
        fill(146, 154, 222);
        ellipse(200,400,300,300);
        
        fill(145, 152, 214);
        ellipse(200,400,250,250);
        
        fill(133, 140, 199);
        ellipse(200,400,200,200);
        
        fill(125, 131, 189);
        ellipse(200,400,150,150);
        
        fill(116, 122, 176);
        ellipse(200,400,100,100);
        
        fill(249, 249, 252);
        textSize(33);
        text("On level one, you must pop as many \nbubbles as you can. At this point, \nyou can't lose. Level ends in 20 \nseconds. Press p to pause. Move and \nkeep the fish in the portal \nto continue.", 300,159);
        
        timer ++;
        if (timer > bubbleDelay) {
            bubble1s.push(new Bubble(random(30, 570), 630, bubbleDelay, 1, false));
            timer = 0;
        }
        for (var i in bubble1s) {
            bubble1s[i].drawtype1();
            bubble1s[i].y -= bubble1s[i].speed;
            if ((mouseX - bubble1s[i].x) * (mouseX - bubble1s[i].x) + (mouseY - bubble1s[i].y) * (mouseY - bubble1s[i].y) <= 841) {
                bubble1s[i].hit = true;
                bubble1s[i].speed = 5;
            }
        }
        
        //portal
        noStroke();
        fill(67, 88, 207, 70);
        portal(sin(millis() / 7) / 5 * 4 + 1);
        fill(67, 88, 207, 100);
        portal(sin(millis() / 7) / 5 * 3 + 1.2);
        fill(67, 88, 207, 100);
        portal(sin(millis() / 7) / 5 * 2 + 1.2);
        fill(67, 88, 207, 100);
        portal(sin(millis() / 7) / 5 + 1);
        fill(67, 88, 207, 100);
        portal(1);
        
        fish();
        
        if (mouseX > 260 && mouseX < 310 && mouseY > 490 && mouseY < 520) {
            fadeSpeed = 2;
            fadeOut("room2");
            timer = 0;
            bubble1s = [];
        }
        
        noStroke();
        fadeIn();
    } else if (scene === "room2") {
        //background
        {
        background(207, 206, 240);

        noStroke();
        
        fill(215, 218, 247);
        ellipse(200, 400, 900, 900);
        
        fill(220, 223, 250);
        ellipse(200, 400, 850, 850);
        
        fill(211, 216, 252);
        ellipse(200, 400, 800, 800);
        
        fill(205, 209, 252);
        ellipse(200, 400, 750, 750);
        
        fill(192, 198, 252);
        ellipse(200, 400, 700, 700);
        
        fill(182, 189, 252);
        ellipse(200, 400, 650, 650);
        
        fill(172, 180, 247);
        ellipse(200, 400, 600, 600);
        
        fill(166, 174, 247);
        ellipse(200,400,550,550);
        
        fill(167, 174, 232);
        ellipse(200,400,500,500);
        
        fill(161, 168, 237);
        ellipse(200,400,450,450);
        
        fill(160, 167, 232);
        ellipse(200,400,400,400);
        
        fill(153, 159, 219);
        ellipse(200,400,350,350);
        
        fill(146, 154, 222);
        ellipse(200,400,300,300);
        
        fill(145, 152, 214);
        ellipse(200,400,250,250);
        
        fill(133, 140, 199);
        ellipse(200,400,200,200);
        
        fill(125, 131, 189);
        ellipse(200,400,150,150);
        
        fill(116, 122, 176);
        ellipse(200,400,100,100);
        }
        
        timer ++;
        if (timer > bubbleDelay) {
            bubble1s.push(new Bubble(random(30, 570), 630, bubbleDelay, 2, false));
            timer = 0;
        }
        for (var i in bubble1s) {
            bubble1s[i].drawtype1();
            bubble1s[i].y -= bubble1s[i].speed;
            if ((mouseX - bubble1s[i].x) * (mouseX - bubble1s[i].x) + (mouseY - bubble1s[i].y) * (mouseY - bubble1s[i].y) <= 841) {
                bubble1s[i].hit = true;
                bubble1s[i].speed = 5;
            }
        }
        
        for (var i = 0; i < lives; i ++) {
            noStroke();
            fill(255, 0, 0);
            arc(i * 30 + 526, 16, 12, 12, 180, 360);
            arc(i * 30 + 515, 16, 12, 12, 180, 360);
        
            arc(i * 30 + 520.5, 16, 23, 25, 0, 180);
            triangle(i * 30 + 528, 25.5, i * 30 + 513, 25.5, i * 30 + 520.5, 31);
        }
        
        pauseButton(20, 20);
        fish();
        fadeIn();
    } else if (scene === "room3") {
        timer ++;
        if (timer > bubbleDelay) {
            bubble1s.push(new Bubble(random(30, 570), 630, bubbleDelay, 2, false));
            bubble2s.push(new Bubble(random(30, 570), 660, bubbleDelay, 2, false));
            timer = 0;
        }
        for (var i in bubble1s) {
            bubble1s[i].drawtype1();
            bubble2s[i].drawtype2();
            bubble1s[i].y -= bubble1s[i].speed;
            bubble2s[i].y -= bubble2s[i].speed;
            if ((mouseX - bubble1s[i].x) * (mouseX - bubble1s[i].x) + (mouseY - bubble1s[i].y) * (mouseY - bubble1s[i].y) <= 841) {
                bubble1s[i].hit = true;
                bubble1s[i].speed = 5;
            }
            if ((mouseX - bubble2s[i].x) * (mouseX - bubble2s[i].x) + (mouseY - bubble2s[i].y) * (mouseY - bubble2s[i].y) <= 841 && bubble2s[i].hit === false) {
                bubble2s[i].hit = true;
                bubble2s[i].speed = 5;
                lives --;
            }
        }
    }
    
    if (paused === true) {
        background(207, 206, 240);

        noStroke();
        
        fill(215, 218, 247);
        ellipse(200, 400, 900, 900);
        
        fill(220, 223, 250);
        ellipse(200, 400, 850, 850);
        
        fill(211, 216, 252);
        ellipse(200, 400, 800, 800);
        
        fill(205, 209, 252);
        ellipse(200, 400, 750, 750);
        
        fill(192, 198, 252);
        ellipse(200, 400, 700, 700);
        
        fill(182, 189, 252);
        ellipse(200, 400, 650, 650);
        
        fill(172, 180, 247);
        ellipse(200, 400, 600, 600);
        
        fill(166, 174, 247);
        ellipse(200,400,550,550);
        
        fill(167, 174, 232);
        ellipse(200,400,500,500);
        
        fill(161, 168, 237);
        ellipse(200,400,450,450);
        
        fill(160, 167, 232);
        ellipse(200,400,400,400);
        
        fill(153, 159, 219);
        ellipse(200,400,350,350);
        
        fill(146, 154, 222);
        ellipse(200,400,300,300);
        
        fill(145, 152, 214);
        ellipse(200,400,250,250);
        
        fill(133, 140, 199);
        ellipse(200,400,200,200);
        
        fill(125, 131, 189);
        ellipse(200,400,150,150);
        
        fill(116, 122, 176);
        ellipse(200,400,100,100);
        
        fill(255, 255, 255);
        textSize(70);
        text("Game paused", 300, 200);
    
        
        
        var shx = -31;
var shy = -90;

fill(240, 152, 152);
triangle(shx+100,shy+279,shx+90,shy+272,shx+81,shy+279);

fill(237, 180, 180);
triangle(shx+78,shy+267,shx+76,shy+258,shx+90,shy+277);

fill(235, 132, 132);
triangle(shx+80,shy+250,shx+76,shy+258,shx+90,shy+277);

fill(242, 128, 128);
triangle(shx+80,shy+250,shx+87,shy+248,shx+90,shy+277);

fill(230, 143, 143);
triangle(shx+95,shy+250,shx+87,shy+248,shx+90,shy+277);

fill(255, 168, 168);
triangle(shx+101,shy+256,shx+95,shy+250,shx+90,shy+277);

fill(252, 194, 194);
triangle(shx+100,shy+267,shx+101,shy+256,shx+90,shy+277);

var shx = 455;
var shy = -90;

fill(240, 152, 152);
triangle(shx+100,shy+279,shx+90,shy+272,shx+81,shy+279);

fill(237, 180, 180);
triangle(shx+78,shy+267,shx+76,shy+258,shx+90,shy+277);

fill(235, 132, 132);
triangle(shx+80,shy+250,shx+76,shy+258,shx+90,shy+277);

fill(242, 128, 128);
triangle(shx+80,shy+250,shx+87,shy+248,shx+90,shy+277);

fill(230, 143, 143);
triangle(shx+95,shy+250,shx+87,shy+248,shx+90,shy+277);

fill(255, 168, 168);
triangle(shx+101,shy+256,shx+95,shy+250,shx+90,shy+277);

fill(252, 194, 194);
triangle(shx+100,shy+267,shx+101,shy+256,shx+90,shy+277);

        
        
        strokeWeight(5);
        stroke(116, 122, 176);
        fill(161, 168, 237, 150);
        if (mouseX > 150 && mouseX < 450 && mouseY > sin(millis() / 7) * 10 + 300 && mouseY < sin(millis() / 7) * 10 + 400) {
            fill(161, 168, 237, 255);
        }
        rect(150, sin(millis() / 7) * 10 + 300, 300, 100, 20);
        fill(255, 255, 255);
        textSize(50);
        text("Resume", 300, sin(millis() / 7) * 10 + 365);
        
        fish();
    }
};

mouseClicked = function() {
    if (scene === "menu") {
        if ((300 - mouseX) * (300 - mouseX) + (355 - mouseY) * (355 - mouseY) <= 6889) {
            fadeOut();
            bubble1s = [];
            for (var i = 50; i < 600; i += 50) {
                bubble1s.push(new Bubble(random(30, 570), i, bubbleDelay, 1, false));
            }
            bubbleDelay = 50;
        }
    }
    if (scene === "room2" && abovePause === true) {
        paused = true;
    }
    if (paused === true && mouseX > 150 && mouseX < 450 && mouseY > sin(millis() / 7) * 10 + 300 && mouseY < sin(millis() / 7) * 10 + 400) {
        paused = false;
    }
};
