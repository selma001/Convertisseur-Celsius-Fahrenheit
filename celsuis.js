const scaleNames={
    c: 'Celsius',
    f: 'Fahrenheit'
}

//fonction de convention
function toCelsius (fahrenheit){
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit (celsius){
    return (celsius * 9 /5) + 32
}

function Boilingverdict({celsius}) {
    if (celsius>=100) {
        return <div className="alert alert-success"> L'eau bout</div>
    }
    return <div className="alert alert-info">L'eau ne bout pas </div>
}

class TemperatureInput extends React.Component{

    constructor (props) {
        super(props)
        //this.state = {temperature: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const name= 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
             <label htmlFor={name}> temperature (en {scaleName})</label>
             <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange}/>
        </div>
    }

}

class Calculator extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    //methode handlechange pour nous permettre de changer la valeur
    handleChange(e) {
        this.setState({temperature: e.target.value})
    }

    handleTemperatureChange(temperature) {
        this.setState({temperature})
    }

    handleCelsiusChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render () {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : toCelsius(temperature)
        const fahrenheit = scale ==='f' ? temperature : toFahrenheit(celsius) 
        return <div>
          {/*<div className="form-group">
             <label htmlFor="celsius"> temperature (en celsius)</label>
             <input type="text" id="celsius" value={temperature} className="form-control" onChange={this.handleChange}/>
          </div>*/}
          <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
          <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
          <Boilingverdict celsius={celsius}/>
        </div>
    }

}

ReactDOM.render(<Calculator/>, document.getElementById('app'))