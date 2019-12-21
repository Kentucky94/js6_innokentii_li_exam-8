import React, {Component} from 'react';
import axiosAPI from "../../axiosAPI";
import {CATEGORIES} from '../../constants';

import './AddQuote.css';

class AddQuote extends Component {
  state = {
    quoteText: '',
    quoteAuthor: '',
    quoteCategory: CATEGORIES[0].id,
  };

  changeDataHandler = event => {
    const type = event.target.name;

    this.setState({
      [type]: event.target.value,
    });
  };

  changeCategoryIDHandler = event => {
    const type = event.target.name;

    const categoryID = CATEGORIES.filter(category => category.title === event.target.value)[0].id;

    if(categoryID){
      this.setState({
        [type]: categoryID
      });
    }
  };

  sendDataHandler = async (event) => {
    event.preventDefault();

    const newQuoteData = {
      quoteText: this.state.quoteText,
      quoteAuthor: this.state.quoteAuthor,
      quoteCategory: this.state.quoteCategory,
    };

    await axiosAPI.post('/quotes.json', newQuoteData);

    this.props.history.push('/');
  };

  render() {
    return (
      <div className='AddQuote'>
        <h2>Add New Quote</h2>

        <form onSubmit={this.sendDataHandler}>
          <label htmlFor='quoteCategory'>Category</label>
          <select
            name="quoteCategory"
            id="quoteCategory"
            onChange={this.changeCategoryIDHandler}
            value={CATEGORIES.filter(category => category.id === this.state.quoteCategory)[0].title}
            className='QuoteCategory'
          >
            {CATEGORIES.map(category => {
              return <option key={category.id} value={category.title}>{category.title}</option>
            })}
          </select>

          <label htmlFor='quoteAuthor'>Author</label>
          <input
            name='quoteAuthor'
            id='quoteAuthor'
            onChange={this.changeDataHandler}
            type="text"
            value={this.state.quoteAuthor}
            className='QuoteAuthor'
          />

          <label htmlFor='quoteText'>Quote</label>
          <textarea
            name='quoteText'
            id='quoteText'
            onChange={this.changeDataHandler}
            value={this.state.quoteText}
            className='QuoteText'
          />

          <button className='FormButton'>Save</button>
        </form>
      </div>
    );
  }
}

export default AddQuote;