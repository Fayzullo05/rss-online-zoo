const modal = document.getElementById("donationModal");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("modalClose");
const openButton = document.querySelectorAll(".footer-button");

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
  document.documentElement.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  document.documentElement.classList.remove("modal-open");
}

openButton.forEach(button => {
  button.addEventListener("click", openModal);
});

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);