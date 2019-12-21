import React from 'react';

import './QuoteListItem.css';

const QuoteListItem = props => {
  return (
    <div className='QuoteListItem'>
      <div className="textBlock">
        <p>
          "{props.quoteText}"
        </p>
        <p>
          - {props.quoteAuthor}
        </p>
      </div>
      <div className="controlBlock">
        <button onClick={props.edit} className="editButton">Edit</button>
        <button onClick={props.delete} className="deleteButton">Delete</button>
      </div>
    </div>
  );
};

export default QuoteListItem;