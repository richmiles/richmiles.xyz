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
    const response = await fetch(`data/categories/${categoryKey}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load category data for ${categoryKey}`);
    }
    
    const data = await response.json();
    console.log(`Loaded data for ${categoryKey}:`, data);
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
    const template = await response.text();
    console.log('Category template loaded successfully');
    return template;
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
  console.log('Starting category initialization...');
  
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
  if (!template) {
    console.error('Failed to load template, aborting category initialization');
    return;
  }
  
  console.log('Template loaded, processing categories...');
  
  // Load each category
  for (const category of categories) {
    console.log(`Processing category: ${category.key}`);
    const categorySection = document.querySelector(category.selector);
    
    if (!categorySection) {
      console.warn(`Category section not found for selector: ${category.selector}`);
      continue;
    }
    
    // Load category data
    const data = await loadCategoryData(category.key);
    if (!data) {
      console.warn(`No data loaded for category: ${category.key}`);
      continue;
    }
    
    console.log(`Creating card for ${category.key} with title: ${data.title}`);
    
    // Create a temporary container to hold the template
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = template;
    
    // Update the template with the category data
    const introCard = tempContainer.firstElementChild;
    introCard.querySelector('#category-icon').className = data.icon;
    introCard.querySelector('#category-title').textContent = data.title;
    introCard.querySelector('#category-summary').textContent = data.summary;
    
    // Handle content - this appears to be missing in the data, so check if it exists
    const contentElement = introCard.querySelector('#category-content');
    if (contentElement) {
      if (data.content) {
        contentElement.innerHTML = data.content;
      } else {
        // If no content exists in the data, remove the expanded area entirely
        const expandedArea = introCard.querySelector('.intro-card-expanded');
        if (expandedArea) {
          expandedArea.remove();
        }
      }
    }
    
    // Remove the ID attributes to avoid duplicates
    introCard.querySelector('#category-icon').removeAttribute('id');
    introCard.querySelector('#category-title').removeAttribute('id');
    introCard.querySelector('#category-summary').removeAttribute('id');
    const contentEl = introCard.querySelector('#category-content');
    if (contentEl) contentEl.removeAttribute('id');
    
    // Insert the card at the beginning of the category section
    // This is important: we're now putting it at the beginning, not after an h3
    const firstChild = categorySection.firstChild;
    if (firstChild) {
      categorySection.insertBefore(introCard, firstChild);
    } else {
      categorySection.appendChild(introCard);
    }
    
    console.log(`Category card for ${category.key} inserted successfully`);
  }
  
  console.log('Category intros initialization completed');
}

// Export the initialization function explicitly
window.initializeCategoryIntros = initializeCategoryIntros;