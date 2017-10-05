const optimizer = (args: string[]) => {
    return (prevProps: any, nextProps: any): boolean =>
        args.some((item) => nextProps[item] !== prevProps[item]);
};

export default optimizer;
