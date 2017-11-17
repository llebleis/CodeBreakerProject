let answer          = document.getElementById('answer');
let attempt         = document.getElementById('attempt');
let message         = document.getElementById('message');
let user_guess      = document.getElementById('user-guess');
let ok_char         = 0;

function guess() {
    ok_char = 0;
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    if(!validateInput(user_guess.value)) {
        return false;
    }
    attempt.value = (attempt.value*1)+1;

    getResults(user_guess.value);

    if(ok_char == answer.value.length) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
        return true;
    }
    if(attempt.value >= 10) {
        setMessage("You Lose! :-/");
        showAnswer(false);
        showReplay();
        return false;
    }
    setMessage("Incorrect, try again");
}

function setHiddenFields() {
    let tmp = 10000;
    while(tmp > 9999) {
        tmp = Math.floor(Math.random()*10000);
    }
    answer.value = tmp.toString();
    while(answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }

    attempt.value = 0;

}

function setMessage(msg) {
    message.innerHTML = msg;
}

function validateInput(input) {
    if (input.length == 4) {
        setMessage('');
        return true;
    }

    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}

function getResults(input) {
    document.getElementById('results').innerHTML += '<div class="row"><span class="col-md-6">' + input + '</span>' + checkResult(input) + '<div class="col-md-6">';
}

function checkResult(input) {
    let res = '';
    for(var i = 0; i < 4; i++){
        let elem = '<span class="glyphicon ';
        if(input[i] == answer.value[i]) {
            elem += 'glyphicon-ok';
            ok_char++;
        }else {
            if( answer.value.indexOf(input[i]) != -1) {
                elem += 'glyphicon-transfer';
            } else {
                elem += 'glyphicon-remove';
            }

        }
        elem += '"></span>';
        res += elem;
    }

    return res;
}

function showAnswer(win) {
    let code = document.getElementById('code');
    code.value = answer.value;
    if(win) {
        code.className += "success";
    } else {
        code.className += "failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}