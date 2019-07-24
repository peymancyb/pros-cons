import React, { Component } from 'react';
import 'styles/main.css'
import Header from 'components/Header';
import ItemContainer from 'components/ItemContainer';
import { connect } from 'react-redux'
import { 
    handleProsChange, 
    handleConsChange,
    addPros,
    addCons,
    removePros,
    removeCons
} from 'redux-store/actions'
import _ from 'lodash';

class Board extends Component {
    constructor(props){
        super(props);

        this.handleConsChange = this.handleConsChange.bind(this);
        this.handleProsChange = this.handleProsChange.bind(this);
        this.checkProsList = this.checkProsList.bind(this);
        this.checkConsList = this.checkConsList.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    render() {
        const { pros, cons } = this.props;
        return (
            <div className="board-container">
                <div className="board">
                    <Header text={"Should I eat at McDonalds?"}/>
                    <div className="flex-row">
                        <ItemContainer 
                            title={'PROS'}
                            data={pros}
                            handleChange={this.handleProsChange}
                            handleOnDrop={this.handleOnDrop}
                        />
                        <ItemContainer 
                            title={'CONS'}
                            data={cons}
                            leftBorder
                            handleChange={this.handleConsChange}
                            handleOnDrop={this.handleOnDrop}
                        />
                    </div>
                </div>
            </div>
        );
    }

    handleProsChange(index, event) {
        const { handleProsChange } = this.props;
        const { target } = event;
        const value = target.value;
        handleProsChange({ index, value });
        this.checkProsList(value, index);
    }

    handleConsChange(index, event) {
        const { handleConsChange } = this.props;
        const value = event.target.value
        handleConsChange({ index, value });
        this.checkConsList(value, index);
    }

    checkProsList(value, index) {
        const { pros, addPros, removePros } = this.props;
        const dataLength = pros.length;
        const isLastElement = this.isLastElement(dataLength, index);

        const _shouldRemoveInput = this.shouldRemoveRow(value, dataLength);
        if(!isLastElement && _shouldRemoveInput) {
            removePros(index);
            return;
        }
    
        const _shouldAddInput = this.shouldAddRow(index, dataLength);
        if(_shouldAddInput) { 
            addPros();
            return;
        }
    }

    checkConsList(value, index) {
        const { cons, addCons, removeCons } = this.props;
        const dataLength = cons.length;
        const isLastElement = this.isLastElement(dataLength, index);
        
        const _shouldRemoveInput = this.shouldRemoveRow(value, dataLength);
        if(!isLastElement && _shouldRemoveInput) {
            removeCons(index);
            return;
        }
    
        const _shouldAddInput = this.shouldAddRow(index, dataLength);
        if(_shouldAddInput) { 
            addCons();
            return;
        }
    }

    handleOnDrop(from, itemIndex) {
        const { 
            addPros,
            removePros,
            addCons,
            removeCons
        } = this.props;
        const fromCategoryName = from.toLowerCase();

        const itemToExchange = this.props[fromCategoryName][itemIndex];
        if(_.isEmpty(itemToExchange.value)){
            return;
        }

        if(fromCategoryName === 'pros'){
            addCons(itemToExchange);
            removePros(itemIndex);
        } else {
            addPros(itemToExchange);
            removeCons(itemIndex);
        }
    }

    shouldRemoveRow(value, dataLength) {
        const shouldRemove = (_.isEmpty(value)) && (dataLength > 1);
        return shouldRemove;
    }

    shouldAddRow(index, dataLength) {
        const isLastElement = ((dataLength - 1) === index);
        return isLastElement;
    }

    isLastElement(dataLength, index) {
        return ((dataLength -1) === index);
    }
}

const mapStateToProps = (state) => ({
    pros: state.pros,
    cons: state.cons
});

const mapDispatchToProps = {
    handleProsChange, 
    handleConsChange,
    addPros,
    removePros,
    addCons,
    removeCons
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Board);