const yargs = require('yargs')
const request = require('request')
const chalk = require('chalk')
const axios = require('axios');

yargs.command({
    command: 'weather',
    describe: 'get weather',
    builder:{
        address:{
            describe: 'Enter address',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        getWeather(argv.address)
    }
})

const getWeather = function(address) {
    const params = {
    access_key: 'ad6d5c569fd48c67076910e08e7b2e41',
    query: address
    }
    let latitude =''
    let longitude =''
    let url= ''

    axios.get('http://api.positionstack.com/v1/forward', {params})
    .then(response => {
        latitude = response.data.data[0].latitude
        longitude = response.data.data[0].longitude
        url = 'http://api.weatherstack.com/current?access_key=6459f02bbb7911dce62287ec08544885&query='+latitude+','+longitude+'&units=m'
    }).catch(error => {
        console.log(error);
    });

    setTimeout(()=>{request({ url: url, json: true },(error, response) => {
        const temp = response.body.current.temperature
        console.log(response.body.current.weather_descriptions[0]+'. It is currently '+chalk.yellow.inverse(temp)+' degree celcius in '+ response.body.location.name)
    } )},2000)
}

yargs.parse()