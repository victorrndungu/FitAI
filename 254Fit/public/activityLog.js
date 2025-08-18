import { db, auth } from '../src/firebase-config.js';

// Function to fetch user profile
async function fetchUserProfile(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data();
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

// Function to log activity
async function logActivity(activityLog) {
    try {
        const user = auth.currentUser;
        if (user) {
            await db.collection('users').doc(user.uid).collection('activities').add(activityLog);
            console.log('Activity logged:', activityLog);
        } else {
            console.log('User not authenticated');
        }
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

// Function to get activities for the current user
async function getUserActivities(userId) {
    const activities = [];
    try {
        const q = db.collection('users').doc(userId).collection('activities')
            .where('date', '>=', startOfWeek())
            .where('date', '<=', endOfWeek());
        const querySnapshot = await q.get();
        querySnapshot.forEach(doc => {
            activities.push(doc.data());
        });
    } catch (error) {
        console.error('Error getting activities:', error);
    }
    return activities;
}

// Function to calculate calories burned
function calculateCaloriesBurned(activity, duration, distance, weight) {
    const MET = {
        running: 9.8,
        walking: 3.8,
        cycling: 7.5,
        swimming: 8.0,
        weightlifting: 6.0,
        yoga: 3.0
    };
    const metValue = MET[activity] || 5;
    const caloriesBurned = (metValue * weight * duration) / 60;
    return caloriesBurned;
}

// Get the start of the current week (Monday)
function startOfWeek() {
    const now = new Date();
    const first = now.getDate() - now.getDay() + 1;
    return new Date(now.setDate(first)).setHours(0, 0, 0, 0);
}

// Get the end of the current week (Sunday)
function endOfWeek() {
    const now = new Date();
    const last = now.getDate() - now.getDay() + 7;
    return new Date(now.setDate(last)).setHours(23, 59, 59, 999);
}

// Function to update the weekly records display
function updateWeeklyRecordsDisplay(activities, dailyGoal) {
    const weeklyRecordsList = document.getElementById('weeklyRecords');
    weeklyRecordsList.innerHTML = '';

    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    daysOfWeek.forEach((day, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('weekly-record-item');
        
        const dayActivities = activities.filter(activity => {
            return new Date(activity.date.toDate()).getDay() === index;
        });
        
        const totalDuration = dayActivities.reduce((total, activity) => total + activity.duration, 0);
        const fillPercentage = Math.min((totalDuration / dailyGoal) * 100, 100);

        listItem.innerHTML = `
            <div class="ring">
                <div class="mask"></div>
                <div class="fill" style="transform: rotate(${(fillPercentage / 100) * 360}deg);"></div>
            </div>
            <span>${day}</span>
        `;

        weeklyRecordsList.appendChild(listItem);
    });
}

// Event listener for logging activity
document.getElementById('logActivityButton').addEventListener('click', async function () {
    const activity = document.getElementById('activity').value;
    const duration = parseInt(document.getElementById('duration').value, 10);
    const distance = parseFloat(document.getElementById('distance').value) || 0;

    if (!activity || !duration) {
        alert('Please fill in all required fields.');
        return;
    }

    const user = auth.currentUser;

    if (!user) {
        alert('User not authenticated');
        return;
    }

    const userProfile = await fetchUserProfile(user.uid);
    const weight = userProfile.weight || 70; // Default weight if not set
    const dailyGoal = userProfile.dailyGoal || 30; // Default daily goal if not set

    const caloriesBurned = calculateCaloriesBurned(activity, duration, distance, weight);
    const date = new Date().toISOString().split('T')[0];

    const activityLog = {
        userId: user.uid,
        activity,
        duration,
        distance,
        caloriesBurned,
        date: firebase.firestore.Timestamp.fromDate(new Date(date))
    };

    await logActivity(activityLog);
    const activities = await getUserActivities(user.uid);
    displayActivityLogs(activities);
    updateWeeklyRecordsDisplay(activities, dailyGoal);
});

// Function to display activity logs
function displayActivityLogs(activities) {
    const activityLogsList = document.getElementById('activityLogs');
    activityLogsList.innerHTML = '';

    activities.forEach(log => {
        const listItem = document.createElement('li');
        listItem.classList.add('activity-log-item');
        listItem.textContent = `${log.date.toDate().toLocaleDateString()} - ${log.activity}: ${log.duration} minutes, ${log.distance} km, ${log.caloriesBurned.toFixed(2)} kcal`;
        activityLogsList.appendChild(listItem);
    });
}

// Initial display of activity logs
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(async user => {
        if (user) {
            const userProfile = await fetchUserProfile(user.uid);
            const activities = await getUserActivities(user.uid);
            displayActivityLogs(activities);
            updateWeeklyRecordsDisplay(activities, userProfile.dailyGoal || 30); // Default daily goal if not set
        } else {
            console.log('No user signed in');
        }
    });
});
