import React from 'react';
import Content from './content.json';
const styles = {
    container: {
        width: '100%',
        minHeight: window.innerHeight,
        backgroundColor: '#FCF4E7',
        //textAlign: 'center',
        margin: 'auto',
    },
    statementContent: {
        color: '#666666',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'left'
    },
    statementSubTitle: {
        color: '#1A1A1A',
        fontSize: 15,
        textAlign: 'left'
    },
    detailContainer: {
        color: '#666666',
        fontSize: 12,
        //marginTop: 80,
        paddingTop:90,
        paddingLeft: 12,
        paddingRight: 12,
        minHeight: window.innerHeight - 200
    },
};
class Statement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentType: props.content,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contentType: nextProps.content });

    }


    _renderContent = () => {
        let contents = [];
        if (this.state.contentType === "私隱條例") {
            contents = Content.privacy;
        } else if (this.state.contentType === "版權聲明") {
            contents = Content.copyright;
        } else {
            contents = Content.disclaimer;
        }

        return contents.map((content, index) => {
            let style = styles.statementContent;
            if (content.startsWith("ST")) {
                content = content.substring(2, content.length);
                style = styles.statementSubTitle;
            }
            return (
                <div key={index} style={style}>
                    {content}
                </div>
            );

        });
    }

    render() {
      let detailContainer =  {
          color: '#666666',
          fontSize: 12,
          //marginTop: 80,
          paddingTop:90,
          paddingLeft: 12,
          paddingRight: 12,
          minHeight: window.innerHeight - 200,
          width:'100%'
      };

        return (
                <div style={detailContainer}>
                    {this._renderContent()}
                </div>
        );
    }
}


export default Statement;
