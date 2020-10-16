declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module 'react-notifications' {
  export const NotificationContainer: any;
}
