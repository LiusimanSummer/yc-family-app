import React from 'react';
import axios from 'axios';
import Button from '../../Button'

export default class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          imageCells: []
        };
    }

    componentDidMount(){
      this.fetchData();
    }

    async fetchData(){
      var bedside = await axios.get(process.env.REACT_APP_API + 'download/memories.json')
      //console.log(_bedside.data)
      this.setState({
        imageCells: bedside.data.Folders[4].imageCells
      });
    }

    _renderImages = () => {

        return (
            this.state.imageCells.map((cell, index) => {
              const url = process.env.REACT_APP_API + 'download/' + cell.name;
                return <img key={index} style={styles.image} src={url} alt=''/>
            })
        );
    }

    render() {
      let imageContainer = {
        paddingTop: 55,
        minHeight: window.innerHeight - 150,
        width: "100%",
        textAlign: 'center'
      };
      return (
        <div style={imageContainer}>
            {this._renderImages()}
          <Button text='回到頂部' onClick={()=>{window.scrollTo(0,0)}}/>
        </div>
      );
    }
}

const styles = {
    image: {
      width: window.innerWidth,
      marginTop: 20,
      maxWidth: 800
      //height: '20%'
    },
    imageContainer: {
      paddingTop: 55,
      minHeight: window.innerHeight - 150,
      width: "100%",
      textAlign: 'center'
    },
    homeContainer: {
      textAlign: 'center',
      width: window.innerWidth
    }

};
