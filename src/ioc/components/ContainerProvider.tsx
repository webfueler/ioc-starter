import * as React from 'react';
import { interfaces } from 'inversify';

interface ContainerProviderContextProps {
    container: interfaces.Container | null;
}

const ContainerProviderContext = React.createContext<
    ContainerProviderContextProps
>({ container: null });

const ContainerProvider: React.FC<ContainerProviderContextProps> = (props) => {
    return (
        <ContainerProviderContext.Provider value={{ container: props.container }} >
            { props.children }
        </ContainerProviderContext.Provider>
    );
};

export { ContainerProvider, ContainerProviderContext };
