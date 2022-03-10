import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Triangle } from 'react-loader-spinner';
import ImageGallery from './ImageGallery/ImageGallery';
import apiService from './services/ImgApi';
import Button from './Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { SRLWrapper } from 'simple-react-lightbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    data: null,
    imgName: '',
    error: null,
    page: 1,
    status: 'idle',
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName, page } = this.state;
    if (prevState.imgName.trim() !== imgName.trim()) {
      this.setState(prevState => {
        return { status: 'pending', page: prevState.page + 1 };
      });
      setTimeout(() => {
        apiService(imgName, page)
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            return Promise.reject(
              new Error(`Sorry we don't have image by tag ${imgName}`)
            );
          })
          .then(data => {
            console.log(data);
            const hits = data.hits;
            if (hits.length === 0) { 
              this.setState({ status: 'resolved' });
              return toast.error(`Sorry we don't have image by tag ${imgName}`);
            };

            this.setState({
              data: hits,
              status: 'resolved',
              total: data.totalHits,
            });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  handleFormSubmit = name => {
    if (this.state.imgName.toLowerCase() === name.toLowerCase()) {
      return toast.warning('This name is already entered');
    }
    this.setState({ imgName: name, page: 1 });
  };

  handleClick = evt => {
    const { imgName, page } = this.state;
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
    setTimeout(() => {
      apiService(imgName, page)
        .then(response => {
          return response.json();
        })
        .then(data =>
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...data.hits],
            };
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }, 500);

    toast.promise(apiService, {
      pending: 'Promise is pending',
    });
  };

  render() {
    const { data, status, error, total} = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '150px',
            }}
          >
            <Triangle color="#00BFFF" height={200} width={200} />
          </div>
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <SRLWrapper>
            <ImageGallery data={data} />
          </SRLWrapper>
          {data.length < total && <Button text="Load more" onClick={this.handleClick} />}
          <ToastContainer />
        </>
      );
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }
  }
}

export { App };
