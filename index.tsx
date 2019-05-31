import React from "react";

export interface AsyncViewProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  promise?: Promise<any>;
  children: (data?: any) => any;
  data?: any;

  renderEmpty?: () => any;
  renderLoading?: () => any;
  renderRejected?: (data: any) => any;
}

interface AsyncViewState {
  isLoading: boolean;
  isRejected: boolean;
  data: any;
}

export default class AsyncView extends React.Component<AsyncViewProps, AsyncViewState> {
  state = {
    data: null,
    isLoading: false,
    isRejected: false
  };

  componentWillReceiveProps(newProps: AsyncViewProps) {
    if (newProps.promise) {
      newProps.promise
        .then(data => {
          this.setState({ isLoading: false, data });
        })
        .catch(data => {
          this.setState({ isRejected: true, data });
        });
    } else if (newProps.data) {
      this.setState({ data: newProps.data });
    }
  }

  isEmpty() {
    const { isEmpty } = this.props;
    const data = this.getData();

    return isEmpty || !data || (data && data.length === 0);
  }

  isLoading() {
    return this.props.isLoading || this.state.isLoading;
  }

  isRejected() {
    return this.state.isRejected;
  }

  getData() {
    return this.props.data || this.state.data;
  }

  render() {
    if (this.isLoading()) {
      return this.props.renderLoading && this.props.renderLoading();
    } else if (this.isRejected()) {
      return this.props.renderRejected && this.props.renderRejected(this.getData());
    } else if (this.isEmpty()) {
      return this.props.renderEmpty && this.props.renderEmpty();
    } else {
      return this.props.children(this.getData());
    }
  }
}
