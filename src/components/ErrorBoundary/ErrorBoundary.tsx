import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error:State):State|null {
    return {hasError: true};
  }

  componentDidCatch(error:Error, info:ErrorInfo):void {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1 className="text text_type_main-large">Что-то пошло не так :</h1>
          <p className="text text_type_main-medium">
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
