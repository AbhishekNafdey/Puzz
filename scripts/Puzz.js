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
        this.colors = [];
        this.sides = ["left","top","right","bottom"]
        this.init();


    }

    Puzz.prototype.init = function(){
      this.bindEvents();
    }

    Puzz.prototype.getColors = function(){
        var color = "#"+((1<<24)*Math.random()|0).toString(16);
        if(this.colors.join("").toString().indexOf(color) == -1){
            this.colors.push(color);
            return color;
        }else{
            return  this.getColors();
        }
    }

    Puzz.prototype.bindEvents = function(){
    this.startButton.on("click" , $.proxy(this.drawBoard,this));
    this.shuffleButton.on("click" , $.proxy(this.Shuffle,this));
    this.stopButton.on("click" , $.proxy(this.StopShuffle,this));
    this.undoButton.on("click" , $.proxy(this.UndoShuffle,this));
    }

    Puzz.prototype.UndoShuffle = function(){
        this.clearInterval();
            var curr = $(".blank")[0].cellNumber;
            var prev = this.undoArray.pop();
            var self= this;

            $.proxy(this.ToggleClasses(curr,$(this.cells[prev[0]][prev[1]])),this);

            setTimeout(function(){
                if(self.undoArray.length> 0){
                    $.proxy( self.UndoShuffle(),self);
                }
            },50);
    };

    Puzz.prototype.clearInterval = function(){
        window.clearInterval(this.intervalHolder);
    };

    Puzz.prototype.drawBoard = function(){
        this.canvas.html("");
        this.rowCount = this.rowCountField.val() -1;

        for (var i = 0; i <= this.rowCount; i++) {
            this.cells[i] = [];
            var color = this.getColors();
            for (var j = 0; j <= this.rowCount; j++) {
                var cell = $("<li>")
                    .addClass("cell")
                    .css({"background-color":color});

                cell[0].cellNumber = [i,j];
                cell.appendTo(this.canvas);
                this.cells[i][j] = cell;
            }
        }

        $(this.cells[0][0]).removeClass("red").addClass("blank").css({"background-color":"#fff"});
        this.canvas.css({"width":(38 * (1+this.rowCount))+"px"});

    };

    Puzz.prototype.Shuffle = function(){
        this.clearInterval()
        this.intervalHolder = setInterval($.proxy(this.Exchange,this),50);
    }

    Puzz.prototype.StopShuffle = function(){
       this.clearInterval();
      // this.undoArray.push($(".blank")[0].cellNumber);
    }

    Puzz.prototype.Exchange = function(){
    var blankCellIndex = $(".blank")[0].cellNumber;

    
    var sideCell =  this.getCell(this.sides[Math.floor(Math.random() * 4)],blankCellIndex);

        if(sideCell.length > 0){
          this.ToggleClasses(blankCellIndex,sideCell);
            this.undoArray.push(blankCellIndex);

        }
    };

    Puzz.prototype.ToggleClasses = function(curr,next){

        var tempClass = next.attr('style').split(":").slice(-1)[0].split(";")[0];
        next.css({"background-color":"white"}).addClass("blank");
        this.cells[ curr[0] ] [ curr[1] ].css({"background-color":tempClass}).removeClass("blank");
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