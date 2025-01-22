const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen [&_>_*]:min-h-screen">{children}</div>;
};

export default AuthLayout;
