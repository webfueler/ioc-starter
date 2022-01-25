import { interfaces } from 'inversify';
import { observer } from 'mobx-react';
import React, { useContext, ComponentType } from 'react';
import { ContainerProviderContext } from '../components/ContainerProvider';

type TIdentifiers<K> = {
	[Property in keyof K]: interfaces.ServiceIdentifier<unknown>
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const injectableProvider = <TInjectedProps, >(mappedIdentifiers: TIdentifiers<TInjectedProps>) => {
    type TInjectedPropsKeys = keyof TInjectedProps;
    type TProp = {
        [P in TInjectedPropsKeys]: unknown;
    }

	return (
		<P extends unknown>(Component: ComponentType<P>): React.FC<Omit<P, TInjectedPropsKeys>> => {
            const WrapperComponent: React.FC<Omit<P, TInjectedPropsKeys>> = (props) => {
				const { container } = useContext(ContainerProviderContext);

				if (!container) {
					throw new Error('Container not found!');
				}

				const injectedProps = {} as TProp;
				Object.keys(mappedIdentifiers).forEach((key) => {
                    const propToInject = key as TInjectedPropsKeys;
					injectedProps[propToInject] = container.get(mappedIdentifiers[propToInject]);
				});

				const ObservedComponent = observer(Component);
				return <ObservedComponent {...props as P} {...injectedProps} />;
			};

            const displayName =	Component.displayName || Component.name || 'Component';
            WrapperComponent.displayName = `injectableProvider(${displayName})`;

            return WrapperComponent;
		}
	);
};

export { injectableProvider };
