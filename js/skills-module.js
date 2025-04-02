// Cache for loaded skill data
const SkillsModule = {
    // State
    skillsData: {},
    modalInitialized: false,
    modalTemplateLoaded: false,
    
    // Initialization
    init: async function() {
      console.log('Initializing Skills Module...');
      
      // Create modal container if it doesn't exist
      await this.ensureModalContainer();
      
      // Load modal template (only if not already loaded)
      if (!this.modalTemplateLoaded) {
        await this.loadModalTemplate();
      }
      
      // Initialize skill click events
      this.initSkillEvents();
      
      console.log('Skills Module initialized successfully');
    },
  
    // Ensure the modal container exists
    ensureModalContainer: function() {
      // Check if skills modal container exists
      let modalContainer = document.getElementById('skills-modal');
      
      // If it doesn't exist, create it
      if (!modalContainer) {
        console.log('Creating modal container element');
        modalContainer = document.createElement('div');
        modalContainer.id = 'skills-modal';
        modalContainer.className = 'skills-modal';
        document.body.appendChild(modalContainer);
      }
      
      return modalContainer;
    },
    
    // Modal Template Loading
    loadModalTemplate: async function() {
      // If already loaded, don't load again
      if (this.modalTemplateLoaded) {
        console.log('Modal template already loaded, skipping');
        return true;
      }
      
      try {
        // Get the modal container
        const modalContainer = document.getElementById('skills-modal');
        if (!modalContainer) {
          console.error('Modal container not found even after creation attempt!');
          return false;
        }
        
        // Check if the modal content already exists
        if (modalContainer.querySelector('.skills-modal-content')) {
          console.log('Modal content already exists, skipping template loading');
          this.modalTemplateLoaded = true;
          this.modalInitialized = true;
          return true;
        }
        
        console.log('Loading modal template from HTML file');
        // Load the modal content from the template
        const response = await fetch('sections/skills-modal.html');
        if (!response.ok) {
          throw new Error(`Failed to load modal template: ${response.status} ${response.statusText}`);
        }
        
        const templateContent = await response.text();
        modalContainer.innerHTML = templateContent;
        console.log('Modal content loaded successfully');
        
        // Bind modal close events
        this.bindModalCloseEvents();
        this.modalInitialized = true;
        this.modalTemplateLoaded = true;
        return true;
      } catch (error) {
        console.error('Error loading modal content:', error);
        
        // Fallback: create a basic modal structure if template can't be loaded
        this.createBasicModalStructure();
        return false;
      }
    },
  
    // Create a basic modal structure if template loading fails
    createBasicModalStructure: function() {
      const modalContainer = document.getElementById('skills-modal');
      if (!modalContainer) return;
  
      console.log('Creating basic modal structure as fallback');
      
      modalContainer.innerHTML = `
        <div class="skills-modal-content">
          <span class="modal-close">&times;</span>
          <div class="modal-header">
            <h3 id="modal-title">Skill Title</h3>
          </div>
          <div class="modal-body">
            <div class="modal-section">
              <div class="experience-bar-container">
                <div class="experience-bar">
                  <div id="modal-experience" class="experience-fill"></div>
                </div>
                <div class="experience-labels">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            <div class="modal-section">
              <h4>My Take</h4>
              <p id="modal-overview">Overview content goes here</p>
            </div>
          </div>
        </div>
      `;
      
      this.bindModalCloseEvents();
      this.modalInitialized = true;
      this.modalTemplateLoaded = true;
    },
    
    // Skill Click Events
    initSkillEvents: function() {
      const skillItems = document.querySelectorAll('.skill-icon-item');
      let handlerCount = 0;
      
      skillItems.forEach(item => {
        // Check if an event listener is already attached
        if (item.getAttribute('data-listener') === 'true') {
          return;
        }
  
        item.addEventListener('click', (event) => {
          const skillKey = item.getAttribute('data-skill');
          console.log("Skill clicked:", skillKey);
          if (skillKey) {
            this.openSkillModal(skillKey);
          } else {
            console.warn("No data-skill attribute found on clicked element");
          }
        });
        
        // Mark as having a listener attached
        item.setAttribute('data-listener', 'true');
        handlerCount++;
      });
      
      if (handlerCount > 0) {
        console.log(`Added click handlers to ${handlerCount} skill items`);
      }
    },
    
    // Modal Events
    bindModalCloseEvents: function() {
      const modalCloseBtn = document.querySelector('.modal-close');
      const modalContainer = document.getElementById('skills-modal');
      
      if (!modalCloseBtn || !modalContainer) {
        console.error('Modal elements not found for binding events');
        return false;
      }
      
      // Remove existing listeners to prevent duplicates
      const newCloseBtn = modalCloseBtn.cloneNode(true);
      modalCloseBtn.parentNode.replaceChild(newCloseBtn, modalCloseBtn);
      
      // Close on X button click
      newCloseBtn.addEventListener('click', () => {
        console.log("Close button clicked");
        this.closeSkillModal();
      });
      
      // Close on click outside the modal - use once: false to prevent multiple listeners
      modalContainer.onclick = (event) => {
        if (event.target === modalContainer) {
          console.log("Clicked outside modal content");
          this.closeSkillModal();
        }
      };
      
      console.log('Modal close events bound successfully');
      return true;
    },
    
    // Load Skill Data - on demand only when modal is opened
    loadSkillData: async function(skillKey) {
      if (this.skillsData[skillKey]) {
        console.log(`Using cached data for ${skillKey}`);
        return this.skillsData[skillKey]; // Return cached data if available
      }
      
      console.log(`Loading data for ${skillKey} on demand`);
      try {
        const response = await fetch(`data/skills/${skillKey}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load skill data for ${skillKey}`);
        }
        
        const data = await response.json();
        this.skillsData[skillKey] = data; // Cache the data
        console.log(`Successfully loaded data for ${skillKey}`);
        return data;
      } catch (error) {
        console.error(`Error loading skill data for ${skillKey}:`, error);
        return null;
      }
    },
    
    // Open Skill Modal
    openSkillModal: async function(skillKey) {
      // Ensure modal is initialized
      if (!this.modalInitialized) {
        console.log("Modal not initialized, initializing now");
        await this.ensureModalContainer();
        await this.loadModalTemplate();
      }
      
      const modal = document.getElementById('skills-modal');
      if (!modal) {
        console.error('Cannot open modal: Modal container not found');
        return;
      }
      
      // Show the modal with a loading state
      modal.style.display = 'block';
      
      const titleEl = document.getElementById('modal-title');
      const overviewEl = document.getElementById('modal-overview');
      const expBar = document.getElementById('modal-experience');
      
      if (titleEl) titleEl.textContent = 'Loading...';
      if (overviewEl) overviewEl.textContent = 'Loading skill information...';
      if (expBar) expBar.style.width = '0';
      
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      try {
        // Load skill data on demand
        const skillData = await this.loadSkillData(skillKey);
        if (!skillData) {
          throw new Error('Failed to load skill data');
        }
        
        // Update modal with skill data
        if (titleEl) titleEl.textContent = skillData.title || 'Untitled Skill';
        if (overviewEl) overviewEl.textContent = skillData.overview || 'No overview available';
        
        // Animate the experience bar
        if (expBar) {
          setTimeout(() => {
            expBar.style.width = (skillData.experience || 0) + '%';
          }, 100);
        }
      } catch (error) {
        console.error('Error loading skill details:', error);
        if (titleEl) titleEl.textContent = 'Error';
        if (overviewEl) overviewEl.textContent = 'Could not load skill information. Please try again.';
      }
    },
    
    // Close Skill Modal
    closeSkillModal: function() {
      console.log("Closing skill modal");
      const modal = document.getElementById('skills-modal');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
    }
  };
  
  // Initialize when DOM is ready - use a flag to prevent multiple initializations
  let modulePreviouslyInitialized = false;
  
  function initializeSkillsModule() {
    if (modulePreviouslyInitialized) {
      console.log('Skills module already initialized, only updating event handlers');
      SkillsModule.initSkillEvents();
      return;
    }
    
    // Initialize the module
    console.log('First-time initialization of skills module');
    SkillsModule.init();
    modulePreviouslyInitialized = true;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize the module when skills content is loaded
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if skills content is loaded by looking for skill items
          const skillItems = document.querySelectorAll('.skill-icon-item');
          if (skillItems.length > 0) {
            console.log(`Skills content detected with ${skillItems.length} items`);
            initializeSkillsModule();
            break; // Only need to initialize once
          }
        }
      }
    });
    
    // Start observing the document body for changes, but with a limited scope
    observer.observe(document.getElementById('skills-content-container') || document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Also listen for the custom event that might be triggered when skills are loaded
    document.addEventListener('skillsContentLoaded', () => {
      console.log('skillsContentLoaded event received');
      initializeSkillsModule();
    });
    
    // Check if skills are already present and initialize if they are
    const skillItems = document.querySelectorAll('.skill-icon-item');
    if (skillItems.length > 0) {
      console.log(`Skills already present (${skillItems.length} items)`);
      initializeSkillsModule();
    } else {
      console.log('No skills found yet, waiting for content to load...');
    }
  });
  
  // Re-initialize skills when new DOM content is loaded (e.g., after AJAX)
  document.addEventListener('contentLoaded', () => {
    console.log('contentLoaded event received, re-initializing skill events...');
    SkillsModule.initSkillEvents();
  });
  
  // Expose the module globally
  window.SkillsModule = SkillsModule;