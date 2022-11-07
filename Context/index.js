import AlertContextWrapper from './AlertContext';

const GlobalContext = ({ children }) => {
    return (
        <AlertContextWrapper>
            {children}
        </AlertContextWrapper>
    );
}

export default GlobalContext;