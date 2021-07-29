import React, { Component } from 'react'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            })
    }

    // if rewritten as an arrow function - handleChange = (event) => {} -, the bind written above isn't needed 
    handleChange(event){
        const {name, value} = event.target //pulls name and value 
        this.setState({ [name]: value}) //updates state (whatever the name is, give the value inputted in the box)
    }

    /**
     * A method that, when the "Gen" button is clicked, chooses one of the memes from our 'allMemeImgs' array at random and makes it so that 
     * is the meme image that shows up in the bottom portion of the meme generator site (property: '.url')
     * 
     */
    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length) // get a random number that reps the index in the array
        const randMemeImg = this.state.allMemeImgs[randNum].url // get the meme from that index
        this.setState({ randomImg: randMemeImg }) // set 'randomImg' to '.url'  of the random item grabbed
    }

    render(){
        return(
           <div>
               <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        value={this.state.topText}
                        placeholder="Top Text"
                        name="topText"
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        value={this.state.bottomText}
                        placeholder="Bottom Text"
                        name="bottomText"
                        onChange={this.handleChange} 
                    />
                   
                   <button>Gen</button>
               </form>

               <div className="meme">
                   <img src={this.state.randomImg} alt="" />
                   <h2 className="top">{this.state.topText}</h2>
                   <h2 className="bottom">{this.state.bottomText}</h2>
               </div>
           </div>
        )
    }
}

export default MemeGenerator