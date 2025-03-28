/**
 * Skills data with detailed information for each skill
 */
let skillsData = {};

// Function to load a skill's data from JSON file
async function loadSkillData(skillKey) {
    if (skillsData[skillKey]) {
        return skillsData[skillKey]; // Return cached data if already loaded
    }
    
    try {
        const response = await fetch(`js/skills/${skillKey}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load skill data for ${skillKey}`);
        }
        
        const data = await response.json();
        skillsData[skillKey] = data; // Cache the data
        return data;
    } catch (error) {
        console.error(`Error loading skill data for ${skillKey}:`, error);
        return null;
    }
}

// Function to preload all skills that are visible in the grid
async function preloadVisibleSkills() {
    const skillItems = document.querySelectorAll('.skill-icon-item');
    const loadPromises = [];
    
    skillItems.forEach(item => {
        const skillKey = item.getAttribute('data-skill');
        if (skillKey) {
            loadPromises.push(loadSkillData(skillKey));
        }
    });
    
    await Promise.all(loadPromises);
    console.log('Preloaded all visible skills');
    
    // Dispatch an event to notify that skills data is ready
    const event = new CustomEvent('skillsDataReady');
    document.dispatchEvent(event);
}