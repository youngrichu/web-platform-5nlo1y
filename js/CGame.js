function CGame(mode, level, oData) {
    var _iTimeElaps = 0;
    var _iDir;
    var _iScore = 0;
    var _iLevelScore;
    var _iGoalNumber;
    var _iScoreForFruit = 0;
    var _iPrecDir = 24; // a value that I'll neve gonna use for snake direction
    var _iTimerFruitElapse;
    var _iFinalSpeed;
    var _iFruitCount = 0; //fruit counter for the increment of speed.
    var _iWasEating = 600; // a value that I'll neve gonna use for snake increment
    var _iLevel = level;
    var _iTimer = 0;
    var _iHead = 0;
    var _iNoMoreGoal = false;
    var _iFinished = 0;

    var _aSnakeSpeed; //speed modifier
    var _aGoal;
    var _aGoalEated;
    var _aGrid;
    var _aSnake; //= {row, col, state, dir};
    var _aTail;
    var _aDirIncrease;

    var _bUpdate = false;
    var _bChangeDir = false;
    var _bPressedKey = false;
    var _bEating = false;
    var _bDead = false;
    var _bCanPress = false;

    var _oApple = {
        x: 0,
        y: 0
    };
    var _oCherry = {
        x: 0,
        y: 0
    };
    var _oPear = {
        x: 0,
        y: 0
    };
    var _oGrapes = {
        x: 0,
        y: 0
    };
    var _oOrange = {
        x: 0,
        y: 0
    };
    var _oStrawberry = {
        x: 0,
        y: 0
    };
    var _oCandyCane = {
        x: 0,
        y: 0
    };
    var _oFries = {
        x: 0,
        y: 0
    };
    var _oLollipop = {
        x: 0,
        y: 0
    };
    var _oPizza = {
        x: 0,
        y: 0
    };
    var _oBurger = {
        x: 0,
        y: 0
    };
    var _oMedicine = {
        x: 0,
        y: 0
    };

    var _oContainerGrid;
    var _oInterface;
    var _oEndPanel = null;
    var _oParent;

    this._init = function () {
        setVolume("soundtrack", 0.5);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_bottom"));
        s_oStage.addChild(oBg);

        _oContainerGrid = new createjs.Container();
        s_oStage.addChild(_oContainerGrid);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_top"));
        s_oStage.addChild(oBg);

        for (var i = 0; i < _iLevel; i++) {
            _iScore += s_aScores[i];
        }

        _oInterface = new CInterface(_iScore);

        _aSnakeSpeed = new Array(
            0,
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
            110,
            120,
            130,
            140,
            150,
            160,
            170,
            180,
            190
        );

        this._createGrid();
        // INIT SNAKE IS CALLED IN "_initLevel"
        // APPLE_ON = false;
        // BANANA_ON = false;
        // EGGPLANT_ON = false;
        // FISH_ON = false;
        // CARROTS_ON = false;
        // TOMATO_ON = false;
        // CANDYCANE_ON = false;
        // FRIES_ON = false;
        // LOLLIPOP_ON = false;
        // PIZZA_ON = false;
        // BURGER_ON = false;
        // MEDICINE_ON = false;

        if (!s_bMobile) {
            document.onkeydown = onKeyDown;
        }
    };

    this._initSnake = function () {
        _aSnake = new Array({
            row: 1,
            col: 1,
            state: "tail",
            dir: RIGHT_DIR
        }, {
            row: 1,
            col: 2,
            state: "body",
            dir: RIGHT_DIR
        }, {
            row: 1,
            col: 3,
            state: "body",
            dir: RIGHT_DIR
        }, {
            row: 1,
            col: 4,
            state: "body",
            dir: RIGHT_DIR
        }, {
            row: 1,
            col: 5,
            state: "head",
            dir: RIGHT_DIR
        });

        for (var i = 0; i < _aSnake.length; i++) {
            _aGrid[_aSnake[i].row][_aSnake[i].col].changeCellState(
                24,
                _aSnake[i].dir,
                _aSnake[i].state
            );
        }

        _aDirIncrease = new Array({
            row: 0,
            col: 1
        }, {
            row: -1,
            col: 0
        }, {
            row: 0,
            col: -1
        }, {
            row: 1,
            col: 0
        });

        _aTail = new Array({
            row: 0,
            col: 0,
            state: "background",
            dir: 0
        });

        _iDir = 0;
    };

    this.unload = function () {
        _oInterface.unload();
        if (_oEndPanel !== null) {
            _oEndPanel.unload();
        }

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this._createGrid = function () {
        if (mode === SURVIVAL_MODE) {
            this._initLevel();
        } else if (mode === ADVENTURE_MODE) {
            this._initLevel();
        }
    };

    this._initLevel = function () {
        $(s_oMain).trigger("start_level", _iLevel);
        //INITIALITING VARIABLES

        _iFinalSpeed = SPEED - _aSnakeSpeed[_iLevel];
        _iFruitCount = 0;
        _iTimeElaps = 0;
        _iDir = 0;
        _iScoreForFruit = 0;
        _iLevelScore = 0;
        _iPrecDir = 24;
        _iTimerFruitElapse = 0;
        _iFruitCount = 0;
        _iWasEating = 600;
        _iFinished = 0;
        _bUpdate = false;
        _bChangeDir = false;
        _bPressedKey = false;
        FRUIT_ON = false;
        _bEating = false;
        _iNoMoreGoal = false;
        APPLE_ON = false;
        BANANA_ON = false;
        EGGPLANT_ON = false;
        FISH_ON = false;
        CARROTS_ON = false;
        TOMATO_ON = false;
        CANDYCANE_ON = false;
        FRIES_ON = false;
        LOLLIPOP_ON = false;
        PIZZA_ON = false;
        BURGER_ON = false;
        MEDICINE_ON = false;

        s_oLevelSetting = new CLevel(_iLevel);

        if (mode === SURVIVAL_MODE) {
            _oInterface.setTimerContainerVisible(false);
        } else if (mode === ADVENTURE_MODE) {
            _oInterface.setTimerContainerVisible(true);
            _iTimer = LEVEL_TIME;
            _aGoal = new Array();
            _aGoalEated = new Array();
            _iGoalNumber = s_oLevelSetting.getGoalNumberInLevel(_iLevel);

            var offset_x = 120;
            var offset_y = 300;
            for (var i = 0; i < _iGoalNumber; i++, offset_y += 80) {
                _aGoal.push(s_oLevelSetting.getGoalInLevel(_iLevel, i));
                _aGoalEated.push(0);
                _oInterface.seeGoal(
                    _aGoal[i].type,
                    _aGoal[i].num,
                    _aGoalEated[i],
                    offset_x,
                    offset_y
                );
            }
        }

        var iX = START_X_GRID;
        var iY = START_Y_GRID;

        //initializing the array
        _aGrid = new Array();
        for (var iRow = 0; iRow < NUM_ROWS; iRow++) {
            _aGrid[iRow] = new Array();
            for (var iCol = 0; iCol < NUM_COLS; iCol++) {
                var iValue = s_oLevelSetting.getCellValueInLevel(
                    _iLevel,
                    NUM_COLS * iRow + iCol
                );
                _aGrid[iRow][iCol] = new CCell(
                    iRow,
                    iCol,
                    iX,
                    iY,
                    _oContainerGrid,
                    iValue
                );
                iX += CELL_WIDTH;
            }
            iY += CELL_HEIGHT;
            iX = START_X_GRID;
        }

        this._initSnake();

        this.onNextLevel(_iLevel, mode);
        this.spawnFruit();
    };

    function onKeyDown(evt) {
        if (!evt) {
            evt = window.event;
        }

        if (_bCanPress === true) {
            if (!_bPressedKey) {
                if (evt.keyCode === 37 && _iDir !== 0) {
                    _bPressedKey = true;
                    _iDir = 2; //left
                    _bChangeDir = true;
                    _iPrecDir = _aSnake[_iHead].dir;
                    _aSnake[_iHead].dir = _iDir;
                    evt.preventDefault();
                    return false;
                } else if (evt.keyCode === 38 && _iDir !== 3) {
                    _bPressedKey = true;
                    _iDir = 1; //up
                    _bChangeDir = true;
                    _iPrecDir = _aSnake[_iHead].dir;
                    _aSnake[_iHead].dir = _iDir;
                    evt.preventDefault();
                    return false;
                } else if (evt.keyCode === 39 && _iDir !== 2) {
                    _bPressedKey = true;
                    _iDir = 0; //right
                    _bChangeDir = true;
                    _iPrecDir = _aSnake[_iHead].dir;
                    _aSnake[_iHead].dir = _iDir;
                    evt.preventDefault();
                    return false;
                } else if (evt.keyCode === 40 && _iDir !== 1) {
                    _bPressedKey = true;
                    _iDir = 3; //down
                    _bChangeDir = true;
                    _iPrecDir = _aSnake[_iHead].dir;
                    _aSnake[_iHead].dir = _iDir;
                    evt.preventDefault();
                    return false;
                } else if (evt.keyCode === 32) {
                    evt.preventDefault();
                    return false;
                }
            }
        }
    }
    //IF PRESSED ANY BUTTON SPRITE
    this._onButtonDirDown = function (_iDirectionSelected) {
        if (!_bPressedKey) {
            if (_iDirectionSelected === 37 && _iDir !== 0) {
                _bPressedKey = true;
                _iDir = 2; //left
                _bChangeDir = true;
                _iPrecDir = _aSnake[_iHead].dir;
                _aSnake[_iHead].dir = _iDir;
                _oInterface._onDirectionLeave();
            } else if (_iDirectionSelected === 38 && _iDir !== 3) {
                _bPressedKey = true;
                _iDir = 1; //up
                _bChangeDir = true;
                _iPrecDir = _aSnake[_iHead].dir;
                _aSnake[_iHead].dir = _iDir;
                _oInterface._onDirectionLeave();
            } else if (_iDirectionSelected === 39 && _iDir !== 2) {
                _bPressedKey = true;
                _iDir = 0; //right
                _bChangeDir = true;
                _iPrecDir = _aSnake[_iHead].dir;
                _aSnake[_iHead].dir = _iDir;
                _oInterface._onDirectionLeave();
            } else if (_iDirectionSelected === 40 && _iDir !== 1) {
                _bPressedKey = true;
                _iDir = 3; //down
                _bChangeDir = true;
                _iPrecDir = _aSnake[_iHead].dir;
                _aSnake[_iHead].dir = _iDir;
                _oInterface._onDirectionLeave();
            }
        }
    };

    this._moveSnake = function () {
        _iHead = _aSnake.length - 1;
        _aTail = [{
            row: _aSnake[0].row,
            col: _aSnake[0].col,
            state: _aSnake[0].state,
            dir: _aSnake[0].dir
        }];

        for (var i = 0; i < _iHead; i++) {
            _aSnake[i].row = _aSnake[i + 1].row;
            _aSnake[i].col = _aSnake[i + 1].col;

            if (_aSnake[i].state === "curves" || _aSnake[i].state === "eating") {
                _aSnake[i].state = "body";
            }
            if (_bChangeDir && _aSnake[i].dir !== _aSnake[i + 1].dir && i > 0) {
                _aSnake[i].state = "curves";
            }
            if (i > 0 && i + 1 !== _iHead) {
                _aSnake[i].state = _aSnake[i + 1].state;
            }

            _aSnake[i].dir = _aSnake[i + 1].dir;
        }

        //REFRESH HEAD POSITION
        _aSnake[_iHead].row += _aDirIncrease[_iDir].row;
        _aSnake[_iHead].col += _aDirIncrease[_iDir].col;

        //IN CASE THE HEAD WILL GO OVER THE GRID, IL GET THAT BACK.
        if (_aSnake[i].row >= NUM_ROWS) {
            _aSnake[i].row = 0;
        } else if (_aSnake[i].row < 0) {
            _aSnake[i].row = NUM_ROWS - 1;
        } else if (_aSnake[i].col >= NUM_COLS) {
            _aSnake[i].col = 0;
        } else if (_aSnake[i].col < 0) {
            _aSnake[i].col = NUM_COLS - 1;
        }

        // TAKING CARE OF THE EATING STATE
        if (_bEating === true) {
            if (_aSnake[_iHead - 1].state !== "curves") {
                _aSnake[_iHead - 1].state = "eating";
                _aSnake[_iHead].state = "head";
            } else if (_aSnake[_iHead - 1].state === "curves") {
                _iWasEating = _iHead - 1;
            }
            _bEating = false;
        }

        //TAKING CARE OF STATE IF THE SNAKE EATS BUT IT CHANGED DIRECTION
        if (_iWasEating - 1 > 0 && _iWasEating !== 600) {
            //600 IS A MAXIMUM NUMBER.
            _iWasEating--; //THIS WILL REMIND ME THE LAST ONE ELEMENT OF SNAKE
        } else if (_iWasEating - 1 === 0) {
            //AND IF IT IS
            _aSnake[1].state = "body"; //I'LL SAY THAT IS NOW IT'S BODY
            _aSnake = _aTail.concat(_aSnake); //AND I'LL INCREASE THE NUMBER OF ELEMENTS OF SNAKE   
            _iHead = _aSnake.length - 1;
            _iWasEating = 600;
            _aGrid[_aTail[0].row][_aTail[0].col].changeCellState(
                _iPrecDir,
                _aTail[0].dir,
                _aTail[0].state
            );
        }

        //TAKING CARE OF STATE IF THE SNAKE EATS BUT IT DOESN'T CHANGED DIRECTION
        if (_aSnake[1].state === "eating") {
            //IF LAST ONE IS IN STATE "EATING"
            _aSnake[1].state = "body"; //I'LL CHANGE IT IN BODY
            _aSnake = _aTail.concat(_aSnake); //THEN I'LL INCREASE THE NUMBER OF ELEMENTS OF SNAKE
            _iHead = _aSnake.length - 1;
            _aGrid[_aTail[0].row][_aTail[0].col].changeCellState(
                _iPrecDir,
                _aTail[0].dir,
                _aTail[0].state
            );
        }
        _aTail[0].state = "background";
        _aGrid[_aTail[0].row][_aTail[0].col].changeCellState(
            _iPrecDir,
            _aTail[0].dir,
            _aTail[0].state
        );

        //OPERATION ON THE SNAKE
        _aGrid[_aSnake[0].row][_aSnake[0].col].changeCellState(
            _iPrecDir,
            _aSnake[0].dir,
            "tail"
        ); //PRINTING TAIL

        var currentCellValue = _aGrid[(_aSnake[_iHead].row)][_aSnake[_iHead].col].getValue();

        if (["apple", "cherry", "pear", "grapes", "orange", "strawberry",
            "candycane", "fries", "lollipop", "pizza", "burger", "medicine"]
            .includes(currentCellValue))
            this.fruitEaten(currentCellValue);
        else if (
            currentCellValue !== "background"
        ) {
            //HITTED MYSELF OR A WALL
            _bUpdate = false;
            _bDead = true;
            this.gameOver();
            return;
        }
        //PRINT THE SNAKE ON THE SCREEN
        _aGrid[_aSnake[_iHead].row][_aSnake[_iHead].col].changeCellState(
            _iPrecDir,
            _aSnake[_iHead].dir,
            _aSnake[_iHead].state
        ); //HEAD
        _aGrid[_aSnake[_iHead - 1].row][_aSnake[_iHead - 1].col].changeCellState(
            _iPrecDir,
            _aSnake[_iHead - 1].dir,
            _aSnake[_iHead - 1].state
        ); //BODY

        this.anyFruit(_aSnake[_iHead].row, _aSnake[_iHead].col);

        if (_bPressedKey) {
            _bPressedKey = false;
        }
    };

    this.anyFruit = function (irow, icol) {
        if (irow + 1 < NUM_ROWS) {
            if (
                _aGrid[irow + 1][icol].getValue() === "apple" ||
                _aGrid[irow + 1][icol].getValue() === "cherry" ||
                _aGrid[irow + 1][icol].getValue() === "pear" ||
                _aGrid[irow + 1][icol].getValue() === "grapes" ||
                _aGrid[irow + 1][icol].getValue() === "orange" ||
                _aGrid[irow + 1][icol].getValue() === "strawberry" ||
                _aGrid[irow + 1][icol].getValue() === "candycane" ||
                _aGrid[irow + 1][icol].getValue() === "fries" ||
                _aGrid[irow + 1][icol].getValue() === "lollipop" ||
                _aGrid[irow + 1][icol].getValue() === "pizza" ||
                _aGrid[irow + 1][icol].getValue() === "burger" ||
                _aGrid[irow + 1][icol].getValue() === "medicine"
            ) {
                _aGrid[irow][icol].changeCellState(
                    _iPrecDir,
                    _aSnake[_iHead].dir,
                    "mouth_opened"
                );
            }
        }
        if (icol + 1 < NUM_COLS) {
            if (
                _aGrid[irow][icol + 1].getValue() === "apple" ||
                _aGrid[irow][icol + 1].getValue() === "cherry" ||
                _aGrid[irow][icol + 1].getValue() === "pear" ||
                _aGrid[irow][icol + 1].getValue() === "grapes" ||
                _aGrid[irow][icol + 1].getValue() === "orange" ||
                _aGrid[irow][icol + 1].getValue() === "strawberry" ||
                _aGrid[irow][icol + 1].getValue() === "candycane" ||
                _aGrid[irow][icol + 1].getValue() === "fries" ||
                _aGrid[irow][icol + 1].getValue() === "lollipop" ||
                _aGrid[irow][icol + 1].getValue() === "pizza" ||
                _aGrid[irow][icol + 1].getValue() === "burger" ||
                _aGrid[irow][icol + 1].getValue() === "medicine"
            ) {
                _aGrid[irow][icol].changeCellState(
                    _iPrecDir,
                    _aSnake[_iHead].dir,
                    "mouth_opened"
                );
            }
        }
        if (irow - 1 >= 0) {
            if (
                _aGrid[irow - 1][icol].getValue() === "apple" ||
                _aGrid[irow - 1][icol].getValue() === "cherry" ||
                _aGrid[irow - 1][icol].getValue() === "pear" ||
                _aGrid[irow - 1][icol].getValue() === "grapes" ||
                _aGrid[irow - 1][icol].getValue() === "orange" ||
                _aGrid[irow - 1][icol].getValue() === "strawberry" ||
                _aGrid[irow - 1][icol].getValue() === "candycane" ||
                _aGrid[irow - 1][icol].getValue() === "fries" ||
                _aGrid[irow - 1][icol].getValue() === "lollipop" ||
                _aGrid[irow - 1][icol].getValue() === "pizza" ||
                _aGrid[irow - 1][icol].getValue() === "burger" ||
                _aGrid[irow - 1][icol].getValue() === "medicine"
            ) {
                _aGrid[irow][icol].changeCellState(
                    _iPrecDir,
                    _aSnake[_iHead].dir,
                    "mouth_opened"
                );
            }
        }
        if (icol - 1 > 0) {
            if (
                _aGrid[irow][icol - 1].getValue() === "apple" ||
                _aGrid[irow][icol - 1].getValue() === "cherry" ||
                _aGrid[irow][icol - 1].getValue() === "pear" ||
                _aGrid[irow][icol - 1].getValue() === "grapes" ||
                _aGrid[irow][icol - 1].getValue() === "orange" ||
                _aGrid[irow][icol - 1].getValue() === "strawberry" ||
                _aGrid[irow][icol - 1].getValue() === "candycane" ||
                _aGrid[irow][icol - 1].getValue() === "fries" ||
                _aGrid[irow][icol - 1].getValue() === "lollipop" ||
                _aGrid[irow][icol - 1].getValue() === "pizza" ||
                _aGrid[irow][icol - 1].getValue() === "burger" ||
                _aGrid[irow][icol - 1].getValue() === "medicine"
            ) {
                _aGrid[irow][icol].changeCellState(
                    _iPrecDir,
                    _aSnake[_iHead].dir,
                    "mouth_opened"
                );
            }
        }
    };

    this.medicineEaten = function () {
        // CHANGES CURRENT TAIL STATE TO BACKGROUND AND REMOVE IT FROM BODY, SETS NEW TAIL. 
        // CHECKS IF BODY BIGGER THAN ONE OTHERWISE IT'S TOO SHORT AND DOES NOTHING.
        if (_aSnake.length < MEDICINE_EFFECT) {
            // console.log("TOO SHORT, DOES NOTHING", _aSnake.length)
            return; // TOO SHORT, DOES NOTHING
        }

        var currentTail = null;
        // REMOVED NUMBER OF TAILS BASED ON SETTINGS VARIABLE.
        for (let i = 0; i < MEDICINE_EFFECT; i++) {
            currentTail = _aSnake.shift();
            currentTail.state = 'background';
            _aGrid[currentTail.row][currentTail.col].changeCellState(_iPrecDir, currentTail.dir, currentTail.state);
        }


        _aTail = [currentTail];
        var newTail = _aSnake[0];
        newTail.state = 'tail';
        _aGrid[newTail.row][newTail.col].changeCellState(_iPrecDir, newTail.dir, newTail.state);

        _iHead = _aSnake.length - 1;

        this._deleteFruit();

    }

    this.fruitEaten = function (fruit) {
        var iTmpScore = 0;
        if (fruit === "apple") {
            iTmpScore++;
            _iScoreForFruit++;
            APPLE_ON = false;
        }
        if (fruit === "cherry") {
            iTmpScore++;
            _iScoreForFruit++;
            BANANA_ON = false;
        }
        if (fruit === "pear") {
            iTmpScore++;
            _iScoreForFruit++;
            EGGPLANT_ON = false;
        }
        if (fruit === "orange") {
            iTmpScore++;
            _iScoreForFruit++;
            FISH_ON = false;
        }
        if (fruit === "grapes") {
            iTmpScore++;
            _iScoreForFruit++;
            CARROTS_ON = false;
        }
        if (fruit === "strawberry") {
            iTmpScore++;
            _iScoreForFruit++;
            TOMATO_ON = false;
        }
        if (fruit === "candycane") {
            iTmpScore++;
            _iScoreForFruit++;
            CANDYCANE_ON = false;
        }
        if (fruit === "fries") {
            iTmpScore++;
            _iScoreForFruit++;
            FRIES_ON = false;
        }
        if (fruit === "lollipop") {
            iTmpScore++;
            _iScoreForFruit++;
            LOLLIPOP_ON = false;
        }
        if (fruit === "pizza") {
            iTmpScore++;
            _iScoreForFruit++;
            PIZZA_ON = false;
        }
        if (fruit === "burger") {
            iTmpScore++;
            _iScoreForFruit++;
            BURGER_ON = false;
        }
        if (fruit === "grapes") {
            iTmpScore++;
            _iScoreForFruit++;
            CARROTS_ON = false;
        }
        if (fruit === "medicine") {
            
            this.medicineEaten();
            
            iTmpScore += Math.floor(
                (_iTimerFruitElapse + 100) / 1000 + _aSnakeSpeed[_iLevel] / 10
            );
        }
        // if (fruit === 'strawberry'){
        //     iTmpScore++;
        //     _iScoreForFruit++;
        //     BANANA_ON = false;

        // }

        // else if ( fruit === 'pear'){
        //         iTmpScore+=Math.floor((_iTimerFruitElapse+100)/1000+(_aSnakeSpeed[_iLevel]/10));

        // }else if ( fruit === 'grapes'){
        //         iTmpScore+=Math.floor((_iTimerFruitElapse+100)/1000+(_aSnakeSpeed[_iLevel]/10));

        // }else if ( fruit === 'orange'){
        //         iTmpScore+=Math.floor((_iTimerFruitElapse+100)/1000+(_aSnakeSpeed[_iLevel]/10));

        // }else if ( fruit === 'strawberry'){
        //         iTmpScore+=Math.floor((_iTimerFruitElapse+100)/1000+(_aSnakeSpeed[_iLevel]/10));

        // }

        _iLevelScore += iTmpScore;
        _iScore += iTmpScore;

        playSound("eating", 1, false);

        var offset_x = 100;
        var offset_y = 300;

        for (var i = 0; i < _iGoalNumber; i++, offset_y += 100) {
            if (_aGoal[i].type === fruit) {
                if (_aGoalEated[i] < _aGoal[i].num) {
                    _aGoalEated[i] += 1;
                    if (_aGoalEated[i] === _aGoal[i].num) {
                        _iFinished++;
                    }

                    _oInterface.seeGoalLeft(_aGoal[i].num, _aGoalEated[i], i);
                }
            }
        }
        if (_iFinished === _iGoalNumber) {
            if (!_iNoMoreGoal) {
                playSound("goal", 1, false);
            }
            _iNoMoreGoal = true;
        }

        _bEating = true;

        _oInterface.refreshScore(_iScore);
        if (mode === SURVIVAL_MODE) {
            if (_aSnakeSpeed[0] < SPEED) {
                if (_iFruitCount === APPLE_TO_EAT_SURVIVAL) {
                    _iFruitCount = 0;
                    _aSnakeSpeed[0] += 10;
                }
            }
            _iFruitCount++;
        }

        this.spawnFruit();
    };

    this.spawnFruit = function () {
        if (APPLE_ON === false) {
            do {
                _oApple.x = Math.floor(Math.random() * NUM_ROWS);
                _oApple.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oApple.x][_oApple.y].getValue() !== "background");
            _aGrid[_oApple.x][_oApple.y].changeCellState(24, 24, "apple");
            APPLE_ON = true;
        }
        if (BANANA_ON === false) {
            do {
                _oCherry.x = Math.floor(Math.random() * NUM_ROWS);
                _oCherry.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oCherry.x][_oCherry.y].getValue() !== "background");
            _aGrid[_oCherry.x][_oCherry.y].changeCellState(24, 24, "cherry");
            BANANA_ON = true;
        }
        if (EGGPLANT_ON === false) {
            do {
                _oPear.x = Math.floor(Math.random() * NUM_ROWS);
                _oPear.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oPear.x][_oPear.y].getValue() !== "background");
            _aGrid[_oPear.x][_oPear.y].changeCellState(24, 24, "pear");
            EGGPLANT_ON = true;
        }
        if (FISH_ON === false) {
            do {
                _oOrange.x = Math.floor(Math.random() * NUM_ROWS);
                _oOrange.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oOrange.x][_oOrange.y].getValue() !== "background");
            _aGrid[_oOrange.x][_oOrange.y].changeCellState(24, 24, "orange");
            FISH_ON = true;
        }
        if (CARROTS_ON === false) {
            do {
                _oGrapes.x = Math.floor(Math.random() * NUM_ROWS);
                _oGrapes.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oGrapes.x][_oGrapes.y].getValue() !== "background");
            _aGrid[_oGrapes.x][_oGrapes.y].changeCellState(24, 24, "grapes");
            CARROTS_ON = true;
        }
        if (TOMATO_ON === false) {
            do {
                _oStrawberry.x = Math.floor(Math.random() * NUM_ROWS);
                _oStrawberry.y = Math.floor(Math.random() * NUM_COLS);
            } while (
                _aGrid[_oStrawberry.x][_oStrawberry.y].getValue() !== "background"
            );
            _aGrid[_oStrawberry.x][_oStrawberry.y].changeCellState(24, 24, "strawberry");
            TOMATO_ON = true;
        }
        if (CANDYCANE_ON === false) {
            do {
                _oCandyCane.x = Math.floor(Math.random() * NUM_ROWS);
                _oCandyCane.y = Math.floor(Math.random() * NUM_COLS);
            } while (
                _aGrid[_oCandyCane.x][_oCandyCane.y].getValue() !== "background"
            );
            _aGrid[_oCandyCane.x][_oCandyCane.y].changeCellState(24, 24, "candycane");
            CANDYCANE_ON = true;
        }
        if (FRIES_ON === false) {
            do {
                _oFries.x = Math.floor(Math.random() * NUM_ROWS);
                _oFries.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oFries.x][_oFries.y].getValue() !== "background");
            _aGrid[_oFries.x][_oFries.y].changeCellState(24, 24, "fries");
            FRIES_ON = true;
        }
        if (LOLLIPOP_ON === false) {
            do {
                _oLollipop.x = Math.floor(Math.random() * NUM_ROWS);
                _oLollipop.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oLollipop.x][_oLollipop.y].getValue() !== "background");
            _aGrid[_oLollipop.x][_oLollipop.y].changeCellState(24, 24, "lollipop");
            LOLLIPOP_ON = true;
        }
        if (PIZZA_ON === false) {
            do {
                _oPizza.x = Math.floor(Math.random() * NUM_ROWS);
                _oPizza.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oPizza.x][_oPizza.y].getValue() !== "background");
            _aGrid[_oPizza.x][_oPizza.y].changeCellState(24, 24, "pizza");
            PIZZA_ON = true;
        }
        if (BURGER_ON === false) {
            do {
                _oBurger.x = Math.floor(Math.random() * NUM_ROWS);
                _oBurger.y = Math.floor(Math.random() * NUM_COLS);
            } while (_aGrid[_oBurger.x][_oBurger.y].getValue() !== "background");
            _aGrid[_oBurger.x][_oBurger.y].changeCellState(24, 24, "burger");
            BURGER_ON = true;
        }
        if (mode === SURVIVAL_MODE) {
            if (_iScoreForFruit === APPLE_TO_EAT_SURVIVAL && FRUIT_ON === false) {
                do {
                    _oMedicine.x = Math.floor(Math.random() * NUM_ROWS);
                    _oMedicine.y = Math.floor(Math.random() * NUM_COLS);
                } while (
                    _aGrid[_oMedicine.x][_oMedicine.y].getValue() !== "background"
                );
                _aGrid[_oMedicine.x][_oMedicine.y].changeCellState(24, 24, "medicine");
                FRUIT_ON = true;
                _iScoreForFruit = 0;
                _iTimerFruitElapse = TIME_FRUIT;
                _oInterface.setContainerVisible(true);

                playSound("appear_fruit", 1, false);
            }
        } else {
            if (_iScoreForFruit === APPLE_TO_EAT_ADVENTURE && FRUIT_ON === false) {
                do {
                    _oCherry.x = Math.floor(Math.random() * NUM_ROWS);
                    _oCherry.y = Math.floor(Math.random() * NUM_COLS);
                } while (_aGrid[_oCherry.x][_oCherry.y].getValue() !== "background");
                _aGrid[_oCherry.x][_oCherry.y].changeCellState(24, 24, "cherry");
                do {
                    _oPear.x = Math.floor(Math.random() * NUM_ROWS);
                    _oPear.y = Math.floor(Math.random() * NUM_COLS);
                } while (_aGrid[_oPear.x][_oPear.y].getValue() !== "background");
                _aGrid[_oPear.x][_oPear.y].changeCellState(24, 24, "pear");
                do {
                    _oOrange.x = Math.floor(Math.random() * NUM_ROWS);
                    _oOrange.y = Math.floor(Math.random() * NUM_COLS);
                } while (_aGrid[_oOrange.x][_oOrange.y].getValue() !== "background");
                _aGrid[_oOrange.x][_oOrange.y].changeCellState(24, 24, "orange");
                do {
                    _oGrapes.x = Math.floor(Math.random() * NUM_ROWS);
                    _oGrapes.y = Math.floor(Math.random() * NUM_COLS);
                } while (_aGrid[_oGrapes.x][_oGrapes.y].getValue() !== "background");
                _aGrid[_oGrapes.x][_oGrapes.y].changeCellState(24, 24, "grapes");
                do {
                    _oStrawberry.x = Math.floor(Math.random() * NUM_ROWS);
                    _oStrawberry.y = Math.floor(Math.random() * NUM_COLS);
                } while (
                    _aGrid[_oStrawberry.x][_oStrawberry.y].getValue() !== "background"
                );
                _aGrid[_oStrawberry.x][_oStrawberry.y].changeCellState(
                    24,
                    24,
                    "strawberry"
                );

                FRUIT_ON = true;
                _iScoreForFruit = 0;
                _iTimerFruitElapse = TIME_FRUIT;
                _oInterface.setContainerVisible(true);

                playSound("appear_fruit", 1, false);
            }
        }
    };

    this._deleteFruit = function () {
        if (mode === SURVIVAL_MODE) {
            if (_iTimerFruitElapse > 0) {
                _iScore += Math.floor(
                    _iTimerFruitElapse / 1000 + _aSnakeSpeed[_iLevel] / 10
                );
                _iLevelScore += Math.floor(
                    _iTimerFruitElapse / 1000 + _aSnakeSpeed[_iLevel] / 10
                );
            }
        }
        // if(_aGrid[_oCherry.x][_oCherry.y].getValue() === 'cherry'){
        //     _aGrid[_oCherry.x][_oCherry.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oPear.x][_oPear.y].getValue() === 'pear'){
        //     _aGrid[_oPear.x][_oPear.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oOrange.x][_oOrange.y].getValue() === 'orange'){
        //     _aGrid[_oOrange.x][_oOrange.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oGrapes.x][_oGrapes.y].getValue() === 'grapes'){
        //     _aGrid[_oGrapes.x][_oGrapes.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oStrawberry.x][_oStrawberry.y].getValue() === 'strawberry'){
        //     _aGrid[_oStrawberry.x][_oStrawberry.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oStrawberry.x][_oStrawberry.y].getValue() === 'strawberry'){
        //     _aGrid[_oStrawberry.x][_oStrawberry.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oCandyCane.x][_oCandyCane.y].getValue() === 'candycane'){
        //     _aGrid[_oCandyCane.x][_oCandyCane.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oFries.x][_oFries.y].getValue() === 'fries'){
        //     _aGrid[_oFries.x][_oFries.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oLollipop.x][_oLollipop.y].getValue() === 'lollipop'){
        //     _aGrid[_oLollipop.x][_oLollipop.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oPizza.x][_oPizza.y].getValue() === 'pizza'){
        //     _aGrid[_oPizza.x][_oPizza.y].changeCellState(24, 24, 'background');
        // }
        // if(_aGrid[_oBurger.x][_oBurger.y].getValue() === 'burger'){
        //     _aGrid[_oBurger.x][_oBurger.y].changeCellState(24, 24, 'background');
        // }
        if (_aGrid[_oMedicine.x][_oMedicine.y].getValue() === "medicine") {
            _aGrid[_oMedicine.x][_oMedicine.y].changeCellState(24, 24, "background");
        }

        FRUIT_ON = false;
        _oInterface.refreshTime("00:00");
        _iScoreForFruit = 0;
        _iTimerFruitElapse = 0;
        _oInterface.setContainerVisible(false);
    };

    this.onNextLevel = function (_iLevel, mode) {
        _bUpdate = false;
        _bCanPress = false;
        new CNextLevel(
            s_oSpriteLibrary.getSprite("msg_box"),
            _iLevel,
            mode,
            _iScore
        );
    };

    this.onNextLevelExit = function () {
        _bUpdate = true;
        _bCanPress = true;
    };

    this.onExit = function () {
        $(s_oMain).trigger("end_level", _iLevel);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");

        this.unload();
        s_oMain.gotoMenu();
    };

    this.gameOver = function () {
        _bUpdate = false;

        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"), _iLevel);

        if (mode === ADVENTURE_MODE && !_bDead && _iTimer < 0 && !_iNoMoreGoal) {
            _oEndPanel.GameOverAdventure(_iScore, mode);
        } else if (
            mode === ADVENTURE_MODE &&
            s_oLevelSetting.getLevelMax() === _iLevel &&
            !_bDead &&
            _iNoMoreGoal
        ) {
            _oEndPanel.win(_iScore, mode);

            this.saveProgress();
        } else if (_bDead) {
            _aGrid[0][0]._deathEffect(_oContainerGrid, _oEndPanel, _iScore, mode);
            playSound("game_over", 1, false);
        }
    };

    this.saveProgress = function () {
        //trace("s_iLastLevel "+s_oLevelSetting.getLevelMax());
        if (_iLevel < s_oLevelSetting.getLevelMax() && _iLevel >= s_iLastLevel) {
            s_iLastLevel = _iLevel + 1;
        }

        //trace("s_iLastLevel "+s_iLastLevel);
        //trace("_iLevel "+_iLevel)

        //trace("_iLevelScore "+_iLevelScore);
        //trace("s_aScores["+(_iLevel)+"] "+s_aScores[_iLevel])
        if (_iLevelScore > s_aScores[_iLevel]) {
            s_aScores[_iLevel] = _iLevelScore;
        }
        //trace("s_aScores["+(_iLevel)+"] "+s_aScores[_iLevel])
        saveItem("snake_level", s_iLastLevel);
        saveItem("snake_scores", JSON.stringify(s_aScores));
    };

    this.onPause = function () {
        _bUpdate = false;
        new CPausePanel(s_oSpriteLibrary.getSprite("msg_box"));
    };

    this.onPauseExit = function () {
        _bUpdate = true;
    };

    this.update = function () {
        if (_bUpdate) {
            _iTimeElaps += s_iTimeElaps;
            if (_iTimeElaps > SPEED - _aSnakeSpeed[_iLevel]) {
                _iTimeElaps = 0;
                this._moveSnake();
            }
            if (mode === ADVENTURE_MODE) {
                _iTimer -= s_iTimeElaps;
                if (_iTimer < 0) {
                    if (!_iNoMoreGoal) {
                        this.gameOver();
                    } else if (
                        _iNoMoreGoal &&
                        s_oLevelSetting.getLevelMax() === _iLevel
                    ) {
                        this.gameOver();
                    } else if (_iNoMoreGoal) {
                        this.saveProgress();
                        _oContainerGrid.removeAllChildren();
                        _oInterface.resetGoalInterface(_iLevel);

                        this._initLevel(_iLevel++);
                    }
                }
                if (_bUpdate) {
                    _oInterface.refreshTimeLeft(formatTime(_iTimer));
                }
            }
        }
        if (FRUIT_ON) {
            _iTimerFruitElapse -= s_iTimeElaps;
            if (_iTimerFruitElapse <= 0) {
                this._deleteFruit();
            }

            _oInterface.refreshTime(formatTime(_iTimerFruitElapse));
        }
    };

    s_oGame = this;
    _oParent = this;

    TIME_FRUIT = oData.time_fruit;
    APPLE_TO_EAT_ADVENTURE = oData.apple_eat_adventure;
    APPLE_TO_EAT_SURVIVAL = oData.apple_eat_survival;
    SPEED = oData.starting_speed_snake;
    LEVEL_TIME = oData.level_time;

    this._init();
}

var s_oGame;