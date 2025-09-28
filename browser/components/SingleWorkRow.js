import React, { Component } from 'react';
import SingleWorkRowDescription from './SingleWorkRowDescription';
import SingleWorkRowEdit from './SingleWorkRowEdit';

class SingleWorkRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: props.editing || false,
      work: props.work,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.work !== this.props.work) {
      this.setState({ work: this.props.work });
    }
  }

  handleChange = e => {
    this.setState({
      work: {
        ...this.state.work,
        [e.target.name]: e.target.value,
      },
    });
  };

  toggleEdit = () => {
    const { newWork, saveNewWork, updateWork } = this.props;

    if (this.state.editing) {
      if (newWork) {
        saveNewWork(this.state.work);
      } else {
        updateWork(this.state.work);
      }
    }

    this.setState(prevState => ({
      editing: !prevState.editing,
    }));
  };

  render() {
    const { idx } = this.props;
    const { editing, work } = this.state;

    return editing ? (
      <SingleWorkRowEdit
        work={work}
        idx={idx}
        handleChange={this.handleChange}
        toggleEdit={this.toggleEdit}
      />
    ) : (
      <SingleWorkRowDescription
        work={this.props.work}
        idx={idx}
        toggleEdit={this.toggleEdit}
      />
    );
  }
}

export default SingleWorkRow;