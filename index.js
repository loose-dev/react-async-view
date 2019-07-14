"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class AsyncView extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: null,
            isLoading: false,
            isRejected: false
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.promise) {
            newProps.promise
                .then(data => {
                this.setState({ isLoading: false, data });
            })
                .catch(data => {
                this.setState({ isRejected: true, data });
            });
        }
        else if (newProps.data) {
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
        }
        else if (this.isRejected()) {
            return this.props.renderRejected && this.props.renderRejected(this.getData());
        }
        else if (this.isEmpty()) {
            return this.props.renderEmpty && this.props.renderEmpty();
        }
        else {
            return this.props.children(this.getData());
        }
    }
}
exports.default = AsyncView;
