
/* ==================================
   SMARTSTUDY WEB APPLICATION
   COMPLETE JAVASCRIPT
================================== */

// ==================================
// 1. ASSIGNMENT MANAGER
// ==================================

// Load saved assignments
let assignments = JSON.parse(
    localStorage.getItem("smartStudyAssignments")
) || [];


// Save assignments
function saveAssignments() {

    localStorage.setItem(
        "smartStudyAssignments",
        JSON.stringify(assignments)
    );

}


// Display assignments
function displayAssignments() {

    let list = document.getElementById("assignmentList");

    if (!list) return;

    list.innerHTML = "";

    assignments.forEach(function(assignment, index) {

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.textContent = assignment.name;

        if (assignment.completed) {
            span.classList.add("completed");
        }

        // Mark assignment as completed
        span.addEventListener("click", function() {

            assignments[index].completed =
                !assignments[index].completed;

            saveAssignments();

            displayAssignments();

        });


        // Create delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        // Delete assignment
        deleteButton.addEventListener("click", function() {

            assignments.splice(index, 1);

            saveAssignments();

            displayAssignments();

        });


        li.appendChild(span);

        li.appendChild(deleteButton);

        list.appendChild(li);
        updateProgress();

    });

    updateProgress();

}


// Add assignment
function addAssignment() {

    let input = document.getElementById("assignmentInput");

    if (!input) return;

    let assignmentName = input.value.trim();

    if (assignmentName === "") {

        alert("Please enter an assignment!");

        return;

    }

    assignments.push({

        name: assignmentName,

        completed: false

    });

    saveAssignments();

    displayAssignments();

    input.value = "";

}


// ==================================
// 2. ASSIGNMENT PROGRESS TRACKER
// ==================================

function updateProgress() {

    let total = assignments.length;

    let completed = assignments.filter(function(item) {

        return item.completed;

    }).length;

    let pending = total - completed;

    let percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);


    let totalElement =
        document.getElementById("totalAssignments");

    let completedElement =
        document.getElementById("completedAssignments");

    let pendingElement =
        document.getElementById("pendingAssignments");

    let progressFill =
        document.getElementById("progressFill");

    let progressText =
        document.getElementById("progressText");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (progressFill) {
        progressFill.style.width = percentage + "%";
    }

    if (progressText) {
        progressText.textContent = percentage + "% completed";
    }

    
}


// ==================================
// 3. STUDY TIMETABLE MANAGER
// ==================================

// Load saved timetable
let studySessions = JSON.parse(
    localStorage.getItem("smartStudyTimetable")
) || [];


// Save timetable
function saveTimetable() {

    localStorage.setItem(
        "smartStudyTimetable",
        JSON.stringify(studySessions)
    );

}


// Display timetable
function displayTimetable() {

    let list = document.getElementById("timetableList");

    if (!list) return;

    list.innerHTML = "";

    studySessions.forEach(function(session, index) {

        let li = document.createElement("li");

        let details = document.createElement("div");

        details.className = "session-details";

        details.textContent =
            session.subject + " | " +
            session.date + " | " +
            session.time;


        // Create delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        // Delete study session
        deleteButton.addEventListener("click", function() {

            studySessions.splice(index, 1);

            saveTimetable();

            displayTimetable();

        });


        li.appendChild(details);

        li.appendChild(deleteButton);

        list.appendChild(li);

    });

}


// Add study session
function addStudySession() {

    let subject =
        document.getElementById("studySubject").value;

    let date =
        document.getElementById("studyDate").value;

    let time =
        document.getElementById("studyTime").value;


    if (subject === "" || date === "" || time === "") {

        alert("Please complete all timetable fields!");

        return;

    }


    studySessions.push({

        subject: subject,

        date: date,

        time: time

    });


    saveTimetable();

    displayTimetable();


    // Clear form
    document.getElementById("studySubject").value = "";

    document.getElementById("studyDate").value = "";

    document.getElementById("studyTime").value = "";

}


// ==================================
// 4. START SMARTSTUDY
// ==================================

document.addEventListener("DOMContentLoaded", function() {

    displayAssignments();

    displayTimetable();

    console.log("SmartStudy is running successfully!");

});
