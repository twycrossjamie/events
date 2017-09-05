var noteInput, noteName, textEntered, target; //declare variables

noteName = document.getElementById('noteName'); //gathers the element that holds note 
noteInput = document.getElementById('noteInput'); //gathers the input for writing the note

function writeLabel(e) { //declare functions
    if (!e) { //if event object is not present 
        e = window.event; //use ie5-8 fallback
    }
    target = e.target || e.srcElement; //get target of event
    textEntered = target.value; //value of that element 
    noteName.textContent = textEntered; // update note text
}

//this is where the record/pause controls and functions go

function recorderControls(e) { //recorderControls()
    if (!e) { //if event object not present
        e = window.event; // use ie5-8 fallback 
    }
    target = e.target || e.srcElement; //get the target element
    if (e.preventDefault) { // if preventDefault() supported
        e.preventDefault(); //stop default action
    } else { //otherwise 
        e.returnValue = false; //IE fallback: stop default action
    }
    
    switch (target.getAttribute('data-state')) { //get the data-state attribute
    case 'record': //if its value is record
        record(target); //call the record() function 
        break; //exit function to where called
    case 'stop': // if its value is stop
        stop(target); //call the stop() function
        break; //exit function to where called
            //more buttons could go here ---------------------
    }
    
}
function record(target) { //declare function
    target.setAttribute('data-state', 'stop'); //set data-state attribute to stop
    target.textContent = 'stop'; //set text to 'stop'
}
function stop(target) { //declare variable
    target.setAttribute('data-state', 'record'); //set data-state attribute to record
    target.textContent = 'record'; //set text to record
            
    }
            

//event listeners used is an conditional statement incase ie8 or less

if (document.addEventListener) { //if event listner is supported 
    document.addEventListener('click', function(e) { //for any click on document
        recorderControls(e);
    }, false); //capture during bubble phase 
    //if input event fires on username input call writeLabel()
    noteInput.addEventListener('input', writeLabel, false); 
} else { //otherwise
    document.attachEvent('onclick', function(e) { //IE fallback: any click
        recorderControls(e); //calls recorderControls()
    });
    //if keyup event fires on username input call writelabel()
    noteInput.attachEvent('onKeyUp', writeLabel);
}