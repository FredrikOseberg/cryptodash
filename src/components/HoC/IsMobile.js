import React, { Component } from 'react';

export function isMobile(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				width: window.innerWidth
			};
		}

		componentWillMount() {
			window.addEventListener('resize', this.handleWindowSizeChange);
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.handleWindowSizeChange);
		}

		handleWindowSizeChange = () => {
			this.setState({ width: window.innerWidth });
		};

		render() {
			const isMobile = this.state.width <= 790;
			return <WrappedComponent isMobile={isMobile} {...this.props} />;
		}
	};
}
