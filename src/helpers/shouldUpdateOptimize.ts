const optimizer = <T extends Record<S, unknown>, S extends string>(args: S[]) => {
    return (prevProps: T, nextProps: T): boolean =>
        args.some((item) => nextProps[item] !== prevProps[item]);
};

export default optimizer;
