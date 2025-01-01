// ==UserScript==
// @name            Minimize Memory Usage
// @author          jterror
// @homepageURL     https://github.com/update692/firefox
// @version         1.0
// @include         main
// @onlyonce
// ==/UserScript==


(function () {
    console.log(">>>>: Minimize Memory Usage: START");

    const threshold = 1000;      // script is activated only when Firefox uses (megabytes) or more RAM
    const minz_limit = 500;      // minimize memory when relative RAM consumption exceeds (megabytes)
    const poll_interval = 30000; // check RAM consumption value every (milliseconds)
    const poll_number = 3;       // how many RAM consumption values to aggregate for decision
    // must be less than poll_interval
    const cooldown_time = 5000;  // give (milliseconds) for RAM level to stalilize after minimizing
    const debug_beep = true;     // sound beep when memory is cleared
    const beep_time = 0.1;       // beep duration (seconds)
    const round_mb = 20;         // round RAM values to (megabytes)

    const STAT_NONE = 0;
    const STAT_HIGH = 1;
    const STAT_LOW = 2;

    let current_level = threshold; // base for tracking rising memory
    let lower_level = threshold;   // base for tracking falling memory

    const Mgr = Cc["@mozilla.org/memory-reporter-manager;1"].getService(Ci.nsIMemoryReporterManager);
    let timer_poll;     // persistent variable so nsITimer doesn't disappear
    let timer_cooldown; // take time for RAM to stabilize after minimizing

    function roundToNearest(number, increment) {
        if (increment === 0) return number;
        if (increment < 0) increment = Math.abs(increment);
        return Math.round(number / increment) * increment;
    }

    function setTimeout(callback, ms, varname) {
        setTimer(callback, ms, Ci.nsITimer.TYPE_ONE_SHOT, varname);
    }

    function setInterval(callback, ms, varname) {
        setTimer(callback, ms, Ci.nsITimer.TYPE_REPEATING_SLACK, varname);
    }

    function setTimer(callback, ms, type, varname) {
        eval(
            `${varname} = Cc['@mozilla.org/timer;1'].createInstance(Ci.nsITimer);
            ${varname}.initWithCallback({notify: callback}, ms, type);`
        );
    }

    // function clearTimer(timer) {
    //     timer.cancel();
    // }

    async function doMMU() {
        if (debug_beep) doBeep();
        Services.obs.notifyObservers(null, "child-mmu-request");
        Mgr.minimizeMemoryUsage(() => {
            console.log(`>>>>: Memory minimization completed (${new Date().toISOString()})`);
            setTimeout(async () => {
                const megabytes = await getRAM();
                current_level = megabytes;
                lower_level = megabytes;
                console.log(`>>>>: level updated: ${megabytes}`);
            }, cooldown_time, "timer_cooldown");
        });
    }

    async function doBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 440; // A4 note
        oscillator.start();
        oscillator.stop(audioContext.currentTime + beep_time);
    }

    async function getRAM() {
        const info = await ChromeUtils.requestProcInfo();
        let bytes = info.memory;
        for (let child of info.children) bytes += child.memory;
        return roundToNearest(Math.round(bytes / 1048576), round_mb);
    }

    function checkStat(buffer, current, limit) {
        const values = buffer.getValues();
        let ret = STAT_NONE;
        if (values.every(value => value >= current + limit))
            ret = STAT_HIGH;
        else if (values.every(value => value < current))
            ret = STAT_LOW;
        return ret;
    }

    class CircularBuffer {
        constructor(size) {
            this.size = size;
            this.buffer = new Array(size);
            this.clear();
        }

        clear() {
            this.count = 0;
            this.index = 0;
        }

        add(value) {
            if (this.count < this.size) {
                this.buffer[this.count] = value;
                this.count++;
            } else {
                this.buffer[this.index] = value;
                this.index = (this.index + 1) % this.size;
            }
        }

        getValues() {
            let values = [];
            for (let i = 0; i < this.count; i++) {
                values.push(this.buffer[(this.index + i) % this.size]);
            }
            return values;
        }

        isFull() {
            return this.count >= this.size;
        }
    }

    const statbuf = new CircularBuffer(poll_number);

    function doReset() {
        current_level = threshold;
        lower_level = threshold;
        statbuf.clear();
    }

    setInterval(async () => {
        const megabytes = await getRAM();
        let log_msg = `>>>>: ${megabytes} MB, level: ${current_level}, level-down: ${lower_level}, threshold: ${threshold}, limit: ${minz_limit}`;

        if (megabytes >= threshold) {
            statbuf.add(megabytes);
            if (statbuf.isFull()) {
                let result = checkStat(statbuf, current_level, minz_limit);
                if (result === STAT_HIGH) {
                    log_msg += " : high>>";
                    doMMU();
                } else if (result === STAT_LOW) {
                    log_msg += " : low<<";
                    current_level = megabytes;
                    if (current_level <= lower_level - Math.round(minz_limit / 2)) {
                        doMMU();
                    }
                } else {
                    log_msg += " : none";
                }
            } else {
                log_msg += " : filling^^";
            }
        } else {
            log_msg += " : reset--";
            doReset();
        }
        console.log(log_msg);
    }, poll_interval, "timer_poll");
})();
