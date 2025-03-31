/**
 * Category intros functionality
 * This handles loading and displaying category introduction cards
 */

// Store loaded category data
let categoryData = {};

/**
 * Load a category's data from JSON file
 * @param {string} categoryKey - The key of the category to load
 * @returns {Promise<Object>} - The category data
 */
async function loadCategoryData(categoryKey) {
  if (categoryData[categoryKey]) {
    return categoryData[categoryKey]; // Return cached data if already loaded
  }
  
  try {
    const response = await fetch(`js/categories/${categoryKey}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load category data for ${categoryKey}`);
    }
    
    const data = await response.json();
    categoryData[categoryKey] = data; // Cache the data
    return data;
  } catch (error) {
    console.error(`Error loading category data for ${categoryKey}:`, error);
    return null;
  }
}

/**
 * Load the category intro template
 * @returns {Promise<string>} - The HTML template
 */
async function loadCategoryTemplate() {
  try {
    const response = await fetch('sections/category-template.html');
    if (!response.ok) {
      throw new Error('Failed to load category intro template');
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading category intro template:', error);
    return null;
  }
}

/**
 * Initialize category intro cards
 * This loads the template and data for each category
 */
async function initializeCategoryIntros() {
  // Categories to load
  const categories = [
    { key: 'languages', selector: '.category-languages' },
    { key: 'databases', selector: '.category-databases' },
    { key: 'frameworks', selector: '.category-frameworks' },
    { key: 'devops', selector: '.category-devops' },
    { key: 'ai', selector: '.category-ai' }
  ];
  
  // Get the template once
  const template = await loadCategoryTemplate();
  if (!template) return;
  
  // Load each category
  for (const category of categories) {
    const categorySection = document.querySelector(category.selector);
    if (!categorySection) continue;
    
    // Load category data
    const data = await loadCategoryData(category.key);
    if (!data) continue;
    
    // Create a temporary container to hold the template
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = template;
    
    // Update the template with the category data
    const introCard = tempContainer.firstElementChild;
    introCard.querySelector('#category-icon').className = data.icon;
    introCard.querySelector('#category-title').textContent = data.title;
    introCard.querySelector('#category-summary').textContent = data.summary;
    introCard.querySelector('#category-content').innerHTML = data.content;
    
    // Remove the ID attributes to avoid duplicates
    introCard.querySelector('#category-icon').removeAttribute('id');
    introCard.querySelector('#category-title').removeAttribute('id');
    introCard.querySelector('#category-summary').removeAttribute('id');
    introCard.querySelector('#category-content').removeAttribute('id');
    
    // Insert the card at the top of the category section, after the h3
    const h3 = categorySection.querySelector('h3');
    if (h3) {
      h3.after(introCard);
    } else {
      categorySection.prepend(introCard);
    }
  }
  
  // Add event listeners to the toggle buttons
  document.querySelectorAll('.intro-card-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const expandedContent = this.nextElementSibling;
      if (expandedContent.classList.contains('active')) {
        expandedContent.classList.remove('active');
        this.textContent = 'Read More';
      } else {
        expandedContent.classList.add('active');
        this.textContent = 'Read Less';
      }
    });
  });
  
  console.log('Category intros initialized successfully');
}