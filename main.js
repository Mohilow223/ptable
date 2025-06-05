Parse.initialize("T2v9Sl7EQGurSZI6ydAMB9bJvo6rC7kI4nsVGeCC", "", "T2v9Sl7EQGurSZI6ydAMB9bJvo6rC7kI4nsVGeCC");
Parse.serverURL = "https://parseapi.back4app.com/";
// main.js: Stubs & UI logic only. Add Parse/Back4App logic for real data!
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  try {
    await Parse.User.logIn(username, password);  // Checks with Back4App
    window.location = "home.html";              // If OK, go to home
  } catch (err) {
    document.getElementById('loginError').textContent = "Invalid username or password!";
  }
});
// --- Login Page ---
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  // TODO: Authenticate with Back4App/Parse
  if (username === "admin" && password === "admin") {
    window.location = "home.html";
  } else {
    document.getElementById('loginError').textContent = "Invalid username or password!";
  }
});

// --- Home Page: Demo data, replace with Parse/Back4App fetch ---
const demoPatients = [
  { name: "John Doe", room: "101", doctor: "Dr. Smith", speciality: "Cardiology", dx: "MI", notes: "Stable", ward: "Ward A", medications: [ {name:"Aspirin", dosage:"75mg", frequency:"OD"}, {name:"Atorvastatin", dosage:"40mg", frequency:"OD"} ] },
  { name: "Jane Roe", room: "202", doctor: "Dr. Lee", speciality: "Neurology", dx: "Stroke", notes: "Improving", ward: "Ward B", medications: [ {name:"Clopidogrel", dosage:"75mg", frequency:"OD"} ] }
];
function loadPatientsTable() {
  const ward = document.getElementById('wardSelect')?.value || 'Ward A';
  const tbody = document.getElementById('patientsTable')?.querySelector('tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  demoPatients.filter(p => p.ward === ward).forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.room}</td>
      <td>${p.doctor}</td>
      <td>${p.speciality}</td>
      <td>${p.dx}</td>
      <td>${p.notes}</td>
      <td>
        <button onclick="dischargePatient(${i})">Discharge</button>
        <button onclick="printPatient(${i})">Print</button>
        <button onclick="openMedPopup(${i})">Medications</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.loadPatientsTable = loadPatientsTable;
if (document.getElementById('patientsTable')) loadPatientsTable();

// --- Medication Popup ---
let currentMedPatientIdx = null;
function openMedPopup(idx) {
  currentMedPatientIdx = idx;
  const p = demoPatients[idx];
  const medListDiv = document.getElementById('medList');
  medListDiv.innerHTML = '';
  p.medications.forEach((med, i) => {
    const row = document.createElement('div');
    row.innerHTML = `
      <input type="text" value="${med.name}" placeholder="Name" oninput="updateMedField(${i}, 'name', this.value)">
      <input type="text" value="${med.dosage}" placeholder="Dosage" oninput="updateMedField(${i}, 'dosage', this.value)">
      <input type="text" value="${med.frequency}" placeholder="Frequency" oninput="updateMedField(${i}, 'frequency', this.value)">
    `;
    medListDiv.appendChild(row);
  });
  document.getElementById('medPopup').style.display = 'block';
}
window.openMedPopup = openMedPopup;

function updateMedField(idx, field, value) {
  demoPatients[currentMedPatientIdx].medications[idx][field] = value;
}
window.updateMedField = updateMedField;

function addMedRow() {
  demoPatients[currentMedPatientIdx].medications.push({name:"", dosage:"", frequency:""});
  openMedPopup(currentMedPatientIdx);
}
window.addMedRow = addMedRow;

function saveMedications() {
  document.getElementById('medPopup').style.display = 'none';
  loadPatientsTable();
}
window.saveMedications = saveMedications;

function closeMedPopup() {
  document.getElementById('medPopup').style.display = 'none';
}
window.closeMedPopup = closeMedPopup;

function printMedications() {
  const p = demoPatients[currentMedPatientIdx];
  let text = `Medications for ${p.name}:\n\n`;
  p.medications.forEach(med => {
    text += `${med.name} - ${med.dosage} - ${med.frequency}\n`;
  });
  alert(text + "\n(PDF logic would go here)");
}
window.printMedications = printMedications;

// --- Discharge ---
function dischargePatient(idx) {
  alert(`Patient ${demoPatients[idx].name} discharged (would move to archive).`);
  // Remove from demo list for now
  demoPatients.splice(idx, 1);
  loadPatientsTable();
}
window.dischargePatient = dischargePatient;

// --- Print Patient ---
function printPatient(idx) {
  const p = demoPatients[idx];
  let text = `Patient: ${p.name}\nRoom: ${p.room}\nDoctor: ${p.doctor}\nDiagnosis: ${p.dx}\nNotes: ${p.notes}`;
  alert(text + "\n(PDF logic would go here)");
}
window.printPatient = printPatient;

// --- Patient Form: For demonstration only ---
document.getElementById('patientForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Patient data would be saved to the backend!');
  window.location = 'home.html';
});
function addPatMedRow() {
  const medList = document.getElementById('patMedList');
  const idx = medList.children.length;
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Name">
    <input type="text" placeholder="Dosage">
    <input type="text" placeholder="Frequency">
  `;
  medList.appendChild(div);
}
window.addPatMedRow = addPatMedRow;

// --- Admin ---
function showAddUser() {
  document.getElementById('addUserModal').style.display = 'block';
}
window.showAddUser = showAddUser;
function closeAddUser() {
  document.getElementById('addUserModal').style.display = 'none';
}
window.closeAddUser = closeAddUser;
document.getElementById('addUserForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('User would be added to backend!');
  closeAddUser();
});

// --- Archive: Stub ---
function loadArchive() {
  const tbody = document.getElementById('archiveTable')?.querySelector('tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td>Jane Roe</td><td>202</td><td>2025-06-01</td><td>admin</td><td><button onclick="restorePatient()">Restore</button></td></tr>`;
}
window.loadArchive = loadArchive;
if (document.getElementById('archiveTable')) loadArchive();

function restorePatient() {
  alert('Patient would be restored to the home ward!');
  window.location = 'home.html';
}
window.restorePatient = restorePatient;

// --- Logout ---
function logout() { window.location = 'index.html'; }
window.logout = logout;
