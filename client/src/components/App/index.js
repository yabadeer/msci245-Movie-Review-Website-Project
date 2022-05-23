import * as React from 'react';

const App = () => {

  const textbooks = [
    {
      title: 'The Road to React',
      url: 'https://www.roadtoreact.com/',
      author: 'Wieruch, R.',
      year: "2021",
    }, {
      title: 'Learning Node.js',
      url: 'https://github.com/marcwan/LearningNodeJS',
      author: 'Wandschneider, Marc',
      year: "2017",
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedTextbooks = textbooks.filter(function (book) {
    return book.title.includes(searchTerm);
  });



  return (
    <div>
      <h1>
        React Lecture 3_2
      </h1>

      <Search onSearch={handleSearch} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <hr />

      <List list={searchedTextbooks} />

    </div>
  );
}

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      onChange={props.onSearch}
    />

  </div>
);



const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
        return (
          <Item item={item} />
        );
      })}
    </ul>

  )
}

const Item = (props) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>{props.item.url}</a>
      </span>
      <span> {props.item.title}</span>
      <span>{" by " + props.item.author}</span>
    </li>
  )
}


export default App;