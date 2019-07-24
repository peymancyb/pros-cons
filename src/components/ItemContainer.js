import React, { Component } from 'react';
import 'styles/main.css';
import _ from 'lodash';
import { renderIf } from 'utils';
import PropTypes from 'prop-types';


const Title = (props) => {
    return (
        <div className="title-box">
            <p className="center-text title-text">{props.title}</p>
        </div>
    );
};

class ItemContainer extends Component {
    render() {
        const { title, data, leftBorder } = this.props;
        const border = leftBorder ? "borderLeftStyle" : "borderRightStyle";
        const borderStyle = {
            [border]: "solid",
            borderColor: "#8d8b8d",
        }

        return (
            <div 
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => this.onDrop(e, title)}
                style={borderStyle} 
                className="container-style">
                    <Title title={title} />
                    <div className="overflow-scroll">
                        {
                            renderIf(
                                !_.isEmpty(data),
                                this.renderInputs(title, data),
                                this.notFound()
                            )
                        }
                    </div>
            </div>
        )
    }

    renderInputs(title, data) {
        const { handleChange } = this.props;
        return data.map((item, index) => {
            const key = `${title}-${index}`;
            return (
                <div 
                    draggable
                    onDragStart={event => this.onDragStart(event, key)}
                    className="row-container" 
                    key={key}>
                        <p className="number-style">{index + 1}. </p>
                        <input 
                            className="input-style"
                            value={item.value}
                            type="text"
                            onChange={(e) => handleChange(index, e)}
                        />
                </div>
            );
        })
    }

    onDragStart(event, id) {
        event.dataTransfer.setData("id", id);
    }

    notFound(){
        return (
            <div className="center-text">
                <p>No data found!</p>
            </div>
        );
    }

    onDragOver(event){
        event.preventDefault();
    }

    onDrop(ev, container) {         
        const id = ev.dataTransfer.getData("id");  
        const idItems = id.split('-');
        if(idItems[0] === container) {
            return;
        }
        const itemIndex = Number(idItems[1]);
        this.props.handleOnDrop(idItems[0], itemIndex);
    }
}


ItemContainer.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleOnDrop: PropTypes.func.isRequired,
    leftBorder: PropTypes.bool
  };

export default ItemContainer;