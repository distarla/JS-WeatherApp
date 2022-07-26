export default function content(weatherData) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var contentHtml = `
    <p><img src='${weatherData.current.condition.icon}'></p>
    <p>${weatherData.location.region}, ${weatherData.location.country}<br>
    <span class='condition'>${weatherData.current.condition.text}, ${weatherData.current.is_day == 1 ? 'day' : 'night'}</span><br>
    ${weatherData.current.temp_c}º<br>`;
    
    weatherData.forecast.forecastday.forEach(day => {
        contentHtml += `
        <span class='condition'>${days[(new Date(day.date)).getDay()]}
        <img src='${day.day.condition.icon}' width='40px'> ${day.day.condition.text}
        </span><br>`;
    })

    contentHtml += '</p>';

    return contentHtml
}