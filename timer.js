class Timer
{
    constructor(counter, playBtn, pauseBtn, resetBtn)
    {
        this.counter = counter;
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;
        this.resetBtn = resetBtn;
        this.isTimerPaused = false;
        this.isTimerRunning = false;
        this.lastCounterTime = 30;
    }
    
    init()
    {
        this.initPlayAction();
        this.initPauseAction();
        this.initResetAction();
    }

    isTimerStatusMismatch(runningStatus)
    {
        if(this.isTimerRunning === runningStatus) return false;

        switch(this.isTimerRunning)
        {
            case true:
                console.log("Timer still running, try pause and reset!!");
                break;
            case false:
                console.log("Timer is not running!!");
                break;
        }
        return true;
    }

    setCounterStatus(status)
    {
        this.isTimerRunning = status;
        this.counter.disabled = status;
    }

    initPlayAction()
    {
        const {playBtn, counter} = this;

        playBtn.addEventListener("click", () => {
            if(this.isTimerStatusMismatch(false)) return;

            let time = parseInt(counter.value);
            if(!time || time < 1)
            {
                console.log("Invalid value for time is given, try value greater than 0!!");
                counter.value = "0";
                return;
            }

            if(!this.isTimerPaused)
            {
                this.lastCounterTime = time;
            }

            this.isTimerPaused = false;
            this.setCounterStatus(true);

            this.counterID = setInterval(()=> {
                counter.value = --time;
                
                if(time === 0)
                {
                    this.setCounterStatus(false);
                    clearInterval(this.counterID);
                }
            }, 1000);
        });
    }

    initPauseAction()
    {
        const {pauseBtn} = this;

        pauseBtn.addEventListener("click", () => {
            if(this.isTimerStatusMismatch(true)) return;
            
            this.isTimerPaused = true;
            this.setCounterStatus(false);
            clearInterval(this.counterID);
        });
    }

    initResetAction()
    {
        const {resetBtn, counter} = this;

        resetBtn.addEventListener("click", () => {
            if(this.isTimerStatusMismatch(false)) return;

            if(counter.value == this.lastCounterTime)
            {
                console.log("Timer is not yet started!!!");
                return;
            }
            this.isTimerPaused = false;
            counter.value = this.lastCounterTime;
        });
    }
}