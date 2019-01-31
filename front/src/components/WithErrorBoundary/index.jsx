import React, { PureComponent } from 'react';
import ErrorBoundary from 'react-error-boundary';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withErrorBoundary = () => (WrappedComponent) => {
  return class extends PureComponent {
    static displayName = `withErrorBoundary(${getDisplayName(WrappedComponent)})`;
    render() {
      return (
        <ErrorBoundary>
          <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};

export default withErrorBoundary;
