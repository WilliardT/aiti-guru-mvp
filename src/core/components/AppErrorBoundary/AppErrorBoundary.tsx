import { Component, type ErrorInfo, type ReactNode } from 'react';
import AppLayout from '@core/components/AppLayout/AppLayout.tsx';

interface IAppErrorBoundaryProps {
  children: ReactNode;
}

interface IAppErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<IAppErrorBoundaryProps, IAppErrorBoundaryState> {
  state: IAppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): IAppErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Unhandled UI error:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <AppLayout variant="centered">
        <section className="appErrorCard">
          <h1 className="appErrorTitle">Произошла ошибка интерфейса</h1>
          <p className="appErrorText">
            Попробуйте обновить страницу.
          </p>

          <button
            className="appErrorAction"
            type="button"
            onClick={this.handleReload}
          >
            Обновить страницу
          </button>
        </section>
      </AppLayout>
    );
  }
}

export default AppErrorBoundary;
