const btn = document.getElementById("btn");
const guide_msg = document.getElementById("guide_msg");

btn.addEventListener("click", () => {
  let name = document.getElementById("name").value.trim().replace(/\s+/g, " ");
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm_password = document.getElementById("confirm_password").value.trim();

  const name_pattern = /^[A-Za-z\s]+$/;
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!name) {
    guide_msg.innerHTML = "* Name is required.";
    guide_msg.style.color = "red";
    return;
  }

  if (!name_pattern.test(name)) {
    guide_msg.innerHTML = "* Name must contain only alphabets.";
    guide_msg.style.color = "red";
    return;
  }

  if (!email) {
    guide_msg.innerHTML = "* Email is required.";
    guide_msg.style.color = "red";
    return;
  }

  if (!email_pattern.test(email)) {
    guide_msg.innerHTML = "* Enter a valid email address.";
    guide_msg.style.color = "red";
    return;
  }

  if (!password) {
    guide_msg.innerHTML = "* Password is required.";
    guide_msg.style.color = "red";
    return;
  }

  if (!password_pattern.test(password)) {
    guide_msg.innerHTML =
      "* Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    guide_msg.style.color = "red";
    return;
  }
  
  if (!confirm_password) {
    guide_msg.innerHTML = "* Confirm Password is required.";
    guide_msg.style.color = "red";
    return;
  }

  if (password !== confirm_password) {
    guide_msg.innerHTML = "* Confirm Password must match Password.";
    guide_msg.style.color = "red";
    return;
  }

  guide_msg.textContent = "Form submitted successfully!";
  guide_msg.style.color = "green";
});
