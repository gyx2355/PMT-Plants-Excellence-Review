import { Component, type ReactNode, type ErrorInfo } from 'react';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  Button,
} from '@fluentui/react-components';
import { DismissCircle24Regular } from '@fluentui/react-icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Global Error Boundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <MessageBar intent="error" icon={<DismissCircle24Regular />}>
            <MessageBarTitle>An unexpected application error occurred</MessageBarTitle>
            <MessageBarBody>
              {this.state.error?.message || 'Something went wrong while rendering this section.'}
            </MessageBarBody>
            <div style={{ marginTop: '12px' }}>
              <Button
                appearance="primary"
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
              >
                Reload Application
              </Button>
            </div>
          </MessageBar>
        </div>
      );
    }

    return this.props.children;
  }
}
