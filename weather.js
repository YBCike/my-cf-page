// 配置你的和风天气API Key 
const API_KEY = "677c59a70ce845a7a9524c86ff89cb43"; // 替换成你的实际API Key 
 
// 获取天气数据的函数 
async function getWeather(location) {
    try {
        // 1. 获取城市ID（基于位置名称）
        const cityResponse = await fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${API_KEY}`); 
        const cityData = await cityResponse.json(); 
        
        if (cityData.code  !== "200" || !cityData.location  || cityData.location.length  === 0) {
            throw new Error("无法获取位置信息");
        }
        
        const locationId = cityData.location[0].id; 
        const cityName = cityData.location[0].name; 
        
        // 2. 获取当前天气数据 
        const weatherResponse = await fetch(`https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=${API_KEY}`); 
        const weatherData = await weatherResponse.json(); 
        
        if (weatherData.code  !== "200") {
            throw new Error("无法获取天气数据");
        }
        
        // 3. 更新页面显示 
        updateWeatherDisplay(cityName, weatherData.now); 
        
    } catch (error) {
        console.error(" 获取天气数据出错:", error);
        document.getElementById('location').textContent  = "获取天气失败，请刷新重试";
    }
}
 
// 更新页面显示的函数 
function updateWeatherDisplay(cityName, weatherInfo) {
    document.getElementById('location').textContent  = cityName;
    document.getElementById('temp').textContent  = `${weatherInfo.temp}°C`; 
    document.getElementById('condition').textContent  = weatherInfo.text; 
    document.getElementById('humidity').textContent  = `${weatherInfo.humidity}%`; 
    document.getElementById('wind').textContent  = `${weatherInfo.windSpeed}  km/h`;
    document.getElementById('update-time').textContent  = weatherInfo.obsTime; 
    
    // 设置天气图标（和风天气图标需要替换为你的实际路径）
    const iconCode = weatherInfo.icon; 
    document.getElementById('weather-icon').src  = `https://qweather.com/favicon.ico`;  // 替换为实际图标路径 
}
 
// 获取用户位置（默认设为北京）
function initWeather() {
    // 你可以在这里修改默认位置 
    const defaultLocation = "北京";
    getWeather(defaultLocation);
    
    // 或者使用浏览器定位（需要用户授权）
    // if (navigator.geolocation)  {
    //     navigator.geolocation.getCurrentPosition( 
    //         (position) => {
    //             const { latitude, longitude } = position.coords; 
    //             getWeather(`${longitude},${latitude}`);
    //         },
    //         (error) => {
    //             console.error(" 获取位置失败:", error);
    //             getWeather(defaultLocation);
    //         }
    //     );
    // } else {
    //     getWeather(defaultLocation);
    // }
}
 
// 页面加载完成后初始化天气 
document.addEventListener('DOMContentLoaded',  initWeather);
