import React, { Component } from 'react';

//import Tag from './Tag.js';
//import Button from './Button.js';

export default class Episode extends Component {


  render() {
    let episode = this.props.episode;

    return (
      <div className="browser-item" onClick={this.props.play}>
        <img src={episode.image ? episode.image : this.props.backupImage} alt=""/>
        <div className="item-description">
          <h2>{episode.title}</h2>
        </div>
      </div>
    );



    //          <p dangerouslySetInnerHTML={{__html: episode.description}}></p>


    /*return (
      <div className="underlined padding-slight flexbox-left">
        <img className="thumbnail" src={this.props.image} alt=""/>

        <div>
          <div className="flexbox-seperate">
            <div className="bold">{this.props.title}</div>
            <div className="flexbox-center">
              <Tag colour="red" name="Watched" />
              <Tag colour="#6688aa" name="Gay" />
            </div>
          </div>

          <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>

          <Button text="play" onClick={this.props.playAudio}/>
        </div>

        
      </div>
    );*/
  }
}
