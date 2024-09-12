document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');
    const closeModal = document.getElementById('closeModal');
  
    // Open file input on button click
    uploadBtn.addEventListener('click', () => {
      fileInput.click();
    });
  
    // Handle file upload
    fileInput.addEventListener('change', handleFileUpload);
  
    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imageData = e.target.result;
          const title = prompt('Enter a name for the outfit:');
          saveImageToLocalStorage(title, imageData);
          renderGallery();
        };
        reader.readAsDataURL(file);
      }
    }
  
    // Save image to localStorage
    function saveImageToLocalStorage(title, data) {
      const existingImages = JSON.parse(localStorage.getItem('images')) || [];
      existingImages.push({ title, data });
      localStorage.setItem('images', JSON.stringify(existingImages));
    }
  
    // Load and display images from localStorage
    function renderGallery() {
      gallery.innerHTML = '';
      const images = JSON.parse(localStorage.getItem('images')) || [];
      images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        const img = document.createElement('img');
        const imgTitle = document.createElement('h3');
  
        img.src = image.data;
        img.alt = image.title;
        imgTitle.textContent = image.title;
  
        imgDiv.classList.add('gallery-item');
        imgDiv.appendChild(imgTitle);
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', () => openModal(image));
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          deleteImage(index);
        });
        imgDiv.appendChild(deleteBtn);
  
        gallery.appendChild(imgDiv);
      });
    }
  
    // Open image in fullscreen modal
    function openModal(image) {
      modal.style.display = 'flex';
      modalImg.src = image.data;
      caption.textContent = image.title;
    }
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Delete image from localStorage
    function deleteImage(index) {
      const images = JSON.parse(localStorage.getItem('images')) || [];
      images.splice(index, 1);
      localStorage.setItem('images', JSON.stringify(images));
      renderGallery();
    }
  
    // Initial render
    renderGallery();
  });
  