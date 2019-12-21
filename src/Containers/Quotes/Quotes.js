import React, {Component} from 'react';
import axiosAPI from "../../axiosAPI";
import QuoteListItem from "../../Components/QuoteListItem/QuoteListItem";
import {CATEGORIES} from "../../constants";
import './Quotes.css';


class Quotes extends Component {
  state = {
    quotes: {},
    categoryTitle: 'All',
  };

  async componentDidMount() {
    const response = await axiosAPI.get('/quotes.json');

    if(response.data){
      this.setState({quotes: response.data})
    }
  }

  toEditPage = (id) => {
    this.props.history.push('/quotes/' + id + '/edit');
  };

  showAll = async (categoryID) => {
    const response = await axiosAPI.get('/quotes.json');

    if(response.data){
      this.setState({quotes: response.data, categoryTitle: 'All'})
    }
  };

  changeCategory = async (categoryID) => {
    const response = await axiosAPI.get('/quotes.json?orderBy="quoteCategory"&equalTo="' + categoryID + '"');

    const categoryTitle = CATEGORIES.filter(category => category.id === categoryID)[0].title;

    if(response.data){
      this.setState({quotes: response.data, categoryTitle})
    }
  };

  deleteQuote = async (id) => {
    await axiosAPI.delete('/quotes/' + id + '.json');

    const quotes = {...this.state.quotes};

    delete quotes[id];

    this.setState({quotes});
  };

  render() {
    const quotes = Object.keys(this.state.quotes).reverse().map(id =>
      <QuoteListItem
        key={id}
        quoteText={this.state.quotes[id].quoteText}
        quoteAuthor={this.state.quotes[id].quoteAuthor}
        edit={() => this.toEditPage(id)}
        delete={() => this.deleteQuote(id)}
      />
    );

    const categories = CATEGORIES.map(category =>
      <li
        key={category.id}
        className='categoriesListItem'
        onClick={() => this.changeCategory(category.id)}
      >
        {category.title}
      </li>
    );

    return (
      <div className='Quotes'>
        <div className='categoriesList'>
          <h3>Categories:</h3>
          <ul>
            <li className='categoriesListItem' onClick={this.showAll}>
              All
            </li>
            {categories}
          </ul>
        </div>
        <div className='quotesList'>
          <h2>{this.state.categoryTitle}</h2>
          {quotes}
        </div>
      </div>
    );
  }
}

export default Quotes;