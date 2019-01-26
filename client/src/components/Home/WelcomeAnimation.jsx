import React, { Component } from "react";
import Typed from "typed.js";

export default class WelcomeAnimation extends Component {

    componentDidMount() {
      const options = {
            strings: ['', 'Welcome to your Scheduler.'],
            typeSpeed: 50,
            backSpeed: 50
      };

      this.typed = new Typed(this.el, options);
    }

    render(){
        return (
            <div style={{ marginLeft: '11%', marginTop: '10%' }}>
                <span
                    className='zoneWelcomeMsg'
                    style={{ whiteSpace: 'pre' }}
                    ref={(el) => { this.el = el; }}
                />
            </div>
        )
    }
}