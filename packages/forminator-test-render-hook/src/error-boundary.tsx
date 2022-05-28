import {
  Component,
  createContext,
  ErrorInfo,
  PropsWithChildren,
  ReactNode,
} from 'react';

export const ErrorContext = createContext<Error | undefined>(undefined);
export const ResetContext = createContext<undefined | (() => void)>(undefined);

interface OwnProps {
  fallback: ReactNode;
}

export type Props = PropsWithChildren<OwnProps>;

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  private retry = () => {
    this.setState({ error: null });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <ResetContext.Provider value={this.retry}>
          <ErrorContext.Provider value={this.state.error}>
            {this.props.fallback}
          </ErrorContext.Provider>
        </ResetContext.Provider>
      );
    }

    return <>{this.props.children}</>;
  }
}
