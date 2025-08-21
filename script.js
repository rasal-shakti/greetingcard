
        const titleInput = document.getElementById('title');
        const messageInput = document.getElementById('message');
        const recipientInput = document.getElementById('recipient');
        const titleXInput = document.getElementById('titleX');
        const titleYInput = document.getElementById('titleY');
        const messageXInput = document.getElementById('messageX');
        const messageYInput = document.getElementById('messageY');
        const previewTitle = document.getElementById('previewTitle');
        const previewMessage = document.getElementById('previewMessage');
        const previewTo = document.getElementById('previewTo');
        const cardImage = document.getElementById('cardImage');
        const imageInput = document.getElementById('imageInput');

        // Update preview when inputs change
        function updatePreview() {
            previewTitle.textContent = titleInput.value || 'Card Title';
            previewMessage.textContent = messageInput.value || 'Your message will appear here';
            previewTo.textContent = `To: ${recipientInput.value || 'To'}`;
            
            // Update positions for title
            const titleX = parseInt(titleXInput.value) || 50;
            const titleY = parseInt(titleYInput.value) || 20; // Adjusted for better visibility
            // Position the title
            previewTitle.style.position = 'absolute';
            previewTitle.style.left = `${Math.max(0, Math.min(titleX, 100))}%`;
            previewTitle.style.top = `${Math.max(0, Math.min(titleY, 100))}%`;
            previewTitle.style.transform = 'translate(-50%, -50%)';
            
            // Position the message
            const messageX = parseInt(messageXInput.value) || 50;
            const messageY = parseInt(messageYInput.value) || 50; // Adjusted for better visibility
            previewMessage.style.position = 'absolute';
            previewMessage.style.left = `${Math.max(0, Math.min(messageX, 100))}%`;
            previewMessage.style.top = `${Math.max(0, Math.min(messageY, 100))}%`;
            previewMessage.style.transform = 'translate(-50%, -50%)';
        }
        
        // Handle image upload
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    cardImage.src = event.target.result;
                    
                    // Make sure text is visible on new image
                    document.querySelectorAll('.card-title, .card-message').forEach(el => {
                        el.style.display = 'block';
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file');
            }
        });

        // Handle save button click
        document.getElementById('saveButton').addEventListener('click', function() {
            html2canvas(document.querySelector('.card-preview')).then(canvas => {
                // Create a link element
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'card.png'; // Set the file name
                link.click(); // Trigger the download
            });
        });
      
        // Add event listeners
        titleInput.addEventListener('input', updatePreview);
        messageInput.addEventListener('input', updatePreview);
        recipientInput.addEventListener('input', updatePreview);
        titleXInput.addEventListener('input', updatePreview);
        titleYInput.addEventListener('input', updatePreview);
        messageXInput.addEventListener('input', updatePreview);
        messageYInput.addEventListener('input', updatePreview);
