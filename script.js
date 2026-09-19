function openTab(tabId) {
        const tabs = document.querySelectorAll('.tabcontent');

        tabs.forEach((tab) => {
          tab.style.display = 'none';
        });

        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
          selectedTab.style.display = 'block';
        }
      }

      function triggerUpload(projectNumber) {
        const fileInput = document.getElementById(`file-input-${projectNumber}`);
        if (fileInput) {
          fileInput.click();
        }
      }

      function previewImage(event, projectNumber) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.getElementById(`project-img-${projectNumber}`);
          const uploadText = document.getElementById(`upload-text-${projectNumber}`);

          if (img) {
            img.src = e.target.result;
            img.style.display = 'block';
          }

          if (uploadText) {
            uploadText.style.display = 'none';
          }
        };

        reader.readAsDataURL(file);
      }

      function saveOwnerInfo() {
        const ownerInfo = {
          name: document.getElementById('info-name').value,
          date: document.getElementById('info-date').value,
          email: document.getElementById('info-email').value,
          phone: document.getElementById('info-phone').value,
          about: document.getElementById('info-about').value
        };

        localStorage.setItem('rinifolio-owner-info', JSON.stringify(ownerInfo));
        alert('𓆝 𓆟 info saved~ 𓆝 𓆟!');
      }

      function saveProjects() {
        const projects = [];

        for (let i = 1; i <= 9; i++) {
          const titleInput = document.getElementById(`project-title-${i}`);
          const descriptionInput = document.getElementById(`project-description-${i}`);
          const image = document.getElementById(`project-img-${i}`);

          const project = {
            title: titleInput ? titleInput.value : '',
            description: descriptionInput ? descriptionInput.value : '',
            image: image && image.src ? image.src : ''
          };

          if (project.title || project.description || project.image) {
            projects.push(project);
          }
        }

        localStorage.setItem('rinifolio-projects', JSON.stringify(projects));
        alert('𓆝 𓆟 projects saved~ 𓆝 𓆟!');
      }

      function loadOwnerInfo() {
        const savedOwnerInfo = JSON.parse(localStorage.getItem('rinifolio-owner-info') || '{}');

        document.getElementById('info-name').value = savedOwnerInfo.name || '';
        document.getElementById('info-date').value = savedOwnerInfo.date || '';
        document.getElementById('info-email').value = savedOwnerInfo.email || '';
        document.getElementById('info-phone').value = savedOwnerInfo.phone || '';
        document.getElementById('info-about').value = savedOwnerInfo.about || '';
      }

      function loadProjects() {
        const savedProjects = JSON.parse(localStorage.getItem('rinifolio-projects') || '[]');

        savedProjects.forEach((project, index) => {
          const titleInput = document.getElementById(`project-title-${index + 1}`);
          const descriptionInput = document.getElementById(`project-description-${index + 1}`);
          const image = document.getElementById(`project-img-${index + 1}`);
          const uploadText = document.getElementById(`upload-text-${index + 1}`);

          if (titleInput) titleInput.value = project.title || '';
          if (descriptionInput) descriptionInput.value = project.description || '';

          if (image && project.image) {
            image.src = project.image;
            image.style.display = 'block';
          }

          if (uploadText && project.image) {
            uploadText.style.display = 'none';
          }
        });
      }

      document.addEventListener('DOMContentLoaded', () => {
        loadOwnerInfo();
        loadProjects();

        document.getElementById('save-info-btn')?.addEventListener('click', saveOwnerInfo);
        document.getElementById('save-projects-btn')?.addEventListener('click', saveProjects);
      });