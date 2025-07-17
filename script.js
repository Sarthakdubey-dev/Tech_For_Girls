document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.getElementById("whatsappShare");
  const clickCountDisplay = document.getElementById("clickCount");
  const submitBtn = document.getElementById("submitBtn");
  const registrationForm = document.getElementById("registrationForm");
  const successMsg = document.getElementById("successMsg");
  const bombEffect = document.getElementById("bombEffect");

  let clickCount = 0;
  const maxClicks = 1;

  // Prevent resubmission
  if (localStorage.getItem("submitted") === "true") {
    registrationForm.style.display = "none";
    successMsg.style.display = "block";
    return;
  }

  // WhatsApp Share Button
  whatsappBtn.addEventListener("click", () => {
    if (clickCount >= maxClicks) return;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");

    clickCount++;
    if (clickCount < maxClicks) {
      clickCountDisplay.textContent = `Click count: ${clickCount}/${maxClicks}`;
    } else {
      clickCountDisplay.textContent = `Click count: ${maxClicks}/${maxClicks}. Sharing complete. Please continue.`;
      submitBtn.disabled = false;
    }
  });

  // Form Submission
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (clickCount < maxClicks) {
      alert("Please complete sharing on WhatsApp before submitting.");
      return;
    }

    submitBtn.disabled = true;

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("college", document.getElementById("college").value);
    formData.append("screenshot", document.getElementById("screenshot").files[0]);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyLWXTJeSsKkiE86Vh4DuRNJsq8hlsoL63w6xbdxXEIZ7FyQ9BE3QoprkE-QDfk4Hdo/exec", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        localStorage.setItem("submitted", "true");
        registrationForm.reset();
        registrationForm.style.display = "none";
        successMsg.style.display = "block";

        // Show and animate bomb effect
        bombEffect.style.display = 'block';
        bombEffect.classList.add('explode');

        // Hide bomb after animation (e.g., 1.5s)
        setTimeout(() => {
          bombEffect.style.display = 'none';
          bombEffect.classList.remove('explode');
        }, 1500);

      } else {
        alert("Something went wrong. Please try again later.");
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
      submitBtn.disabled = false;
    }
  });
});
