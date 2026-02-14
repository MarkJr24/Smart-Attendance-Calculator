let chart;

function calculateAttendance() {

    let total = parseInt(document.getElementById("totalClasses").value);
    let attended = parseInt(document.getElementById("attendedClasses").value);
    let future = parseInt(document.getElementById("futureClasses").value) || 0;

    let resultDiv = document.getElementById("result");
    let extraInfoDiv = document.getElementById("extraInfo");

    if (isNaN(total) || isNaN(attended) || total <= 0 || attended < 0 || attended > total) {
        resultDiv.innerHTML = "⚠️ Please enter valid numbers!";
        resultDiv.style.color = "red";
        extraInfoDiv.innerHTML = "";
        return;
    }

    let percentage = (attended / total) * 100;
    percentage = percentage.toFixed(2);

    resultDiv.innerHTML = `Current Attendance: ${percentage}%`;

    if (percentage >= 75) {
        resultDiv.style.color = "green";
    } else {
        resultDiv.style.color = "red";
    }

    // -------------------
    // AI Prediction Logic
    // -------------------

    // Assume user continues same attendance pattern
    let attendanceRate = attended / total;

    let predictedAttended = attended + (future * attendanceRate);
    let predictedTotal = total + future;

    let predictedPercentage = ((predictedAttended / predictedTotal) * 100).toFixed(2);

    extraInfoDiv.innerHTML = `
        🔮 Predicted Attendance After ${future} Classes: 
        <b>${predictedPercentage}%</b>
    `;

    createChart(percentage, predictedPercentage);
}

function createChart(current, predicted) {

    const ctx = document.getElementById('attendanceChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current Attendance', 'Predicted Attendance'],
            datasets: [{
                label: 'Attendance %',
                data: [current, predicted],
                backgroundColor: ['#4e73df', '#1cc88a']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
