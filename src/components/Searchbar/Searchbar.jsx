import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handlechange = evt => {
    this.setState({ imgName: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    const { imgName } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span>
              <BiSearchAlt
                style={{ fill: 'blue', width: '20px', height: '20px' }}
              />
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            value={imgName}
            onChange={this.handlechange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
