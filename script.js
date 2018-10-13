$( document ).ready(function() {

    var playTime = 5;
    var workTime = 25;
    var currentSession = 'work';
    var countDown = false;
    var secondsRemaining;
    var workHasRun = false;
    var playHasRun = false;
    var intervalHandle;
    
    
    $('#session-time').text(workTime);
    
    function decrementTime() {
        secondsRemaining--;
    }
    
    
    function remainingTime() {
        var min = Math.floor(secondsRemaining / 60);
        var sec = secondsRemaining - (min * 60);
        // add a leading zero (as a string value) if seconds less than 10
        if (sec < 10) {
            sec = "0" + sec;
        }
        
        let message = min + ":" + sec;
        $('#session-time').text(message);
        
        if( secondsRemaining <= 0 ) {
            clearInterval( intervalHandle );
            $('#session-time').text('0:00');
            
            if( currentSession == 'work' ) {
                currentSession = 'play';
                console.log(currentSession)
                playHasRun = false;
                workHasRun = false;
                runCountdown();
                
            } else if( currentSession == 'play' ) {
                console.log('should be setting PLAY HERE')
                playHasRun = false;
                workHasRun = false;
                currentSession = 'work';
                console.log(currentSession)
                runCountdown();
            }
        }
    }
    
    // controls the buttons behaviour when running and stopped
    $('#control-button').click(function() {
        if( countDown == false ) {
            countDown = true;
            console.log('call countdown method and disable buttons')
            runCountdown();
            $('.btn-primary').prop('disabled', true);
        } else {
            clearInterval(intervalHandle);
            countDown = false;
            console.log('enable buttons')
            $('.btn-primary').prop('disabled', false);
        }
        
        var btnClss = $('#control-button').attr("class");
        
        if (btnClss == "btn btn-success") {
            $('#control-button').addClass("btn-warning").removeClass("btn-success");
            $('#control-button').text("Pause");
            
            console.log( $('#control-button').attr("class") )
        } else {
            $('#control-button').addClass("btn-success").removeClass("btn-warning");
            $('#control-button').text("Go!");
        }
    });
    
    function runCountdown() {
        
        if( workHasRun || playHasRun ) {
            decrementTime();
            intervalHandle = setInterval(tick, 1000);

        } else {
            
            if( currentSession == 'work' ) {
                $('#current-session').text('werk werk werk');
                
                secondsRemaining = workTime * 60;
                console.log('getting to work here?')
                workHasRun = true;
            } else if( currentSession == 'play' ) {
                $('#current-session').text('playful joy');
                
                console.log('getting to play here?')
                secondsRemaining = playTime * 60;
                playHasRun = true;
            }
            decrementTime();
            remainingTime();
            
            intervalHandle = setInterval(tick, 1000);
        }
    }
    
    
    function tick() {
        
        decrementTime();
        remainingTime();
    }
    
    
    if( currentSession == 'work' ) {
        $('#current-session').text('werk werk werk');
    } 
    
    if( currentSession == 'play' ) {
        $('#current-session').text('playful joy');
    } 
    
    function displayTime(variable) {
        console.log(variable);
        
        if( variable == playTime ) {
            $('#play-time-value').text( playTime );
        }
        
        if( variable == workTime ) {
            $('#work-time-value').text( workTime );
            
            if( !workHasRun ) {
                $('#session-time').text( workTime );
                
            }
        }
    }
    
    
    $('#play-time').find('.btn').click(function() {
        playHasRun = false;

        let value = $(this).text();
        
        if( value == '-' ) {
            console.log('a minus sign')
            
            if( playTime > 0 ) {
                playTime--;
            }
            displayTime( playTime );
        }
        
        if( value == '+' ) {
            console.log('a plus sign')
            playTime++;
            displayTime( playTime );
        }
    });
    
    $('#work-time').find('.btn').click(function() {
        workHasRun = false;
        
        let value = $(this).text();
        
        if( value == '-' ) {
            console.log('a minus sign')
            
            if( workTime > 0 ) {
                workTime--;
            }
            displayTime( workTime );
        }
        
        if( value == '+' ) {
            console.log('a plus sign')
            workTime++;
            displayTime( workTime );
        }
    });
});