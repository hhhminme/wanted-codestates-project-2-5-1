interface Aside {
  asideKey: string;
}
const Aside = ({ asideKey }: Aside) => {
  return <div>{asideKey}</div>;
};
export default Aside;
