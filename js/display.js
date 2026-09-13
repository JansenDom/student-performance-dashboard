import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

const STATUS_CLASS_MAP = {
  Excellent: "status-excellent",
  Passed: "status-passed",
  "Needs Improvement": "status-needs-improvement",
  Failed: "status-failed"
};

export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);
    const statusClass = STATUS_CLASS_MAP[status] || "";

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;

    card.innerHTML = `
      <header class="student-card__header">
        <h3 class="student-card__name">${name}</h3>
        <span class="student-card__block">${block}</span>
      </header>
      <dl class="student-card__scores">
        <div class="score">
          <dt>Quiz</dt>
          <dd>${quiz}</dd>
        </div>
        <div class="score">
          <dt>Lab</dt>
          <dd>${lab}</dd>
        </div>
        <div class="score">
          <dt>Exam</dt>
          <dd>${exam}</dd>
        </div>
      </dl>
      <div class="student-card__footer">
        <div class="final-grade">
          <span class="final-grade__label">Final Grade</span>
          <span class="final-grade__value">${finalGrade.toFixed(2)}</span>
        </div>
        <span class="badge ${statusClass}">${status}</span>
      </div>
      <p class="student-card__remark">${remark}</p>
    `;

    studentList.appendChild(card);
  });
}

export function displaySummary(students) {
  const classAverageEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  const average = calculateClassAverage(students);
  const passingCount = countPassingStudents(students);
  const topStudent = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passingCount;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topStudent ? topStudent.name : "—";
}

export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
  messageArea.classList.toggle("is-visible", Boolean(message));
}
