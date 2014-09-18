/**
 * Created by nafdeya on 19/03/14.
 */

(function(){
    "use strict"

    function Puzz() {
        this.canvas = $("#canvas");
        this.startButton = $("#start");
        this.stopButton = $("#stopShuffle");
        this.shuffleButton = $("#shuffle");
        this.undoButton = $("#undoShuffle");
        this.rowCountField = $("#rowCount");
        this.allCells = "";

        this.rowCount = 0;
        this.cells = [];
        this.undoArray =[];
        this.intervalHolder = null;
        this.colors = ["red","blue","green" ,"yellow","orange","pink"];
        this.sides = ["left","top","right","bottom"]
        this.init();


    }

    Puzz.prototype.init = function(){
      this.bindEvents();
    }

    Puzz.prototype.bindEvents = function(){
    this.startButton.on("click" , $.proxy(this.drawBoard,this));
    this.shuffleButton.on("click" , $.proxy(this.Shuffle,this));
    this.stopButton.on("click" , $.proxy(this.StopShuffle,this));
    this.undoButton.on("click" , $.proxy(this.UndoShuffle,this));
    }

    Puzz.prototype.drawBoard = function(){
        this.rowCount = this.rowCountField.val() -1;
           var temp = 0;
        for (var i = 0; i <= this.rowCount; i++) {
            this.cells[i] = [];

            for (var j = 0; j <= this.rowCount; j++) {
                var cell = $("<li>").addClass("cell").addClass(this.colors[i]).html(temp);
                cell[0].cellNumber = [i,j];
               cell.appendTo(this.canvas);
                temp++;
               this.cells[i][j] = cell;
            }
        }

        $(this.cells[0][0]).removeClass("red").addClass("blank");
        this.canvas.css({"width":(38 * (1+this.rowCount))+"px"});

    };

    Puzz.prototype.Shuffle = function(){
        this.intervalHolder = setInterval($.proxy(this.Exchange,this),1500);
    }

    Puzz.prototype.StopShuffle = function(){
       window.clearInterval(this.intervalHolder);
    }

    Puzz.prototype.Exchange = function(){
    var blankCellIndex = $(".blank")[0].cellNumber;
    
    var sideCell =  this.getCell(this.sides[Math.floor(Math.random() * 4)],blankCellIndex);

        if(sideCell.length > 0){
            var tempClass = sideCell.attr('class').split(' ').slice(-1)[0];
            sideCell.removeClass(tempClass).addClass("blank");
            this.cells[blankCellIndex[0]][blankCellIndex[1]].removeClass("blank").addClass(tempClass);
        }
    };

    Puzz.prototype.getCell = function(side,AR){


        switch(side){
            case "left":
                if(AR[1] != 0){
                    return $(this.cells[AR[0]][AR[1]-1]);
                }else{return $("fakeDiv")}
            case "top":
                if(AR[0] != 0){
                    return $(this.cells[AR[0]-1][AR[1]]);
                }else{return $("fakeDiv")}

            case "right":
                if(AR[1] != this.rowCount){
                    return $(this.cells[AR[0]][AR[1]+1]);
                }else{return $("fakeDiv")}

            case "bottom":
                if(AR[0] != this.rowCount){
                    return $(this.cells[AR[0]+1][AR[1]]);
                }else{return $("fakeDiv")}

        }



    }

       window.Puzz= Puzz;
})()

window.onload=function(){
    var app  = new Puzz();
};