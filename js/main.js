import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import { displayStudents, displaySummary, displayMessage } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);
}

function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");

  displayStudents(students);
  displaySummary(students);
}

function initEventListeners() {
  applyBtn.addEventListener("click", applyFilters);
  resetBtn.addEventListener("click", resetFilters);

  // Live search as the user types; Apply Filters still works independently.
  searchInput.addEventListener("input", applyFilters);
  searchInput.addEventListener("keyup", applyFilters);

  // Filters can update immediately on change; Apply Filters remains correct too.
  blockFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);
}

function init() {
  initEventListeners();
  displayStudents(students);
  displaySummary(students);
}

init();
