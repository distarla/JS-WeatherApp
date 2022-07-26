const weather = async (local) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=11cc9bdc14db40e18c3171106221405&q=${local}&days=3&aqi=no&alerts=no`);
    if (response.status != 200) {
        throw new Error('Não é possível ler os dados!');
    }
    const data = await response.json();

    return data;
}

export default weather;