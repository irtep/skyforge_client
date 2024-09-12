export var indexValue = 0;
export var historyList = [];

export function KeyDown(key, data) {
    // enter-key has been pressed
    if (key === "EnterKey") {
        // check data not empty
        if (data != "") {
            // save input into inputdata
            historyList.push(data);
            // history max length is 10
            if (historyList.length > 10) {
                historyList.shift();
            }
            indexValue = historyList.length;
        }

    }
    // up-key has been pressed
    if (key === "KeyUp") {
        // check command history not empty
        if (historyList != null) {
            if (historyList.length > -1) {
                indexValue--;
            }
            if (indexValue < 0) {
                indexValue = 0;
            }            
        }
    }
    // down-key has been pressed
    if (key === "KeyDown") {
        // check command history not empty
        if (historyList != null) {
            if (indexValue < historyList.length - 1) {
                indexValue++;
            }
            if (indexValue > historyList.length) {
                indexValue = historyList.length - 1;
            }
        }
    }
}