export const bindMethods = (context, methods: string[]) => {
    for (let method of methods) {
        context[method] = context[method].bind(context);
    }
};
