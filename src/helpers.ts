export const bindMethods = <T extends Record<S, Function>, S extends string>(context: T, methods: S[]): void => {
    for (const method of methods) {
        context[method] = context[method].bind(context);
    }
};
