import React, {Component} from 'react';
import axiosAPI from "../../axiosAPI";
import QuoteListItem from "../../Components/QuoteListItem/QuoteListItem";
import {CATEGORIES} from "../../constants";
import './Quotes.css';


class Quotes extends Component {
  state = {
    quotes: {},
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
      >
        {category.title}
      </li>
    );

    return (
      <div className='Quotes'>
        <div className='categoriesList'>
          <h3>Categories:</h3>
          <ul>
            {categories}
          </ul>
        </div>
        <div className='quotesList'>
          <h4>Some category yet</h4>
          {quotes}
        </div>
      </div>
    );
  }
}

export default Quotes;