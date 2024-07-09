//Define a class for Student
class Student{
    constructor(name,email,ids,cls,contact){
        this.name=name;
        this.email=email;
        this.ids=ids;
        this.cls=cls;
        this.contact=contact;
    }
}
let selectedRow = null;    // To track the currently editing row student


//Function to handle form submission

function handleSubmit(event)  {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const ids  = document.getElementById('ids').value;
    const cls  = document.getElementById('cls').value;
    const contact = document.getElementById('contact').value;

    if(validateForm(name, email, ids, cls, contact)){
        if(selectedRow) {
            updateStudent(selectedRow,name,email,ids,cls,contact);
        }else{
            const student = new Student(name,email,ids,cls,contact);
            addStudent(student);
        }
        document.getElementById('studentform').reset();
        selectedRow = null;
        saveStudentsToLocalStorage();
    }
      else{
        alert('Please fill in all fields.');
      }
}

// Function to validate the form inputs

function validateForm(name, email, ids, cls, contact) {
    const namePattern = /^[A-Za-z\s]+$/;
    const idPattern = /^\d+$/;
    const clsPattern = /^[A-Za-z0-9]+$/;
    const contactPattern = /^\d+$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!namePattern.test(name)) {
        alert("Name should contain only characters and spaces.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!idPattern.test(ids)) {
        alert("ID should contain only numbers.");
        return false;
    }
    if (!clsPattern.test(cls)) {
        alert("Class should contain  only alphanumeric characters.");
        return false;
    }
    if (!contactPattern.test(contact)) {
        alert("Contact No. should contain only numbers.");
        return false;
    }
    return true;
}

//Function to add a new student

function addStudent(student) {

const tableList = document.getElementById('tablelist');
const row = tableList.insertRow();
row.innerHTML = `<td>${student.name}</td><td>${student.email}</td><td>${student.ids}</td><td>${student.cls}</td><td>${student.contact}</td>
                 <td> <button class="bttn" onclick="editStudent(this)">Edit</button>
                 <button class="bttn" onclick="deleteStudent(this)">Delete</button></td>`;

}

//Function to edit a student
function editStudent(button){
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');

    document.getElementById('name').value =cells[0].textContent;
    document.getElementById('email').value =cells[1].textContent;
    document.getElementById('ids').value =cells[2].textContent;
    document.getElementById('cls').value =cells[3].textContent;
    document.getElementById('contact').value =cells[4].textContent;

    selectedRow = row;

}

//Function to update an existing student
function updateStudent(row,name,email,ids,cls,contact) {

     row.cells[0].textContent = name;
     row.cells[1].textContent = email;
     row.cells[2].textContent = ids;
     row.cells[3].textContent = cls;
     row.cells[4].textContent = contact;

    saveStudentsToLocalStorage();
}

//Function to delete a student 

function deleteStudent(button){

    const row = button.closest('tr');
    row.remove();
    saveStudentsToLocalStorage();
}


//Function to save students to local storage

function saveStudentsToLocalStorage() {

    const tableList = document.getElementById('tablelist');
    const students = [];
    for (let row of tableList.rows) {
        const cells = row.getElementsByTagName('td');
        const student = new Student(cells[0].textContent, cells[1].textContent, cells[2].textContent, cells[3].textContent, cells[4].textContent);
        students.push(student);
    }
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to load students from local storage
function loadStudentsFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    for (let student of students) {
        addStudent(student);
    }
}



//Event listener for form submission
document.getElementById('studentform').addEventListener('submit', handleSubmit);


// Load students when the page loads
window.addEventListener('load', loadStudentsFromLocalStorage);



