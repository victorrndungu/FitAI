document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    searchFood(query).then(data => {
        displayResults(data);
    });
});

async function searchFood(query) {
    const apiKey = 'uwfReagDY4a0Wk85Q1J63erFV62U1Bs8pIB88N0k'; // Replace with your actual API key
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.foods; // Adjust based on the actual structure of the returned data
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayResults(products) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('result-item');

        const calories = product.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value || 0;
        const protein = product.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value || 0;
        const fat = product.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value || 0;
        const carbs = product.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value || 0;

        listItem.innerHTML = `
            <div class="result-details">
                <span class="result-name">${product.description}</span>
                <div class="nutritional-info">
                    <span class="result-calories">${calories} kcal</span>
                    <span class="result-nutrients">${protein}g protein, ${fat}g fat, ${carbs}g carbs</span>
                </div>
                <div class="portion-adjust">
                    <label for="portion">Portion (g): </label>
                    <input type="number" class="portion-input" value="100">
                </div>
                <button class="add-button">Add</button>
            </div>
        `;

        resultsList.appendChild(listItem);

        const portionInput = listItem.querySelector('.portion-input');
        const addButton = listItem.querySelector('.add-button');

        portionInput.addEventListener('input', function() {
            const portion = parseFloat(portionInput.value) || 100;
            const adjustedCalories = (calories * portion) / 100;
            const adjustedProtein = (protein * portion) / 100;
            const adjustedFat = (fat * portion) / 100;
            const adjustedCarbs = (carbs * portion) / 100;

            listItem.querySelector('.result-calories').textContent = `${adjustedCalories.toFixed(2)} kcal`;
            listItem.querySelector('.result-nutrients').textContent = `${adjustedProtein.toFixed(2)}g protein, ${adjustedFat.toFixed(2)}g fat, ${adjustedCarbs.toFixed(2)}g carbs`;
        });

        addButton.addEventListener('click', function() {
            const portion = parseFloat(portionInput.value) || 100;
            const adjustedCalories = (calories * portion) / 100;
            const adjustedProtein = (protein * portion) / 100;
            const adjustedFat = (fat * portion) / 100;
            const adjustedCarbs = (carbs * portion) / 100;

            const mealType = new URLSearchParams(window.location.search).get('meal');
            const foodItem = {
                name: product.description,
                calories: adjustedCalories.toFixed(2),
                protein: adjustedProtein.toFixed(2),
                fat: adjustedFat.toFixed(2),
                carbs: adjustedCarbs.toFixed(2),
                portion: portion
            };

            addFoodToLog(mealType, foodItem);
        });
    });
}

function addFoodToLog(mealType, foodItem) {
    let loggedFoods = JSON.parse(localStorage.getItem('loggedFoods')) || {};
    if (!loggedFoods[mealType]) {
        loggedFoods[mealType] = [];
    }
    loggedFoods[mealType].push(foodItem);
    localStorage.setItem('loggedFoods', JSON.stringify(loggedFoods));
    window.location.href = 'logFood.html';
}
