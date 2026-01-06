document.addEventListener('DOMContentLoaded', function() {
    const foodFormElement = document.getElementById('foodFormElement');
    const goalFormElement = document.getElementById('goalFormElement');

    foodFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const mealType = document.getElementById('mealType').value;
        const foodName = document.getElementById('foodName').value;
        const calories = parseInt(document.getElementById('calories').value);

        addFoodItem(mealType, foodName, calories);
        closeFoodForm();
    });

    goalFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const goalCalories = parseInt(document.getElementById('goalCalories').value);

        setCalorieGoal(goalCalories);
        closeGoalForm();
    });

    loadLoggedFoods();
});

function openFoodForm(meal) {
    document.getElementById('foodForm').style.display = 'block';
    document.getElementById('mealTitle').innerText = `Add Food to ${meal}`;
    document.getElementById('mealType').value = meal;
}

function closeFoodForm() {
    document.getElementById('foodForm').style.display = 'none';
    document.getElementById('foodFormElement').reset();
}

function openGoalForm() {
    document.getElementById('goalForm').style.display = 'block';
}

function closeGoalForm() {
    document.getElementById('goalForm').style.display = 'none';
    document.getElementById('goalFormElement').reset();
}

function addFoodItem(mealType, foodName, calories) {
    const mealItems = document.getElementById(`${mealType.toLowerCase()}Items`);
    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
    foodItem.innerHTML = `<span>${foodName} - ${calories} kcal</span>`;
    mealItems.appendChild(foodItem);

    updateCalories(calories);
}

function updateCalories(calories) {
    const foodElement = document.getElementById('food');
    const remainingElement = document.getElementById('remaining');

    const currentFoodCalories = parseInt(foodElement.textContent);
    const goalCalories = parseInt(document.getElementById('goal').textContent);

    const newFoodCalories = currentFoodCalories + calories;
    const newRemainingCalories = goalCalories - newFoodCalories;

    foodElement.textContent = newFoodCalories;
    remainingElement.textContent = newRemainingCalories;
}

function setCalorieGoal(goalCalories) {
    const goalElement = document.getElementById('goal');
    const remainingElement = document.getElementById('remaining');
    const foodElement = document.getElementById('food');

    goalElement.textContent = goalCalories;
    remainingElement.textContent = goalCalories - parseInt(foodElement.textContent);
}

function loadLoggedFoods() {
    const loggedFoods = JSON.parse(localStorage.getItem('loggedFoods')) || {};
    for (const mealType in loggedFoods) {
        const mealItems = document.getElementById(`${mealType.toLowerCase()}Items`);
        loggedFoods[mealType].forEach(foodItem => {
            const foodElement = document.createElement('div');
            foodElement.classList.add('food-item');
            foodElement.innerHTML = `<span>${foodItem.name} - ${foodItem.calories} kcal</span>`;
            mealItems.appendChild(foodElement);

            updateCalories(parseFloat(foodItem.calories));
        });
    }
}
