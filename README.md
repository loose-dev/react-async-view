# react-async-view

Lightweight **React** component for handling data that can be fetched asynchronously. This kind of data can typically be in a loading, empty, ready or error state. Handling all of these states can result in code that is not very clean or readable. AsyncView component solves this issue. Works well with **React Native** too.

## 🖥 Install

`npm i react-async-view`

## ⌨️ Usage

With a promise returning an array (isLoading, isEmpty and error checks are done automatically).

```jsx
<AsyncView
  promise={this.booksPromise}
  renderLoading={() => <div>Loading...</div>}
  renderEmpty={() => <div>No books found</div>}
  renderRejected={() => <div>Error loading books</div>}
>
  {(books: Books) =>
    books.map(book => (
      <div>
        <b>{book.name}</b>
        Author: {book.author}
      </div>
    ))
  }
</AsyncView>
```

If books is null (or anything falseable) renderEmpty is used instead. You don't have to check if `books` is defined.

You can also use `data` props instead of `promise`. In this case you should provide `isLoading` and `isError` props too. Component still checks if `data` is empty, but `isEmpty` override is available.

## 🤕 Comparison

**Without AsyncView** the code would look like something like this:

```jsx
// componentWillMount()
this.setState({ isLoading: true });

fetchJson("http://example.com/books.json")
  .then(books => {
    this.setState({
      isLoading: false,
      books
    });
  })
  .catch(error => {
    this.setState({
      isError: true,
      isLoading: false,
      error
    });
  });

// render()
const { books, isLoading, isError, error } = this.state;

if (isLoading) {
  return <div>Loading...</div>;
} else if (!books) {
  return <div>No books found</div>;
} else if (books.length > 0) {
  return (
    <Fragment>
      books.map(book => (
      <div>
        <b>{book.name}</b>
        Author: {book.author}
      </div>
      ))
    </Fragment>
  );
}
```
