/**
 * Skills modal functionality
 * This file handles the interaction with the skills modal
 * It depends on skills-data.js being loaded first
 */

// Create a global variable to check when skillsData is available
let skillsDataLoaded = false;
let skillsEventsInitialized = false;

// Function to check if skillsData is available
function checkSkillsDataLoaded() {
    if (typeof skillsData !== 'undefined') {
        skillsDataLoaded = true;
        if (!skillsEventsInitialized) {
            initSkillsModalEvents();
        }
    } else {
        console.warn("skillsData not loaded yet, waiting...");
        setTimeout(checkSkillsDataLoaded, 100);
    }
}

/**
 * Initialize event listeners for the skills modal
 */
function initSkillsModalEvents() {
    // Exit if already initialized
    if (skillsEventsInitialized) {
        console.log("Skills events already initialized");
        return;
    }

    // Check if skillsData is available first
    if (!skillsDataLoaded && typeof skillsData === 'undefined') {
        console.warn("Cannot initialize skills modal events - skillsData not available");
        checkSkillsDataLoaded();
        return;
    }

    skillsEventsInitialized = true;

    // Make sure the modal is hidden initially
    const modal = document.getElementById('skills-modal');
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error("Modal element not found!");
        return;
    }

    // Set up click handlers for skill items
    const skillItems = document.querySelectorAll('.skill-icon-item');

    // Add click listeners to each skill item
    skillItems.forEach(item => {
        item.addEventListener('click', function () {
            const skillKey = this.getAttribute('data-skill');
            console.log("Skill clicked:", skillKey);
            if (skillKey) {
                openSkillModal(skillKey);
            } else {
                console.warn("No data-skill attribute found on clicked element");
            }
        });
    });

    // Set up close button
    document.addEventListener('click', function (event) {
        // Check if the clicked element is the close button or has the close button class
        if (event.target.classList.contains('modal-close')) {
            closeSkillModal();
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeSkillModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeSkillModal();
        }
    });

    console.log('Skills modal events initialized successfully');
}

/**
 * Open the skills modal with the specified skill data
 * @param {string} skillKey - The key of the skill to display
 */
async function openSkillModal(skillKey) {
    const modal = document.getElementById('skills-modal');

    // Show the modal with a loading state
    modal.style.display = 'block';
    document.getElementById('modal-title').textContent = 'Loading...';
    document.getElementById('modal-overview').textContent = 'Loading skill information...';
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    try {
        // Load skill data on demand
        const skillData = await loadSkillData(skillKey);
        if (!skillData) {
            throw new Error('Failed to load skill data');
        }

        // Update modal with skill data based on the new modal structure
        document.getElementById('modal-title').textContent = skillData.title || 'Untitled Skill';
        document.getElementById('modal-overview').textContent = skillData.overview || 'No overview available';

        // Animate the experience bar using the 'experience' percentage
        const expBar = document.getElementById('modal-experience');
        expBar.style.width = '0';
        setTimeout(() => {
            expBar.style.width = (skillData.experience || 0) + '%';
        }, 100);
    } catch (error) {
        console.error('Error loading skill details:', error);
        document.getElementById('modal-title').textContent = 'Error';
        document.getElementById('modal-overview').textContent = 'Could not load skill information. Please try again.';
    }
}


/**
 * Close the skills modal
 */
function closeSkillModal() {
    console.log("Closing skill modal");
    const modal = document.getElementById('skills-modal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Start checking if skillsData is available
checkSkillsDataLoaded();

// If the DOM is already loaded, initialize now
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log('Skills modal script loaded, waiting for skillsData to be available');
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('Skills modal script loaded with DOMContentLoaded, waiting for skillsData');
    });
}