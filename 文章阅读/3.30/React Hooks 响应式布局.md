# 地址
https://juejin.im/post/5e65c1f16fb9a07c9645a64c
# 总结
1.innerWidth
const MyComponent = () => {
  // 当前窗口宽度
  const width = window.innerWidth;
  // 邻介值
  const breakpoint = 620;
  // 宽度小于620时渲染手机组件，反之桌面组件
  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}
2.Hooks+resize
说着也简单，监听resize事件时，触发useEffect改变数据。
3.构建useViewport
const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
}
复制代码精简后的组件代码：
const MyComponent = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}
响应式布局影响的是多个组件，如果在多处使用useViewport，这将浪费性能。
4.Hooks+Context
const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // 顺带监听下高度，备用
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
}