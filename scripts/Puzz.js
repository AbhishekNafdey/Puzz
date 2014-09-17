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
        this.rowCountField = $("#rowCount");
        this.allCells = "";

        this.rowCount = 0;
        this.cells = [];
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
    }

    Puzz.prototype.drawBoard = function(){
        this.rowCount = this.rowCountField.val();
           var temp = 0;
        for (var i = 0; i < this.rowCount; i += 1) {
            this.cells[i] = [];

            for (var j = 0; j < this.rowCount; j += 1) {
                $("<li>").addClass("cell").addClass(this.colors[i]).html(temp).appendTo(this.canvas);
                temp++;
              //  this.cells[i][j] = cell;
            }
        }
         this.allCells =   this.canvas.find(".cell");
        $(this.allCells[0]).removeClass("red").addClass("blank");
        this.canvas.css({"width":(38 *this.rowCount)+"px"});

    };

    Puzz.prototype.Shuffle = function(){
        this.intervalHolder = setInterval($.proxy(this.Exchange,this),50);
    }

    Puzz.prototype.StopShuffle = function(){
       window.clearInterval(this.intervalHolder);
    }

    Puzz.prototype.Exchange = function(){
    var blankCell = $(".blank");
    var tempSide = this.sides[Math.floor(Math.random() * 4)];
    var sideCell =  this.getCell(tempSide,this.allCells.index(blankCell));

    if(sideCell.length > 0){
        var tempClass = sideCell.attr('class').split(' ').slice(-1)[0];
        sideCell.removeClass(tempClass).addClass("blank");
        blankCell.removeClass("blank").addClass(tempClass);
    }


    };

    Puzz.prototype.getCell = function(side,currentCell){

        switch(side){
            case "left":
                return $(this.allCells[currentCell-1]);
            case "top":
                return $(this.allCells[currentCell - (this.rowCount-1)]);
            case "right":
                return $(this.allCells[currentCell+1]);
            case "bottom":
                return $(this.allCells[currentCell + (this.rowCount-1)]);


        }

    }

       window.Puzz= Puzz;
})()

window.onload=function(){
    var app  = new Puzz();
};