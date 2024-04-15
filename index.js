async function fetchCocktails() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m');
        const data = await response.json();
        const cocktails = data.drinks;

        const cocktailListDiv = document.getElementById('cocktail-list');

        cocktails.forEach(cocktail => {
            const cocktailDiv = document.createElement('div');
            cocktailDiv.innerHTML = `
                <h2>${cocktail.strDrink}</h2>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="max-width: 200px;">
                <p>Category: ${cocktail.strCategory}</p>
                <p>Glass: ${cocktail.strGlass}</p>
                <p>Instructions: ${cocktail.strInstructions}</p>
                <p>Ingredients:</p>
                <ul>
                    ${getIngredientsList(cocktail)}
                </ul>
            `;
            cocktailListDiv.appendChild(cocktailDiv);
        });
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
}

function getIngredientsList(cocktail) {
    let ingredientsList = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail['strIngredient' + i];
        const measure = cocktail['strMeasure' + i];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure.trim()} ${ingredient.trim()}</li>`;
        }
    }
    return ingredientsList;
}

async function addCocktail(event) {
    event.preventDefault();

    const newCocktail = {
        strDrink: document.getElementById('cocktailName').value,
        strCategory: document.getElementById('cocktailCategory').value,
        strGlass: document.getElementById('cocktailGlass').value,
        strInstructions: document.getElementById('cocktailInstructions').value,
        // Add ingredients and measures dynamically
    };

    // Display the new cocktail immediately without fetching data again
    displayNewCocktail(newCocktail);

    // Reset form fields
    document.getElementById('cocktailName').value = '';
    document.getElementById('cocktailCategory').value = '';
    document.getElementById('cocktailGlass').value = '';
    document.getElementById('cocktailInstructions').value = '';
}

function displayNewCocktail(cocktail) {
    const cocktailListDiv = document.getElementById('cocktail-list');

    const cocktailDiv = document.createElement('div');
    cocktailDiv.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="max-width: 200px;">
        <p>Category: ${cocktail.strCategory}</p>
        <p>Glass: ${cocktail.strGlass}</p>
        <p>Instructions: ${cocktail.strInstructions}</p>
        <p>Ingredients:</p>
        <ul>
            <!-- Add ingredients here -->
        </ul>
    `;
    cocktailListDiv.appendChild(cocktailDiv);
}

const addCocktailForm = document.getElementById('addCocktailForm');
addCocktailForm.addEventListener('submit', addCocktail);

fetchCocktails();