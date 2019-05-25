import React from "react"
import "./buttons.css"

class TimerButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            look: this.props.look,
            altLook: this.props.altLook,
            foundLook: this.props.foundLook,
        };

        this.currentLook = this.state.look;
    }
    
    render(){
        this.currentLook = (this.props.secs % 2 === 0? this.state.look : this.state.altLook)
        if (this.props.found){
            this.currentLook = this.state.foundLook;
        }
        return (
            <React.Fragment>
                <button 
                className={this.currentLook}
                onClick={() => this.props.onClick()}
                >
                    {this.props.mins + ":" + 
                    (this.props.secs < 10 ? 
                    ("0" + this.props.secs) : //else
                    this.props.secs )}
                </button>
            </React.Fragment>
        );
    }
}

class HiddenButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            look: this.props.look,
            altLook: this.props.altLook,
            foundLook: this.props.foundLook,
        };

        this.currentLook = this.state.look;
    }
    
    render(){
        this.currentLook = (this.props.secs % 2 === 0? this.state.look : this.state.altLook)
        if (this.props.found){
            this.currentLook = this.state.foundLook;
        }
            return (
            <React.Fragment>
                <button 
                className={this.currentLook}
                onClick={() => this.props.onClick()}
                >
                    {"." + this.props.mins + ":" + 
                    (this.props.secs < 10 ? 
                    ("0" + this.props.secs) : //else
                    this.props.secs )}
                </button>
            </React.Fragment>
        );
    }
}

class TimerButtonDiv extends React.Component{
    constructor(props) {
    super(props)

    this.state = {
        number: this.props.number,
        color: "steelblue",
        secs: 0,
        mins: 0,
        active: true,
        found: false
        };
    this.buttonX = this.getRandomNum(1, this.state.number);
    this.buttonY = this.getRandomNum(1, this.state.number);
    }

    tick(){
        if (this.state.active){
            this.setState(state => ({
            mins: ((state.secs + 1)%60 === 0 ? state.mins + 1: state.mins),
            secs: (state.secs + 1 < 60 ? state.secs + 1 : 0),
            color: (state.found ? "black" : (state.color === "steelblue" ? "teal" : "steelblue")),
            }));
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    change(){
        this.setState({active: !this.state.active});
    }

    found(){
        alert("You found the button");
        this.setState({found: true});
    }

    getRandomNum(min, max){
        return Math.floor(Math.random() * (max-min) + 1 ) + min;
    }

    render(){
        var buttons = [[]];
        for (let i = 1; i < this.state.number; i++){
            buttons.push([]);
            buttons.push(<div></div>);
            for (let j = 0; j < this.state.number; j++) {
                if(j === this.buttonX && i === this.buttonY){
                    buttons.push(
                        <HiddenButton 
                            secs={this.state.secs} 
                            mins={this.state.mins} 
                            active={this.state.active}
                            found={this.state.found}
                            number={j} 
                            onClick={() => this.found()}
                            key={i+"-"+j}
                            look="button1"
                            altLook="button2"
                            foundLook="foundButton"
                        />
                        );
                }
                else if (i % 2 === 0){
                    if (j % 2 === 0){
                        buttons.push(
                        <TimerButton 
                            secs={this.state.secs} 
                            mins={this.state.mins} 
                            active={this.state.active}
                            found={this.state.found}
                            number={j} 
                            onClick={() => this.change()}
                            key={i+"-"+j}
                            look="button1"
                            altLook="button2"
                            foundLook="button3"
                        />
                        );
                    }
                    else{
                        buttons.push(
                        <TimerButton 
                        secs={this.state.secs} 
                        mins={this.state.mins} 
                        active={this.state.active} 
                        found={this.state.found}
                        number={j} 
                        onClick={() => this.change()}
                        key={i+"-"+j}
                        look="button2"
                        altLook="button1"
                        foundLook="button4"
                    />
                        );
                    }
                }
                else{
                    if (j % 2 === 0){
                        buttons.push(
                        <TimerButton 
                            secs={this.state.secs} 
                            mins={this.state.mins} 
                            active={this.state.active} 
                            found={this.state.found}
                            number={j} 
                            onClick={() => this.change()}
                            key={i+"-"+j}
                            look="button2"
                            altLook="button1"
                            foundLook="button4"
                        />
                        );
                    }
                    else{
                        buttons.push(
                        <TimerButton 
                        secs={this.state.secs} 
                        mins={this.state.mins} 
                        active={this.state.active} 
                        found={this.state.found}
                        number={j} 
                        onClick={() => this.change()}
                        key={i+"-"+j}
                        look="button1"
                        altLook="button2"
                        foundLook="button3"
                    />
                    );
                    }
                }
            }
        }

        return(
            <div style={{background: this.state.color, position: "fixed", width: "100%", height: "100%"}}>
                {buttons}
            </div>
        );
    }
}

export default TimerButtonDiv;