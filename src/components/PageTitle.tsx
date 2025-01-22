import { Helmet } from "react-helmet-async";

const PageTitle: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{title} - React Auth</title>
      </Helmet>
      {children}
    </>
  );
};

export default PageTitle;
