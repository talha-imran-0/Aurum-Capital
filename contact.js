document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');
    // We need to create or select message containers. 
    // Based on previous files, we might need to inject them if they don't exist, 
    // or select them if they do. Let's assume we need to manage them dynamically or select existing.

    // Let's check if message containers exist, if not we can assume the user wants us to use specific classes or we inject simple alerts? 
    // The user requirement says "Show success message... inline".
    // I'll assume standard class names from previous iterations or create them.

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // UI: Set loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // select or create message elements
            let successMsg = document.getElementById('form-success');
            let errorMsg = document.getElementById('form-error');

            // If they don't exist in DOM (removed in previous steps?), let's log warning or handle gracefully
            // But based on previous contact.html, they might be missing or hidden.
            // I'll grab them by ID as implemented in step 81, or recreate logic.
            // Actually, in step 137 (static version), I didn't explicitly include the message divs in the HTML content I wrote? 
            // Wait, looking at Step 137 output... I don't see <div id="form-success"> in the CodeContent.
            // I will need to add them to HTML or create them in JS. 
            // Better to add them to HTML for layout control, but I can't edit HTML in this tool call.
            // I will write the JS to toggle them if they exist.

            if (!successMsg) {
                // Create temp fallback if missing
                console.warn("Success/Error message containers missing in HTML. Ensure contact.html has #form-success and #form-error");
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    if (successMsg) successMsg.style.display = 'block';
                    if (errorMsg) errorMsg.style.display = 'none';
                    contactForm.reset();
                    // Optional: Hide form or keep it? User said "reset automatically", didn't say hide.
                    // Previous logic hid the form. User request says "Fields should reset". 
                    // I will NOT hide the form this time, just reset.

                    // Show alert as fallback if no UI element
                    if (!successMsg) alert("Message sent successfully!");

                } else {
                    // Error
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        throw new Error("Submission failed. Please try again.");
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                if (errorMsg) {
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = "Submission failed. Please try again.";
                } else {
                    alert("Submission failed. Please try again.");
                }
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
