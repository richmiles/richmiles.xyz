/**
 * Handle the skill mastery indicators
 * This adds vertical bar indicators to skill items
 */

/**
 * Initialize skill mastery indicators
 * This adds vertical bars to each skill item based on experience level
 */
function initializeSkillMasteryIndicators() {
    // Find all skill items
    const skillItems = document.querySelectorAll('.skill-icon-item');
    
    // For each skill item
    skillItems.forEach(async item => {
      // Get the skill key
      const skillKey = item.getAttribute('data-skill');
      if (!skillKey) return;
      
      try {
        // Load skill data to get experience level
        const skillData = await loadSkillData(skillKey);
        if (!skillData || !skillData.experience) return;
        
        const experience = skillData.experience;
        
        // Determine skill level class and text based on experience percentage
        let levelText = 'Beginner';
        let filledBars = 1; // Default to at least 1 bar
        
        if (experience >= 85) {
          levelText = 'Expert';
          filledBars = 5;
        } else if (experience >= 70) {
          levelText = 'Advanced';
          filledBars = 4;
        } else if (experience >= 50) {
          levelText = 'Intermediate';
          filledBars = 3;
        } else if (experience >= 30) {
          levelText = 'Basic';
          filledBars = 2;
        }
        
        // Check if already has mastery indicator
        if (item.querySelector('.skill-mastery-container')) return;
        
        // Get the current icon or image
        const iconElement = item.querySelector('img') || item.querySelector('i') || item.querySelector('.custom-icon');
        if (!iconElement) return;
        
        // Create container for icon and mastery indicator
        const container = document.createElement('div');
        container.className = 'skill-mastery-container';
        
        // Clone the original icon to avoid breaking event handlers
        const iconClone = iconElement.cloneNode(true);
        
        // Replace the original icon with the container + cloned icon
        iconElement.parentNode.insertBefore(container, iconElement);
        container.appendChild(iconClone);
        iconElement.remove();
        
        // Create vertical bars for skill mastery
        const barsContainer = document.createElement('div');
        barsContainer.className = 'skill-mastery-bars';
        
        // Create 5 bars
        for (let i = 0; i < 5; i++) {
          const bar = document.createElement('div');
          bar.className = 'mastery-bar';
          if (i < filledBars) {
            bar.classList.add('filled');
          }
          barsContainer.appendChild(bar);
        }
        
        // Add mastery level text
        const levelLabel = document.createElement('div');
        levelLabel.className = 'mastery-level-text';
        levelLabel.textContent = `${levelText} (${experience}%)`;
        
        // Add bars and label to container
        container.appendChild(barsContainer);
        container.appendChild(levelLabel);
        
      } catch (error) {
        console.error(`Error creating mastery indicator for ${skillKey}:`, error);
      }
    });
    
    // Set up animation when indicators come into view
    setupMasteryAnimations();
  }
  
  /**
   * Set up animations for mastery indicators when they scroll into view
   */
  function setupMasteryAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
  
      // Observe all skill mastery bars
      document.querySelectorAll('.skill-mastery-bars').forEach(indicator => {
        observer.observe(indicator);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('.skill-mastery-bars').forEach(indicator => {
        indicator.classList.add('animate');
      });
    }
  }
  
  // Add an event listener to the skills data ready event
  document.addEventListener('skillsDataReady', function() {
    console.log('Skills data ready, initializing mastery indicators');
    // Wait a short time to ensure DOM is fully updated
    setTimeout(initializeSkillMasteryIndicators, 100);
  });